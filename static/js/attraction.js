import AttractionController from "/static/js/controllers/attraction.js";
const controller = new AttractionController();
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

document
  .querySelector("#paginationDots")
  .addEventListener("click", controller.changeImage, false);
