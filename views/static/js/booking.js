import BookingController from "./controllers/bookingController.js";
const controller = new BookingController();
const onDelete = document.querySelector("#delete");

/* Booking Event Listeners */
window.addEventListener("load", controller.init, false);

onDelete.addEventListener("click", controller.deleteBooking, false);
