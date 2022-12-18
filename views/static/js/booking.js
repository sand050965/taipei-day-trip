import BookingController from "/static/js/controllers/bookingController.js";
const controller = new BookingController();
const onDelete = document.querySelector("#delete");

/* booking */
window.addEventListener("load", controller.init, false);

onDelete.addEventListener("click", controller.deleteBooking, false);
