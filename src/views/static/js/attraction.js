import AttractionController from "./controllers/attractionController.js";
import BookingController from "./controllers/bookingController.js";
const controller = new AttractionController();
const bookingController = new BookingController();
const cart = document.querySelector("#cart");
const date = document.querySelector("#date");
const addToCart = document.querySelector("#addToCart");
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

window.addEventListener("resize", controller.resizeCaresoul, false);

for (const radioBox of radioboxList) {
  radioBox.addEventListener("click", controller.checkedTime, false);
}

for (const arrow of arrowList) {
  arrow.addEventListener("click", controller.changeImage, false);
}

paginationDots.addEventListener("click", controller.changeImage, false);

date.addEventListener("keyup", controller.reValidateDate, false);

date.addEventListener("change", controller.reValidateDate, false);

addToCart.addEventListener("click", bookingController.addToCart, false);

booking.addEventListener("click", bookingController.createBooking, false);
