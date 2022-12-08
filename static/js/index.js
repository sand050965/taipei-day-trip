import UserController from "/static/js/controllers/user.js";
import indexController from "/static/js/controllers/index.js";
let url = "http://0.0.0.0:3000/";
let controller = new indexController(url);
let userController = new UserController(url);

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

/* index */
window.addEventListener("load", controller.init(0, controller.keyword));

window.addEventListener("scroll", controller.loadMore, false);

window.addEventListener("click", controller.closeCategory, true);

document
  .querySelector("#category-list")
  .addEventListener("click", controller.categoryFillInputKeyword, false);

document
  .querySelector("#search-bar")
  .addEventListener("click", controller.loadCategory, false);

document
  .querySelector("#search-bar")
  .addEventListener("change", controller.inputFillInputKeyword, false);

document
  .querySelector("#magnifier")
  .addEventListener("click", controller.searchByKeyword, false);
