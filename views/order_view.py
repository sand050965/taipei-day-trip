class OrderView:
    def renderNewOrder(result):
        return {
            "data": {
                "number": result["order_id"],
                "payment": {
                    "status": result["status"],
                    "message": result["message"]
                }
            }
        }

    def renderGetOrderByOrderId(order):
        return {
            "data": {
                "number": order["order_id"],
                "price": order["price"],
                "trip": {
                    "attraction": {
                        "id": order["attraction_id"],
                        "name": order["attraction_name"],
                        "address": order["address"],
                        "image": order["image_url"]
                    },
                    "date": order["date"],
                    "time": order["time"]
                },
                "contact": {
                    "name": order["contact_name"],
                    "email": order["contact_email"],
                    "phone": order["contact_phone"]
                },
                "status": order["status"]
            }
        }

    def renderError(message):
        return {
            "error": True,
            "message": message
        }
