import UserController from "/static/js/controllers/user.js";
import AttractionController from "/static/js/controllers/attraction.js";
let url = "http://0.0.0.0:3000/";
let controller = new AttractionController(url);
let userController = new UserController(url);
let arrowList = [
  document.querySelector("#leftArrow"),
  document.querySelector("#rightArrow"),
];
let radioboxList = [
  document.querySelector("#morning"),
  document.querySelector("#afternoon"),
];

/* User Auth */
window.addEventListener("load", userController.init, false);

document
  .querySelector("#userAuth")
  .addEventListener("click", userController.doUserAuth, false);

document
  .querySelector("#outlayer")
  .addEventListener("click", userController.clearMessageAndInput, false);

document
  .querySelector("#close")
  .addEventListener("click", userController.cloesForm, false);

document
  .querySelector("#signButton")
  .addEventListener("click", userController.doSign, false);

document
  .querySelector("#signChange")
  .addEventListener("click", userController.doSignChange, false);

/* attraction */
window.addEventListener("load", controller.init, false);

radioboxList.forEach((element) => {
  element.addEventListener("click", controller.checkedTime, false);
});

arrowList.forEach((element) => {
  element.addEventListener("click", controller.changeImage, false);
});

document
  .querySelector("#paginationDots")
  .addEventListener("click", controller.changeImage, false);
