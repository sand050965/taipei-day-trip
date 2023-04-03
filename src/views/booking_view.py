from flask import jsonify
from utils.requestUtil import RequestUtil


class BookingView:

    def renderGetBookingByBookingId(result):
        if result == None:
            return {"data": None}

        data = {
            "attraction": {
                "id": result["id"],
                "name": result["attraction_name"],
                "address": result["address"],
                "image": result["image_url"]
            },
            "bookingId": result["book_id"],
            "date": (result["date"].strftime("%Y-%m-%d")),
            "time": result["time"],
            "price": result["price"]
        }

        return jsonify({"data": data})


    def renderGetBookings(result):
        dataList = []
        if result == None:
            return {"data": None}

        for data in result:
            dataList.append({
                "attraction": {
                    "id": data["id"],
                    "name": data["attraction_name"],
                    "address": data["address"],
                    "image": data["image_url"]
                },
                "bookingId": data["book_id"],
                "date": (data["date"].strftime("%Y-%m-%d")),
                "time": data["time"],
                "price": data["price"]
            })

        return jsonify({"data": dataList})



    def renderSuccessInsert(result):
        return {
            "ok": True,
            "book_id": result["book_id"]
        }



    def renderSuccess():
        return jsonify({"ok": True})


    def renderError(message):
        return jsonify(
            {
                "error": True,
                "message": message
            }
        )
