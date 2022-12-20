from utils.requestUtil import RequestUtil
from utils.validatorUtil import ValidatorUtil


class BookingModel:

    def getBooking(cursor, request):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")

        cursor.execute(
            """
            SELECT 
                att.id,
                att.attraction_name,
                att.address,
                img.image_url,
                book.date,
                book.time,
                book.price
            FROM booking book
            INNER JOIN attraction att
            ON book.attraction_id = att.id
            INNER JOIN image img
            ON att.id = img.attraction_id     
            WHERE book.user_id = %s
            ORDER BY img.id
            LIMIT 1
            """, (user_id, ))

        return cursor.fetchone()

############################################################

    def insertUpdateBooking(cursor, request, result):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")

        data = RequestUtil.get_request_data(request)
        attractionId = data["attractionId"]
        ValidatorUtil.validate_attractionId(attractionId)

        date = data["date"]
        ValidatorUtil.validate_date(date)

        time = data["time"]
        ValidatorUtil.validate_time(time)

        price = data["price"]
        ValidatorUtil.validate_price(price)

        if (result == None):
            BookingModel.insertBooking(
                cursor, user_id, attractionId, date, time, price)
        else:
            BookingModel.updateBooking(
                cursor, attractionId, date, time, price, user_id)

############################################################

    def insertBooking(cursor, user_id, attractionId, date, time, price):
        cursor.execute("""
                INSERT INTO booking (
                    user_id,
                    attraction_id,
                    date,
                    time,
                    price
                )
                VALUES (%s, %s, %s, %s, %s)
                """, (user_id, attractionId, date, time, price))

############################################################

    def updateBooking(cursor, attractionId, date, time, price, user_id):
        cursor.execute("""
                UPDATE booking 
                SET attraction_id = %s,
                    date = %s,
                    time = %s,
                    price = %s
                WHERE user_id = %s
                """, (attractionId, date, time, price, user_id))

############################################################

    def deleteBooking(cursor, request):
        data = RequestUtil.get_request_data(request)
        user_id = data["user_id"]

        token = RequestUtil.get_token(request)
        token_UserId = token.get("user_id")

        ValidatorUtil.validate_tokenUserId(user_id, token_UserId)

        cursor.execute(
            """
            DELETE FROM booking
            WHERE user_id = %s
            """, (user_id, ))
