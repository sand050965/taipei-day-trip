class OrderView:
    def renderAllOrders(result):
        orders = []
        preOrder = ""
        cnt = 0
        for order in result:
            if order["order_id"] != preOrder:
                orderData = {
                    "number": order["order_id"],
                    "trip": {
                        "attraction": [{
                            "id": order["attraction_id"],
                            "name": order["attraction_name"],
                            "address": order["address"],
                            "price": order["price"],
                            "image": order["image_url"]
                        }],
                        "date": (order["date"].strftime("%Y-%m-%d")),
                        "time": order["time"]
                    },
                    "contact": {
                        "name": order["contact_name"],
                        "email": order["contact_email"],
                        "phone": order["contact_phone"]
                    },
                    "status": order["status"]
                }
                orders.append(orderData)
            else:
                orderResult = {
                    "id": order["attraction_id"],
                    "name": order["attraction_name"],
                    "price": order["price"],
                    "address": order["address"],
                    "image": order["image_url"]
                }
                orders[cnt - 1]["trip"]["attraction"].append(orderResult)
            preOrder = order["order_id"]
            cnt += 1
        return {"data": orders}
        
        
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
