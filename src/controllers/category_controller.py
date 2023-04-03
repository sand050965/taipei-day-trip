from flask import *
from models.category_model import CategoryModel as model
from views.category_view import CategoryView as view
from utils.dbUtil import DBUtil

class CategoryController:
    
    def getCategories():
        conn = DBUtil.get_connect()
        cursor = DBUtil.get_cursor(conn)

        try:
            categories = model.get(cursor)
            return view.renderGet(categories), 200

        except Exception as e:
            print(e)
            return view.renderError("伺服器內部錯誤"), 500

        finally:
            cursor.close()
            conn.close()
