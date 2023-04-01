from flask import current_app
from utils.requestUtil import RequestUtil
from utils.validatorUtil import ValidatorUtil


class BookingModel:

    def getBooking(cursor, request, bookingId):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")
        ValidatorUtil.validate_bookingId(bookingId)
        
        cursor.execute(
            """
            SELECT 
                att.id,
                att.attraction_name,
                att.address,
                img.image_url,
                book.id as book_id,
                book.date,
                book.time,
                book.price
            FROM booking book
            INNER JOIN attraction att
            ON book.attraction_id = att.id
            INNER JOIN image img
            ON att.id = img.attraction_id     
            WHERE book.user_id = %s
            AND book.id = %s
            ORDER BY img.id
            LIMIT 1
            """, (user_id, bookingId,))

        return cursor.fetchone()


    def getBookings(cursor, request):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")

        cursor.execute(
            """
            SELECT
                att.id,
                att.attraction_name,
                att.address,
                substring_index(group_concat(img.image_url ORDER BY img.id), ',' ,1) as image_url,
                book.id as book_id,
                book.date,
                book.time,
                book.price
            FROM booking book
            INNER JOIN attraction att
            ON book.attraction_id = att.id
            INNER JOIN image img
            ON att.id = img.attraction_id
            WHERE book.user_id = %s
            GROUP BY book.id
            """, (user_id,))

        return cursor.fetchall()


    def getBookingId(cursor, request):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")

        cursor.execute(
            """
                SELECT
                    MAX(book.id) book_id
                FROM booking book
                WHERE book.user_id = %s
                """, (user_id,))

        return cursor.fetchone()


    def insertBooking(cursor, request):
        token = RequestUtil.get_token(request)
        user_id = token.get("user_id")

        data = RequestUtil.get_request_data(request)
        attractionId = str(data["attractionId"])
        ValidatorUtil.validate_attractionId(attractionId)

        date = data["date"]
        ValidatorUtil.validate_date(date)

        time = data["time"]
        ValidatorUtil.validate_time(time)

        price = data["price"]
        ValidatorUtil.validate_price(price)

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


    def deleteBookingById(cursor, request):
        token = RequestUtil.get_token(request)
        token_UserId = token.get("user_id")
        user_id = current_app.config["USER_ID"]
        ValidatorUtil.validate_tokenUserId(user_id, token_UserId)

        data = RequestUtil.get_request_data(request)
        bookingId = data["booking_id"]

        cursor.execute(
            """
            DELETE FROM booking
            WHERE user_id = %s
            AND id = %s
            """, (token_UserId, bookingId,))


    def deleteBookings(cursor, request):
        token = RequestUtil.get_token(request)
        token_UserId = token.get("user_id")
        user_id = current_app.config["USER_ID"]
        ValidatorUtil.validate_tokenUserId(user_id, token_UserId)

        data = RequestUtil.get_request_data(request)
        bookingIds = data["booking_ids"]

        executeData = []

        for bookingId in bookingIds:
            parameters = (user_id, bookingId)
            executeData.append(parameters)

        cursor.executemany(
            """
            DELETE FROM booking
            WHERE user_id = %s
            AND id = %s
            """, executeData)
