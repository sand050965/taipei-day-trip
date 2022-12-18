import UserAuthController from "../../../views/static/js/controllers/userAuthController.js";
import BookingController from "./controllers/bookingController.js";
const userController = new UserAuthController();
const bookingController = new BookingController();
const userAuth = document.querySelector("#userAuth");
const closeIcon = document.querySelector("#closeIcon");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const showPassword = document.querySelector("#showPassword");
const hidePassword = document.querySelector("#hidePassword");
const signButton = document.querySelector("#signButton");
const signChange = document.querySelector("#signChange");
const inputs = [username, email, password];
const passwordTriggers = [showPassword, hidePassword];
const bookingSchedule = document.querySelector("#bookingSchedule");

/* User Auth */
window.addEventListener("load", userController.init, false);

userAuth.addEventListener("click", userController.doUserAuth, false);

closeIcon.addEventListener("click", userController.closeModal, false);

signChange.addEventListener("mousedown", userController.doSignChange, true);

passwordTriggers.forEach((trigger) => {
  trigger.addEventListener("mousedown", userController.togglePassword, false);
});

inputs.forEach((input) => {
  input.addEventListener("change", userController.doValidate, false);
  input.addEventListener("keyup", userController.reValidate, false);
});

signButton.addEventListener("click", userController.doSign, false);

/* booking */
bookingSchedule.addEventListener("click", bookingController.getBooking, false);
