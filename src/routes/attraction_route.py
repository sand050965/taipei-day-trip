from flask import *
from controllers.attraction_controller import AttractionController as controller

attraction_api = Blueprint("attraction_api", __name__)


@attraction_api.route("/api/attractions", methods=["GET"])
def getAttractions():
    return controller.getAttractions(request)


@attraction_api.route("/api/attraction/<attractionId>", methods=["GET"])
def getAttractionById(attractionId):
    return controller.getAttractionById(attractionId)
