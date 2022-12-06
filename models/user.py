class User:
    
    def insert(cursor, data, name, email, password):
        cursor.execute(
            "insert into user (name, email, password) values (%s, %s, %s)", (name, email, password))
        return True

    def get(cursor):
        cursor.execute(
            "select id, name, email from user where email = %s", (email, ))
        return cursor.fetchone()
    
    def put(cursor):
        cursor.execute(
            "select id from user where email = %s and password = %s", (email, password))
        return cursor.fetchone()