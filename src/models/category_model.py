class CategoryModel:
    
    def get(cursor):
        cursor.execute("""
            SELECT category 
            FROM attraction
            """)
        return cursor.fetchall()
