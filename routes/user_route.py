from flask import *
from jwt import DecodeError, InvalidSignatureError
from mysql.connector import IntegrityError
from models.user_model import UserModel as model
from views.user_view import UserView as view

user_api = Blueprint("user_api", __name__)


@user_api.route("/api/user", methods=["POST"])
def insertUser():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        if model.postUser(cursor, request):
            conn.commit()

        response = view.renderIsUser()
        return response, 200

    except IntegrityError as err:
        print(err)
        conn.rollback()
        response = view.renderError("註冊失敗，重複的 Email 或其他原因")
        return response, 400

    except Exception as e:
        print(e)
        conn.rollback()
        response = view.renderError("伺服器內部錯誤")
        return response, 500

    finally:
        cursor.close()
        conn.close()

############################################################


@user_api.route("/api/user/auth", methods=["GET", "PUT", "DELETE"])
def doUserAuth():

    match request.method:
        case "DELETE":
            response = view.renderIsUser()
            response.set_cookie("token", expires=0, max_age=-1)
            return response, 200

        ############################################################

        case "GET":
            conn = current_app.config["COONECT_POOL"].get_connection()
            if (conn.is_connected()):
                cursor = conn.cursor()
            try:
                token = request.cookies.get("token")

                if token == None:
                    response = view.renderNotUser()

                else:
                    result = model.getUserByEmail(cursor, token)
                    response = view.renderGetUserByEmail(result)

            except InvalidSignatureError as ISErr:
                print(ISErr)
                response = view.renderNotUser()

            except DecodeError as DErr:
                print(DErr)
                response = view.renderNotUser()

            finally:
                cursor.close()
                conn.close()
                return response, 200

        ############################################################

        case "PUT":
            conn = current_app.config["COONECT_POOL"].get_connection()
            if (conn.is_connected()):
                cursor = conn.cursor()

            try:
                data = request.get_json()
                email = data["email"]
                password = data["password"]
                result = model.putUser(cursor, email, password)
                user_id = result["id"]

                if (result == None):
                    response = view.renderError("登入失敗，帳號或密碼錯誤或其他原因")
                    return response, 400

                response = view.renderPutUser(email, user_id)

                return response, 200

            except Exception as e:
                print(e)
                response = view.renderError("伺服器內部錯誤")
                return response, 500

            finally:
                cursor.close()
                conn.close()
