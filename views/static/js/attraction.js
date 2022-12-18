import AttractionController from "/static/js/controllers/attractionController.js";
import BookingController from "/static/js/controllers/bookingController.js";
const controller = new AttractionController();
const bookingController = new BookingController();
const booking = document.querySelector("#booking");
const paginationDots = document.querySelector("#paginationDots");
const arrowList = [
  document.querySelector("#leftArrow"),
  document.querySelector("#rightArrow"),
];
let radioboxList = [
  document.querySelector("#morning"),
  document.querySelector("#afternoon"),
];

/* attraction */
window.addEventListener("load", controller.init, false);

radioboxList.forEach((radioBox) => {
  radioBox.addEventListener("click", controller.checkedTime, false);
});

arrowList.forEach((arrow) => {
  arrow.addEventListener("click", controller.changeImage, false);
});

paginationDots.addEventListener("click", controller.changeImage, false);

booking.addEventListener("click", bookingController.createBooking, false);
