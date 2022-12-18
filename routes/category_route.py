from flask import *
from models.category_model import CategoryModel as model
from views.category_view import CategoryView as view

category_api = Blueprint("category_api", __name__)


@category_api.route("/api/categories", methods=["GET"])
def getCategories():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor(dictionary=True)
    try:
        categories = model.get(cursor)
        response = view.renderGet(categories)
        return response, 200

    except Exception as e:
        print(e)
        response = view.renderError("伺服器內部錯誤")
        return response, 500

    finally:
        cursor.close()
        conn.close()
