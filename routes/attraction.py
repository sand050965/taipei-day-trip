from flask import *
from models.attraction import Attraction
import re

attraction_api = Blueprint("attraction_api", __name__)


@attraction_api.route("/api/attractions", methods=["GET"])
def getAttractions():
    page = request.args.get("page")

    if not re.match(r'^\d+$', page):
        return jsonify({
            "error": True,
            "message": "使用者輸入錯誤"
        }), 400

    conn = current_app.config["COONECT_POOL"].get_connection()

    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        page = int(page)
        limitStart = page * 12
        keyword = request.args.get("keyword")

        if (keyword != None):   
            attractions = Attraction.getByKeyword(cursor, limitStart, keyword)
        else:
            attractions = Attraction.getByPage(cursor, limitStart, keyword)

        dataList = []

        if (len(attractions) != 0):

            for i in range(len(attractions)):

                if i == 12:
                    break

                dataList.append({
                    "id": attractions[i][0],
                    "name": attractions[i][1],
                    "category": attractions[i][2],
                    "description": attractions[i][3],
                    "address": attractions[i][4],
                    "transport": attractions[i][5],
                    "mrt": attractions[i][6],
                    "lat": attractions[i][7],
                    "lng": attractions[i][8],
                    "images": (attractions[i][9].split(","))
                })

        nextPage = None

        if (len(attractions) == 13):
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


@attraction_api.route("/api/attraction/<attractionId>", methods=["GET"])
def getAttractionById(attractionId):
    if not re.match(r'^[+]?[1-9][0-9]*$', attractionId):
        return jsonify({
            "error": True,
            "message": "景點編號不正確"
        }), 400

    conn = current_app.config["COONECT_POOL"].get_connection()

    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        attraction = Attraction.getById(cursor, attractionId)

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
            "images": (attraction[9].split(","))
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
