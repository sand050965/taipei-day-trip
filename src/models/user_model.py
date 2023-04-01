from utils.requestUtil import RequestUtil
from utils.validatorUtil import ValidatorUtil

class UserModel:

    def insertUser(cursor, request):
        data = RequestUtil.get_request_data(request)
        name = data["name"]
        ValidatorUtil.validate_name(name, True)

        email = data["email"]
        ValidatorUtil.validate_email(email, True)

        password = data["password"]
        ValidatorUtil.validate_password(password)

        cursor.execute(
            """
            INSERT INTO user ( 
                name, 
                email, 
                password,
                sex,
                birthday,
                phone,
                avatarImgUrl
            ) 
            VALUES (%s, %s, %s)
            """, (name, email, password, '0', None, '', ''))


    def getUserByEmail(cursor, request):
        email = RequestUtil.get_token(request).get("email")
        ValidatorUtil.validate_email(email, True)

        cursor.execute(
            """
            SELECT 
                id, 
                name, 
                email,
                avatar_img_url
            FROM user 
            WHERE email = %s
            """, (email, ))

        result = cursor.fetchone()
        ValidatorUtil.validate_user(result)
        return result


    def getUserIdByEmailPassword(cursor, request):
        data = RequestUtil.get_request_data(request)
        email = data["email"]
        ValidatorUtil.validate_email(email, True)

        password = data["password"]
        ValidatorUtil.validate_password(password)

        cursor.execute(
            """
            SELECT id 
            FROM user 
            WHERE email = %s 
            AND password = %s
            """, (email, password))

        result = cursor.fetchone()
        ValidatorUtil.validate_user(result)
        result["email"] = email
        return result


    def getUserInfo(cursor, request):
        email = RequestUtil.get_token(request).get("email")
        ValidatorUtil.validate_email(email, True)

        cursor.execute(
            """
            SELECT 
                id, 
                name, 
                email,
                sex,
                birthday,
                phone, 
                avatar_img_url
            FROM user 
            WHERE email = %s
            """, (email, ))

        result = cursor.fetchone()
        ValidatorUtil.validate_user(result)
        return result


    def updateUserInfo(cursor, request):
        token_id = RequestUtil.get_token(request).get("user_id")
        
        token_email = RequestUtil.get_token(request).get("email")
        ValidatorUtil.validate_email(token_email, True)

        data = RequestUtil.get_request_data(request)

        name = data["name"]
        ValidatorUtil.validate_name(name, True)

        email = data["email"]
        ValidatorUtil.validate_email(email, True)

        sex = data["sex"]
        ValidatorUtil.validate_sex(sex)

        birthday = data["birthday"] 
        if birthday != '':
            ValidatorUtil.validate_date(birthday)
        else:
            birthday = None

        phone = data["phone"]
        if phone != '':
            ValidatorUtil.validate_phone(phone)
        
        avatarImgUrl = data["avatarImgUrl"]

        cursor.execute(
            """
            UPDATE user 
            SET name = %s,
                email = %s,
                sex = %s,
                birthday = %s,
                phone = %s,
                avatar_img_url = %s
            WHERE email = %s 
            AND id = %s
            """, (name, email, sex, birthday, phone, avatarImgUrl, token_email, token_id))
