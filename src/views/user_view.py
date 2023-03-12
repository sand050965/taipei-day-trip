from flask import current_app, jsonify
from utils.responseUtil import ResponseUtil


class UserView:
    def renderSuccess():
        return jsonify({"ok": True})

############################################################

    def renderError(message):
        return jsonify({
            "error": True,
            "message": message
        })

############################################################

    def renderGetNoUser():
        return jsonify({"data": None})

############################################################

    def renderGetUserByEmail(result):
        if result != None:
            current_app.config["USER_ID"] = result["id"]
            return jsonify({
                "data": {
                    "id": result["id"],
                    "name": result["name"],
                    "email": result["email"]
                }
            })
        else:
            return jsonify({"data": None})

############################################################

    def renderGetUserIdByEmailPassword(result):
        email = result["email"]
        user_id = result["id"]
        payloadData = {"email": email, "user_id": user_id}
        response = UserView.renderSuccess()
        return ResponseUtil.set_token(response, payloadData)

############################################################

    def renderDeleteUser():
        response = UserView.renderSuccess()
        return ResponseUtil.delete_token(response)

############################################################

    def renderGetUserInfo(result):
        if result == None:
            return jsonify({"data": None})

        return jsonify({
            "data": {
                "id": result["id"],
                "name": result["name"],
                "email": result["email"],
                "sex": result["sex"],
                "birthday": result["birthday"],
                "phone": result["phone"],
            }
        })
