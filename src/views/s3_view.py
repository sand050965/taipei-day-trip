from flask import current_app, jsonify
from utils.responseUtil import ResponseUtil

class S3View:
    def renderUpload(avatar_img_url):
        return jsonify({"data": {"avatarImgUrl": avatar_img_url}})


    def renderSuccess():
        return jsonify({"ok": True})


    def renderError(message):
        return jsonify({
            "error": True,
            "message": message
        })