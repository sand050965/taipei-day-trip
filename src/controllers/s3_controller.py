from flask import *
from models.s3_model import S3Model as model
from models.user_model import UserModel as userModel
from views.s3_view import S3View as view

s3_api = Blueprint("s3_api", __name__)

@s3_api.route("/api/s3", methods=["POST", "DELETE"])
def insertUser():

    match request.method :
        case"POST":
            
            try:
                avatar_img_url = model.uploadAvatar(request)
                return view.renderUpload(avatar_img_url), 200

            except ValueError as VErr:
                print(VErr.args)
                return view.renderError("檔案格式錯誤"), 400
            
            except Exception as e:
                print(e)
                return view.renderError("伺服器內部錯誤"), 500
        
        case"DELETE":
            
            try:
                model.deleteAvatar(request)
                return view.renderSuccess(), 200

            except Exception as e:
                print(e)
                return view.renderError("伺服器內部錯誤"), 500
