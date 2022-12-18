import jwt
from flask import jsonify, current_app


class UserView:
    def renderIsUser():
        return jsonify({"ok": True})

############################################################

    def renderNotUser():
        return jsonify({"data": None})

############################################################

    def renderError(message):
        return jsonify({
            "error": True,
            "message": message
        })

############################################################

    def renderGetUserByEmail(result):
        if result != None:
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

    def renderPutUser(email, user_id):
        response = UserView.renderIsUser()
        token = jwt.encode(
            {"email": email, "user_id": user_id}, current_app.config['SECRET_KEY'], algorithm="HS256")

        response.set_cookie(
            key="token",
            value=token,
            max_age=604800
        )
        return response
