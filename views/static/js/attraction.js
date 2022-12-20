import AttractionController from "./controllers/attractionController.js";
import BookingController from "./controllers/bookingController.js";
const controller = new AttractionController();
const bookingController = new BookingController();
const bookingSchedule = document.querySelector("#bookingSchedule");
const date = document.querySelector("#date");
const booking = document.querySelector("#booking");
const paginationDots = document.querySelector("#paginationDots");
const arrowList = [
  document.querySelector("#leftArrow"),
  document.querySelector("#rightArrow"),
];
const radioboxList = [
  document.querySelector("#morning"),
  document.querySelector("#afternoon"),
];

/* Attraction Event Listeners */
window.addEventListener("load", controller.init, false);

radioboxList.forEach((radioBox) => {
  radioBox.addEventListener("click", controller.checkedTime, false);
});

arrowList.forEach((arrow) => {
  arrow.addEventListener("click", controller.changeImage, false);
});

paginationDots.addEventListener("click", controller.changeImage, false);

date.addEventListener("keyup", controller.reValidateDate, false);

bookingSchedule.addEventListener("click", controller.resetInput, false);

booking.addEventListener("click", bookingController.createBooking, false);
