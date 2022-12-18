class AttractionModel:

    def getAttractionByKeyword(cursor, limitStart, keyword):
        cursor.execute(
            """
            SELECT
                att.id, 
                att.attraction_name, 
                att.category, 
                att.description,
                att.address, 
                att.transport, 
                att.mrt, 
                att.latitude, 
                att.longitude, 
                group_concat(img.image_url) as images
            FROM attraction att
            INNER JOIN image img
            ON att.id = img.attraction_id
            WHERE att.category = %s
            OR att.attraction_name LIKE %s
            GROUP BY img.attraction_id
            LIMIT %s, %s
            """, (keyword, f"%{keyword}%", limitStart, 13)
        )
        return cursor.fetchall()

############################################################

    def getAttractionByPage(cursor, limitStart):
        cursor.execute(
            """
            SELECT 
                att.id, 
                att.attraction_name, 
                att.category, 
                att.description, 
                att.address, 
                att.transport, 
                att.mrt, 
                att.latitude, 
                att.longitude, 
                group_concat(img.image_url) as images
            FROM attraction att
            INNER JOIN image img
            ON att.id = img.attraction_id
            GROUP BY img.attraction_id
            LIMIT %s, %s
            """, (limitStart, 13)
        )

        return cursor.fetchall()

############################################################

    def getAttractionById(cursor, attractionId):
        cursor.execute(
            """
            SELECT 
                att.id, 
                att.attraction_name, 
                att.category, 
                att.description, 
                att.address, 
                att.transport, 
                att.mrt, 
                att.latitude, 
                att.longitude, 
                group_concat(img.image_url) as images
            FROM attraction att
            INNER JOIN image img
            ON att.id = img.attraction_id
            WHERE att.id = %s
            GROUP BY img.attraction_id
            """, (attractionId, )
        )
        result = cursor.fetchone()
        if result == None:
            return None
        else:
            return dict(zip(cursor.column_names, result))
