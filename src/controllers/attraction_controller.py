from flask import *
from models.attraction_model import AttractionModel as model
from views.attraction_view import AttractionView as view
from utils.dbUtil import DBUtil

class AttractionController:
    
    def getAttractions(request):
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
