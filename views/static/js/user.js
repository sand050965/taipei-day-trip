import UserController from "./controllers/userController.js";

const saveButton = document.querySelector("#saveButton");
const menuButton = document.querySelector("#menuContainer");
const controller = new UserController();

window.addEventListener("load", controller.init, false);

window.addEventListener("click", controller.closeSideMenu, false);

saveButton.addEventListener("click", controller.saveUserInfo, false);

menuButton.addEventListener("click", controller.showSideMenu, false);