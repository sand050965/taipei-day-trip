import UserAuthController from "./controllers/userAuthController.js";
import CartController from "./controllers/userAuthController.js";
const controller = new UserAuthController();
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
const cart = document.querySelector("#cart");

/* User Auth Event Listeners */
window.addEventListener("load", controller.init, false);

userAuth.addEventListener("click", controller.doUserAuth, false);

closeIcon.addEventListener("click", controller.closeModal, false);

signChange.addEventListener("mousedown", controller.doSignChange, true);

passwordTriggers.forEach((trigger) => {
  trigger.addEventListener("mousedown", controller.togglePassword, false);
});

for (const input of inputs) {
  input.addEventListener("change", controller.doValidate, false);
  input.addEventListener("keyup", controller.reValidate, false);
}

signButton.addEventListener("click", controller.doSign, false);

cart.addEventListener("click", controller.getToCart, false);
