import UserController from "./controllers/userController.js";

const saveButton = document.querySelector("#saveButton");
const controller = new UserController();

window.addEventListener("load", controller.init, false);

saveButton.addEventListener("click", controller.saveUserInfo, false);
