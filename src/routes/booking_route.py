from flask import *
from controllers.booking_controller import BookingController as controller

booking_api = Blueprint("booking_api", __name__)


@booking_api.route("/api/booking", methods=["POST", "DELETE"])
def getBooking():
    return controller.getBooking(request)


@booking_api.route("/api/bookings", methods=["GET", "DELETE"])
def getBookings():
    return controller.getBookings(request) 

@booking_api.route("/api/booking/<bookingId>", methods=["GET"])
def getBookingByBookingId(bookingId):
    return controller.getBookings(request, bookingId) 