from flask import jsonify


class BookingView:

    def renderGetBooking(result):
        if result == None:
            return {"data": None}
        else:
            return {
                "data": {
                    "attraction": {
                        "id": result["id"],
                        "name": result["attraction_name"],
                        "address": result["address"],
                        "image": result["image_url"]
                    },
                    "date": (result["date"].strftime("%Y-%m-%d")),
                    "time": result["time"],
                    "price": result["price"]
                }
            }

############################################################

    def renderSuccess():
        return jsonify({"ok": True})

############################################################

    def renderError(message):
        return jsonify(
            {
                "error": True,
                "message": message
            }
        )
