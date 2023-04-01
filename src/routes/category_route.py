from flask import *
from controllers.category_controller import CategoryController as controller

category_api = Blueprint("category_api", __name__)


@category_api.route("/api/categories", methods=["GET"])
def getCategories():
    return controller.getCategories()
