import BookingController from "./controllers/bookingController.js";
const controller = new BookingController();
const onDelete = document.querySelector("#delete");
const payButton = document.querySelector("#payButton");
const inputs = document.querySelectorAll("input");

window.addEventListener("load", controller.init, false);

onDelete.addEventListener("click", controller.deleteBookingById, false);

payButton.addEventListener("click", controller.doPayOrder, false);

for (const input of inputs) {
  input.addEventListener("keyup", controller.revalidate, false);
}