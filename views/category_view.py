from flask import jsonify


class CategoryView:

    def renderGet(categories):
        dataSet = set()
        for category in categories:
            dataSet.add(category["category"])

        return jsonify({"data": list(dataSet)})
        
############################################################
        
    def renderError(message):
        return jsonify(
            {
                "error": True,
                "message": message
            }
        )


