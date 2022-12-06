from flask import *
from models.booking import Booking

booking_api = Blueprint("booking_api", __name__)


@booking_api.route("/api/booking/", methods=["GET", "POST", "DELETE"])
def getBooking():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        if(request.method == "GET"):
            Booking.get()
        elif (request.method == "POST"):
            Booking.post()
        elif (request.method == "DELETE"):
            Booking.delete()

    except Exception as e:
        print(e)
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500
    finally:
        cursor.close()
        conn.close()
