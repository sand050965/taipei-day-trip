from flask import *

pages = Blueprint("pages", __name__)


@pages.route("/")
def index():
    return render_template("index.html")


@pages.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html")


@pages.route("/booking/<id>")
def booking(id):
    return render_template("booking.html")


@pages.route("/cart")
def cart():
    return render_template("cart.html")


@pages.route("/cartcheckout")
def cartCheckout():
    return render_template("cartcheckout.html")


@pages.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


@pages.route("/error")
def error():
    return render_template("error.html")
