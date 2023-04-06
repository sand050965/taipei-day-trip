import jwt
from flask import current_app


class ResponseUtil:
    def set_token(response, payloadData):
        token = jwt.encode(
            payloadData, current_app.config['SECRET_KEY'], algorithm="HS256")

        response.set_cookie(
            key="token",
            value=token,
            max_age=604800,
            httponly = True
        )

        return response

    def delete_token(response):
        response.set_cookie("token", expires=0, max_age=-1)
        return response