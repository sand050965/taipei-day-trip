import jwt
from flask import *
from jwt import DecodeError, InvalidSignatureError
from mysql.connector import IntegrityError
from models.user_model import UserModel
from models.booking_model import BookingModel as model
from views.booking_view import BookingView as view

booking_api = Blueprint("booking_api", __name__)


@booking_api.route("/api/booking", methods=["GET", "POST", "DELETE"])
def getBooking():

    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()

    token = request.cookies.get("token")

    if token == None:
        raise InvalidSignatureError

    result = UserModel.getUserByEmail(cursor, token)

    if result == None:
        raise InvalidSignatureError
    
    payloaData = jwt.decode(
        token, current_app.config['SECRET_KEY'], algorithms="HS256")

    user_id = payloaData.get("user_id")

    try:
        match request.method:
            case "GET":
                result = model.getBooking(cursor, user_id)
                response = view.renderGetBooking(result)

            ############################################################

            case "POST":
                isNew = True

                if model.getBooking(cursor, user_id) != None:
                    isNew = False

                if model.postBooking(cursor, isNew, user_id, request):
                    conn.commit()
                    response = view.renderSuccess()

            ############################################################

            case "DELETE":
                if model.deleteBooking(cursor, user_id):
                    conn.commit()
                    response = view.renderSuccess()

        return response, 200

    except InvalidSignatureError as ISErr:
        print(ISErr)
        response = view.renderError("未登入系統，拒絕存取")
        return response, 403

    except DecodeError as DErr:
        print(DErr)
        response = view.renderError("未登入系統，拒絕存取")
        return response, 403

    except IntegrityError as IErr:
        print(IErr)
        conn.rollback()
        response = view.renderError("建立失敗，輸入不正確或其他原因")
        return response, 400

    except Exception as e:
        print(e)
        conn.rollback()
        response = view.renderError("伺服器內部錯誤")
        return response, 500

    finally:
        cursor.close()
        conn.close()
