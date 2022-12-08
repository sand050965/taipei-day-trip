class Category:
    def get(cursor):
        cursor.execute("select category from attraction")
        return cursor.fetchall()
