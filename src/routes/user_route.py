from flask import *
from controllers.user_controller import UserController as controller

user_api = Blueprint("user_api", __name__)


@user_api.route("/api/user", methods=["POST"])
def insertUser():
    return controller.insertUser(request)


@user_api.route("/api/user/auth", methods=["GET", "PUT", "DELETE"])
def doUserAuth():
    return controller.doUserAuth(request)


@user_api.route("/api/user/info", methods=["GET", "POST"])
def getUserInfo():
   return controller.getUserInfo(request)
