class BookingModel:

    def getBooking(cursor, user_id):
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
        result = cursor.fetchone()
        if result == None:
            return None
        else:
            return dict(zip(cursor.column_names, result))

############################################################

    def postBooking(cursor, isNew, user_id, request):

        data = request.get_json()
        attractionId = data["attractionId"]
        date = data["date"]
        time = data["time"]
        price = data["price"]

        if isNew:
            sql = """
                INSERT INTO booking (
                    user_id,
                    attraction_id,
                    date,
                    time,
                    price
                )
                VALUES (%s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (user_id, attractionId, date, time, price))

        else:
            sql = """
                UPDATE booking 
                SET attraction_id = %s,
                    date = %s,
                    time = %s,
                    price = %s
                WHERE user_id = %s
                """
            cursor.execute(sql, (attractionId, date, time, price, user_id))

        return True

############################################################

    def deleteBooking(cursor, user_id):
        cursor.execute(
            """
            DELETE FROM booking
            WHERE user_id = %s
            """, (user_id, ))
        return True
