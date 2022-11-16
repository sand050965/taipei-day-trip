from flask import *
from sqlite3 import connect
import mysql.connector
import uuid
import jwt
import re

app = Flask(__name__)

app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["JSON_SORT_KEYS"] = False
app.config['SECRET_KEY'] = uuid.uuid4().hex


dbconfig = {
    "host": "localhost",
    "user": "root",
    "password": "root1234",
    "database": "trip"
}

connect_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,
    **dbconfig
)

# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


@app.route("/booking")
def booking():
    return render_template("booking.html")


@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


@app.route("/api/user", methods=["POST"])
def insertUser():
    try:
        conn = connect_pool.get_connection()
        if (conn.is_connected()):
            cursor = conn.cursor()

        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data["password"]

        cursor.execute(
            "insert into user (name, email, password) values (%s, %s, %s)", (name, email, password))
        conn.commit()

        response = jsonify({"ok": True})
        return response, 200

    except mysql.connector.IntegrityError as err:
        print(err)
        return jsonify({
            "error": True,
            "message": "註冊失敗，重複的 Email 或其他原因"
        }), 400

    except Exception as e:
        print(e)
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500

    finally:
        cursor.close()
        conn.close()


@app.route("/api/user/auth", methods=["GET", "PUT", "DELETE"])
def doUserAuth():
    conn = connect_pool.get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        if (request.method == "GET"):
            token = request.cookies.get("token")
            email = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms="HS256").get("email")
            cursor.execute(
                "select id, name, email from user where email = %s", (email, ))
            result = cursor.fetchone()
            if (result != None):
                response = jsonify({
                    "data": {
                        "id": result[0],
                        "name": result[1],
                        "email": result[2]
                    }
                })
            else:
                response = jsonify({"data": None})

        elif (request.method == "PUT"):
            data = request.get_json()
            email = data["email"]
            password = data["password"]

            cursor.execute(
                "select id from user where email = %s and password = %s", (email, password))
            result = cursor.fetchone()

            if (result == None):
                return jsonify({
                    "error": True,
                    "message": "登入失敗，帳號或密碼錯誤或其他原因"
                }), 400

            response = jsonify({"ok": True})

            token = jwt.encode(
                {"email": email}, app.config['SECRET_KEY'], algorithm="HS256")

            response.set_cookie(
                key="token",
                value=token,
                max_age=604800
            )

        elif (request.method == "DELETE"):
            response = jsonify({"ok": True})
            response.set_cookie("token", expires=0, max_age=-1)

    except Exception as e:
        print(e)
        return jsonify({
            "error": True,
            "message": "伺服器內部錯誤"
        }), 500

    finally:
        cursor.close()
        conn.close()

    return response, 200


@app.route("/api/attractions", methods=["GET"])
def getAttractions():
    conn = connect_pool.get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        page = request.args.get("page")

        if not re.match(r'^\d+$', page):
            return jsonify({
                "error": True,
                "message": "使用者輸入錯誤"
            }), 400

        page = int(page)
        limitStart = page * 12
        keyword = request.args.get("keyword")

        if (keyword != None):
            cursor.execute(
                "select att.id, att.attraction_name, cat.category, att.description, att.address, att.transport, mrt.mrt, att.latitude, att.longitude, att.image " +
                "from attraction att " +
                "inner join category cat on att.category_id = cat.id " +
                "inner join mrt mrt on att.mrt_id = mrt.id " +
                "where cat.category = %s " +
                "or att.attraction_name like %s " +
                "limit %s, %s", (
                    keyword, f"%{keyword}%", limitStart, 12)
            )
            attractions = cursor.fetchall()

            cursor.execute(
                "select count(*) from attraction att inner join category cat on att.category_id = cat.id where cat.category = %s or attraction_name like %s", (keyword, f"%{keyword}%"))
            count = cursor.fetchone()[0]

        else:
            cursor.execute(
                "select att.id, att.attraction_name, cat.category, att.description, att.address, att.transport, mrt.mrt, att.latitude, att.longitude, att.image " +
                "from attraction att " +
                "inner join category cat on att.category_id = cat.id " +
                "inner join mrt mrt on att.mrt_id = mrt.id " +
                "limit %s, %s", (
                    limitStart, 12)
            )
            attractions = cursor.fetchall()

            cursor.execute("select count(*) from attraction")
            count = cursor.fetchone()[0]

        dataList = []
        if (len(attractions) != 0):
            for attraction in attractions:
                dataList.append({
                    "id": attraction[0],
                    "name": attraction[1],
                    "category": attraction[2],
                    "description": attraction[3],
                    "address": attraction[4],
                    "transport": attraction[5],
                    "mrt": attraction[6],
                    "lat": attraction[7],
                    "lng": attraction[8],
                    "images": eval(str(attraction[9])[2:-1])
                })

        nextPage = None
        if (len(dataList) != 0 and (count-limitStart-12 > 0)):
            nextPage = page + 1

        response = jsonify({
            "nextPage": nextPage,
            "data": dataList
        })

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


