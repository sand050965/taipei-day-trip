from flask import *
from mysql.connector import IntegrityError
from models.user import User
import jwt

user_api = Blueprint("user_api", __name__)


@user_api.route("/api/user", methods=["POST"])
def insertUser():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data["password"]

        if User.post(cursor, name, email, password):
            conn.commit()

        response = jsonify({"ok": True})
        return response, 200

    except IntegrityError as err:
        print(err)
        conn.rollback()
        return jsonify({
            "error": True,
            "message": "註冊失敗，重複的 Email 或其他原因"
        }), 400

    except Exception as e:
        print(e)
        conn.rollback()
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500

    finally:
        cursor.close()
        conn.close()


@user_api.route("/api/user/auth", methods=["GET", "PUT", "DELETE"])
def doUserAuth():

    if (request.method == "DELETE"):
        response = jsonify({"ok": True})
        response.set_cookie("token", expires=0, max_age=-1)
        return response, 200

    elif (request.method == "GET"):
        conn = current_app.config["COONECT_POOL"].get_connection()
        if (conn.is_connected()):
            cursor = conn.cursor()
        try:
            token = request.cookies.get("token")
            if token == None:
                return jsonify({"data": None}), 200

            email = jwt.decode(
                token, current_app.config['SECRET_KEY'], algorithms="HS256").get("email")

            result = User.get(cursor, email)
            if result != None:
                response = jsonify({
                    "data": {
                        "id": result[0],
                        "name": result[1],
                        "email": result[2]
                    }
                })
            else:
                response = jsonify({"data": None})
            return response, 200

        finally:
            cursor.close()
            conn.close()

    elif (request.method == "PUT"):
        conn = current_app.config["COONECT_POOL"].get_connection()
        if (conn.is_connected()):
            cursor = conn.cursor()
        try:
            data = request.get_json()
            email = data["email"]
            password = data["password"]

            result = User.put(cursor, email, password)

            if (result == None):
                return jsonify({
                    "error": True,
                    "message": "登入失敗，帳號或密碼錯誤或其他原因"
                }), 400

            response = jsonify({"ok": True})
            token = jwt.encode(
                {"email": email}, current_app.config['SECRET_KEY'], algorithm="HS256")
            response.set_cookie(
                key="token",
                value=token,
                max_age=604800
            )
            return response, 200

        except Exception as e:
            print(e)
            return jsonify({
                "error": True,
                "message": "伺服器內部錯誤"
            }), 500

        finally:
            cursor.close()
            conn.close()
