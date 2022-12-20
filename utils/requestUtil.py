import jwt
from flask import current_app
from utils.validatorUtil import ValidatorUtil


class RequestUtil:

    def get_token(request):
        encodedToken = request.cookies.get("token")
        ValidatorUtil.validate_token(encodedToken)
        return jwt.decode(encodedToken, current_app.config['SECRET_KEY'], algorithms="HS256")

    def get_request_data(request):
        data = request.get_json()
        return data

    def get_request_args(request):
        args = request.args
        return args

    def encode_password(password):
        pass
