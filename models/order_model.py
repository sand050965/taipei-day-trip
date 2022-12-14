import os
import requests
from flask import current_app
from datetime import datetime
from utils.requestUtil import RequestUtil
from utils.validatorUtil import ValidatorUtil
from models.booking_model import BookingModel


class OrderModel:
    def insertOrder(cursor, request):
        data = RequestUtil.get_request_data(request)
        token = RequestUtil.get_token(request)
        token_UserId = token.get("user_id")
        user_id = current_app.config["USER_ID"]
        ValidatorUtil.validate_tokenUserId(user_id, token_UserId)

        ValidatorUtil.validate_attractionId(
            str(data["order"]["trip"]["attraction"]["id"]))
        ValidatorUtil.validate_price(data["order"]["price"])
        ValidatorUtil.validate_date(data["order"]["trip"]["date"])
        ValidatorUtil.validate_time(data["order"]["trip"]["time"])
        ValidatorUtil.validate_name(data["order"]["contact"]["name"], False)
        ValidatorUtil.validate_email(data["order"]["contact"]["email"], False)
        ValidatorUtil.validate_phone(data["order"]["contact"]["phone"])

        now = datetime.now()
        db_datetime = now.strftime('%Y-%m-%d %H:%M:%S')
        order_datetime = now.strftime("%Y%m%d%H%M%S")
        order_id = order_datetime+"-"+str(user_id)

        cursor.execute(
            """
            INSERT INTO trip.orders (
                order_id,
                attraction_id,
                price,
                date,
                time,
                user_id,
                contact_name,
                contact_email,
                contact_phone,
                status
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (order_id,
             data["order"]["trip"]["attraction"]["id"],
             data["order"]["price"],
             data["order"]["trip"]["date"],
             data["order"]["trip"]["time"],
             user_id,
             data["order"]["contact"]["name"],
             data["order"]["contact"]["email"],
             data["order"]["contact"]["phone"],
             0)
        )

        TapPayResult = OrderModel.postTapPay(data)

        OrderModel.insertPayment(cursor, order_id, db_datetime, TapPayResult)

        BookingModel.deleteBooking(cursor, request)

        message = "????????????"
        if (TapPayResult["status"] == 0):
            message = "????????????"
            OrderModel.updateOrder(cursor, order_id, TapPayResult)

        return {
            "order_id": order_id,
            "status": TapPayResult["status"],
            "message": message
        }

    ############################################################

    def postTapPay(data):
        TapPayRequestHeaders = {'content-type': 'application/json',
                                "x-api-key": os.getenv('PARTNER_KEY')}
        TapPayRequestBody = {
            "prime": data["prime"],
            "partner_key": os.getenv("PARTNER_KEY"),
            "merchant_id": os.getenv("MERCHANT_ID"),
            "currency": "TWD",
            "details": data["order"]["contact"]["name"]+"'s order",
            "amount": data["order"]["price"],
            "cardholder": {
                "phone_number": data["order"]["contact"]["phone"],
                "name": data["order"]["contact"]["name"],
                "email": data["order"]["contact"]["email"],
            },
        }

        return requests.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime',
                             headers=TapPayRequestHeaders, json=TapPayRequestBody).json()

    ############################################################

    def insertPayment(cursor, order_id, db_datetime, TapPayResult):
        cursor.execute(
            """
            INSERT INTO trip.payment (
                order_id,
                paid_time,
                message
            )
            VALUES (%s, %s, %s)
            """, (order_id, db_datetime, TapPayResult["msg"]))

    ############################################################

    def updateOrder(cursor, order_id, TapPayResult):
        cursor.execute(
            """
                UPDATE trip.orders 
                SET status = %s
                WHERE order_id = %s
                """, (TapPayResult["status"], order_id))

    ############################################################

    def getOrderByOrderId(cursor, orderNumber):
        ValidatorUtil.validate_orderNumber(orderNumber)
        cursor.execute(
            """
            SELECT
                odrs.order_id,
                odrs.price,
                odrs.date,
                odrs.time,
                odrs.contact_name,
                odrs.contact_email,
                odrs.contact_phone,
                odrs.status,
                odrs.attraction_id,
                att.attraction_name,
                att.address,
                img.image_url
            FROM orders odrs
            INNER JOIN attraction att
            ON odrs.attraction_id = att.id
            INNER JOIN image img
            ON odrs.attraction_id = img.attraction_id
            WHERE odrs.order_id = %s
            ORDER BY img.id
            LIMIT 1
            """, (orderNumber,))

        cursor.fetchone()
