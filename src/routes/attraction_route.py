from flask import *
from models.attraction_model import AttractionModel as model
from views.attraction_view import AttractionView as view
from utils.dbUtil import DBUtil

attraction_api = Blueprint("attraction_api", __name__)


@attraction_api.route("/api/attractions", methods=["GET"])
def getAttractions():
    conn = DBUtil.get_connect()
    cursor = DBUtil.get_cursor(conn)

    try:
        attractions = model.getAttractions(cursor, request)
        return view.renderGetAttractionByPageKeyword(attractions), 200

    except Exception as e:
        print(e)
        return view.renderError("伺服器內部錯誤"), 500

    finally:
        cursor.close()
        conn.close()

############################################################


@attraction_api.route("/api/attraction/<attractionId>", methods=["GET"])
def getAttractionById(attractionId):
    conn = DBUtil.get_connect()
    cursor = DBUtil.get_cursor(conn)

    try:
        attraction = model.getAttractionById(cursor, attractionId)
        return view.renderGetAttractionById(attraction), 200

    except ValueError as VErr:
        print(VErr)
        return view.renderError("景點編號不正確"), 400

    except Exception as e:
        print(e)
        return view.renderError("伺服器內部錯誤"), 500

    finally:
        cursor.close()
        conn.close()
