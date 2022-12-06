from flask import *
from models.order import Order

order_api = Blueprint("order_api", __name__)

@app.route("/api/orders", methods=["GET"])
def getOrders():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        Order.get()
    except Exception as e:
        print(e)
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500
    finally:
        cursor.close()
        conn.close()


@app.route("/api/order/<orderNumber>", methods=["POST"])
def getOrder(orderNumber):
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        Order.post()
    except Exception as e:
        print(e)
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500
    finally:
        cursor.close()
        conn.close()
