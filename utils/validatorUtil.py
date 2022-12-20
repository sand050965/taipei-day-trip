import re
from jwt import InvalidSignatureError
from mysql.connector import IntegrityError


class ValidatorUtil:
    def validate_page(page):
        if not re.match(r'^\d+$', page):
            raise ValueError("頁碼輸入有誤")

    def validate_attractionId(attractionId):
        if not re.match(r'^[+]?[1-9][0-9]*$', attractionId):
            raise ValueError("景點id輸入有誤")

    def validate_attraction(attraction):
        if (attraction == None):
            raise ValueError

    def validate_user(user):
        if (user == None):
            raise ValueError

    def validate_token(token):
        if (token == None):
            raise InvalidSignatureError

    def validate_tokenUserId(user_id, token_UserId):
        if (user_id != token_UserId):
            raise InvalidSignatureError

    def validate_name(name, isUserAuth):
        if (name == ""):
            if (isUserAuth):
                raise ValueError
            raise ValueError("姓名輸入有誤")

    def validate_email(email, isUserAuth):
        if (email == "" or not re.match(r'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', email)):
            if (isUserAuth):
                raise ValueError
            raise ValueError("email輸入有誤")

    def validate_password(password):
        if (password == "" or not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$', password)):
            raise ValueError("密碼輸入有誤")

    def validate_date(date):
        if (date == "" or not re.match(r'^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$', date)):
            raise ValueError("日期輸入有誤")

    def validate_time(time):
        if (time == ""):
            raise ValueError("時間輸入有誤")

    def validate_price(price):
        if (price != "2000" and price != "2500"):
            raise ValueError("時間輸入有誤")
