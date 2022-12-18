import re
from flask import *
from models.attraction_model import AttractionModel as model
from views.attraction_view import AttractionView as view

attraction_api = Blueprint("attraction_api", __name__)


@attraction_api.route("/api/attractions", methods=["GET"])
def getAttractions():
    page = request.args.get("page")

    if not re.match(r'^\d+$', page):
        response = view.renderError("使用者輸入錯誤")
        return response, 400

    conn = current_app.config["COONECT_POOL"].get_connection()

    if (conn.is_connected()):
        cursor = conn.cursor(dictionary=True)

    try:
        page = int(page)
        limitStart = page * 12
        keyword = request.args.get("keyword")

        if (keyword != None):
            attractions = model.getAttractionByKeyword(
                cursor, limitStart, keyword)
        else:
            attractions = model.getAttractionByPage(
                cursor, limitStart)

        response = view.renderGetAttractionByPageKeyword(attractions, page)
        return response, 200

    except Exception as e:
        print(e)
        response = view.renderError("伺服器內部錯誤")
        return response, 500

    finally:
        cursor.close()
        conn.close()

############################################################


@attraction_api.route("/api/attraction/<attractionId>", methods=["GET"])
def getAttractionById(attractionId):
    if not re.match(r'^[+]?[1-9][0-9]*$', attractionId):
        response = view.renderError("使用者輸入錯誤")
        return response, 400

    conn = current_app.config["COONECT_POOL"].get_connection()

    if (conn.is_connected()):
        cursor = conn.cursor()

    try:
        attraction = model.getAttractionById(cursor, attractionId)

        if (attraction == None):
            response = view.renderError("景點編號不正確")
            return response, 400

        response = view.renderGetAttractionById(attraction)
        return response, 200

    except Exception as e:
        print(e)
        response = view.renderError("伺服器內部錯誤")
        return response, 500

    finally:
        cursor.close()
        conn.close()
