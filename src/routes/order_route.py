from flask import *
from controllers.order_controller import OrderController as controller

order_api = Blueprint("order_api", __name__)


@order_api.route("/api/orders", methods=["GET", "POST"])
def doOrders():
    return controller.doOrders(request)


@order_api.route("/api/order/<orderNumber>", methods=["GET"])
def getOrder(orderNumber):
    return controller.getOrder(orderNumber)
