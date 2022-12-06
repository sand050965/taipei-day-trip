class Attraction:
    def getByKeyword(cursor, limitStart, keyword):
        cursor.execute(
            "select att.id, att.attraction_name, att.category, att.description, att.address, att.transport, att.mrt, att.latitude, att.longitude, group_concat(img.image_url) " +
            "from attraction att " +
            "inner join image img " +
            "on att.id = img.attraction_id " +
            "where att.category = %s " +
            "or att.attraction_name like %s " +
            "group by img.attraction_id " +
            "limit %s, %s", (
                keyword, f"%{keyword}%", limitStart, 13)
        )
        return cursor.fetchall()


    def getByPage(cursor, limitStart, keyword):
        cursor.execute(
            "select att.id, att.attraction_name, att.category, att.description, att.address, att.transport, att.mrt, att.latitude, att.longitude, group_concat(img.image_url) " +
            "from attraction att " +
            "inner join image img " +
            "on att.id = img.attraction_id " +
            "group by img.attraction_id " +
            "limit %s, %s", (
                limitStart, 13)
        )

        return cursor.fetchall()


    def getById(cursor, attractionId):
        cursor.execute(
            "select att.id, att.attraction_name, att.category, att.description, att.address, att.transport, att.mrt, att.latitude, att.longitude, group_concat(img.image_url) " +
            "from attraction att " +
            "inner join image img " +
            "on att.id = img.attraction_id " +
            "where att.id = %s"
            "group by img.attraction_id", (attractionId, )
        )
        return cursor.fetchone()
