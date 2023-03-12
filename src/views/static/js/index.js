import IndexController from "./controllers/indexController.js";
const controller = new IndexController();
const categoryList = document.querySelector("#category-list");
const searchBar = document.querySelector("#search-bar");
const magnifier = document.querySelector("#magnifier");



/* Index Event Listeners */

window.addEventListener("load", controller.init, false);

window.addEventListener("scroll", controller.loadMore, false);

window.addEventListener("click", controller.closeCategory, true);

magnifier.addEventListener("mousedown", controller.searchByKeyword, false);

categoryList.addEventListener("click", controller.categoryFillInput, false);

searchBar.addEventListener("click", controller.loadCategory, false);
