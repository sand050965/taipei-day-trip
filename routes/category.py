from flask import *
from models.category import Category

category_api = Blueprint("category_api", __name__)


@category_api.route("/api/categories", methods=["GET"])
def getCategories():
    conn = current_app.config["COONECT_POOL"].get_connection()
    if (conn.is_connected()):
        cursor = conn.cursor()
    try:
        categories = Category.get(cursor)

        dataSet = set()

        for category in categories:
            dataSet.add(category[0])

        response = jsonify({"data": list(dataSet)})
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
