from flask import *
from controllers.s3_controller import S3Controller as controller

s3_api = Blueprint("s3_api", __name__)

@s3_api.route("/api/s3", methods=["POST", "DELETE"])
def insertUser():
    return controller.insertUser(request)