@app.route("/api/attraction/<attractionId>", methods=["GET"])
def getAttractionById(attractionId):

    if not re.match(r'^[+]?[1-9][0-9]*$', attractionId):
        return jsonify({
            "error": True,
            "message": "景點編號不正確"
        }), 400

    conn = connect_pool.get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        cursor.execute(
            "select att.id, att.attraction_name, cat.category, att.description, att.address, att.transport, mrt.mrt, att.latitude, att.longitude, att.image " +
            "from attraction att " +
            "inner join category cat on att.category_id = cat.id " +
            "inner join mrt mrt on att.mrt_id = mrt.id " +
            "where att.id = %s", (attractionId, )
        )
        attraction = cursor.fetchone()

        if (attraction == None):
            return jsonify({
                "error": True,
                "message": "景點編號不正確"
            }), 400

        dataSet = {
            "id": attraction[0],
            "name": attraction[1],
            "category": attraction[2],
            "description": attraction[3],
            "address": attraction[4],
            "transport": attraction[5],
            "mrt": attraction[6],
            "lat": attraction[7],
            "lng": attraction[8],
            "images": eval(str(attraction[9])[2:-1])
        }

        response = jsonify({"data": dataSet})
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


@app.route("/api/categories", methods=["GET"])
def getCategories():
    conn = connect_pool.get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        cursor.execute("select category from category")
        categories = cursor.fetchall()

        dataList = []
        for category in categories:
            dataList.append(category[0])

        response = jsonify({"data": dataList})
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


# @app.route("/api/booking/", methods=["GET", "POST", "DELETE"])
# def getBooking():
#     conn = connect_pool.get_connection()
#     if (conn.is_connected()):
#         cursor = conn.cursor()
#     try:
#         if(request.method == "GET"):
#             pass
#         elif (request.method == "POST"):
#             pass
#         elif (request.method == "DELETE"):
#             pass

#     except Exception as e:
#         print(e)
#         return jsonify({
#             "error": True,
#             "message": "伺服器內部錯誤"
#         }), 500
#     finally:
#         cursor.close()
#         conn.close()


# @app.route("/api/orders", methods=["GET"])
# def getOrders():
#     conn = connect_pool.get_connection()
#     if (conn.is_connected()):
#         cursor = conn.cursor()
#     try:
#         pass
#     except Exception as e:
#         print(e)
#         return jsonify({
#             "error": True,
#             "message": "伺服器內部錯誤"
#         }), 500
#     finally:
#         cursor.close()
#         conn.close()


# @app.route("/api/order/<orderNumber>", methods=["POST"])
# def getOrder(orderNumber):
#     conn = connect_pool.get_connection()
#     if (conn.is_connected()):
#         cursor = conn.cursor()
#     try:
#         pass
#     except Exception as e:
#         print(e)
#         return jsonify({
#             "error": True,
#             "message": "伺服器內部錯誤"
#         }), 500
#     finally:
#         cursor.close()
#         conn.close()


app.run(port=3000)
