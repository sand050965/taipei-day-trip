import jwt
from flask import jsonify, current_app


class UserModel:

    def postUser(cursor, request):

        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data["password"]

        cursor.execute(
            """
            INSERT INTO user ( 
                name, 
                email, 
                password
            ) 
            VALUES (%s, %s, %s)
            """, (name, email, password))
        return True

############################################################

    def getUserByEmail(cursor, token):
        email = jwt.decode(
            token, current_app.config['SECRET_KEY'], algorithms="HS256").get("email")

        cursor.execute(
            """
            SELECT 
                id, 
                name, 
                email 
            FROM user 
            WHERE email = %s
            """, (email, ))

        result = cursor.fetchone()
        if result == None:
            return None
        else:
            return dict(zip(cursor.column_names, result))

############################################################

    def putUser(cursor, email, password):

        cursor.execute(
            """
            SELECT id 
            FROM user 
            WHERE email = %s 
            AND password = %s
            """, (email, password))
        
        result = cursor.fetchone()
        if result == None:
            return None
        else:
            return dict(zip(cursor.column_names, result))
