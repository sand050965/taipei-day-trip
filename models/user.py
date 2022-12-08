class User:
    
    def post(cursor, name, email, password):
        cursor.execute(
            "insert into user (name, email, password) values (%s, %s, %s)", (name, email, password))
        return True

    def get(cursor, email):
        cursor.execute(
            "select id, name, email from user where email = %s", (email, ))
        return cursor.fetchone()
    
    def put(cursor, email, password):
        cursor.execute(
            "select id from user where email = %s and password = %s", (email, password))
        return cursor.fetchone()