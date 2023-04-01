import UserAuthController from "./controllers/baseController.js";
import AvatarController from "./controllers/avatarController.js";

const controller = new UserAuthController();
const avatarController = new AvatarController();

const navbarAvatarContainer = document.querySelector("#navbarAvatarContainer");
const userAuth = document.querySelector("#userAuth");
const closeIcon = document.querySelector("#closeIcon");
const navbarAvatarImg = document.querySelector("#navbarAvatarImg");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const showPassword = document.querySelector("#showPassword");
const hidePassword = document.querySelector("#hidePassword");
const signButton = document.querySelector("#signButton");
const signChange = document.querySelector("#signChange");
const menuButton = document.querySelector("#menuContainer");
const inputs = [username, email, password];
const passwordTriggers = [showPassword, hidePassword];
const cart = document.querySelector("#cart");

window.addEventListener("load", controller.init, false);

window.addEventListener("click", controller.closeUserService, false);

navbarAvatarContainer.addEventListener("click", controller.doUserAuth, false);

navbarAvatarImg.addEventListener("load", avatarController.resizeAvatar, false);

userAuth.addEventListener("click", controller.doSignOut, false);

closeIcon.addEventListener("click", controller.closeModal, false);

signChange.addEventListener("mousedown", controller.doSignChange, true);

menuButton.addEventListener("click", controller.showSideMenu, false);

passwordTriggers.forEach((trigger) => {
  trigger.addEventListener("mousedown", controller.togglePassword, false);
});

for (const input of inputs) {
  input.addEventListener("change", controller.doValidate, false);
  input.addEventListener("keyup", controller.reValidate, false);
}

signButton.addEventListener("click", controller.doSign, false);

cart.addEventListener("click", controller.getToCart, false);
