from utils.validatorUtil import ValidatorUtil
from utils.requestUtil import RequestUtil


class AttractionModel:

    def getAttractions(cursor, request):
        args = RequestUtil.get_request_args(request)
        page = args.get("page")
        ValidatorUtil.validate_page(page)

        limitStart = int(page) * 12
        keyword = args.get("keyword")
        result = dict()
        result["page"] = page

        if (keyword != None):
            result["data"] = AttractionModel.getAttractionByKeyword(
                cursor, keyword, limitStart)
        else:
            result["data"] = AttractionModel.getAttractionByPage(
                cursor, limitStart)

        return result


    def getAttractionByKeyword(cursor, keyword, limitStart):
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


    def getAttractionById(cursor, attractionId):
        ValidatorUtil.validate_attractionId(attractionId)

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
        ValidatorUtil.validate_attraction(result)
        return result
