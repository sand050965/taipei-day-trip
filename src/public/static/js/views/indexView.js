export default class IndexView {

  constructor() {
    this.currentGroupCount = 0;
  }

  renderAttractions = (jsonResult) => {
    const attractionContainer = document.querySelector("#attraction-container");
    this.currentGroupCount = jsonResult.data.length;

    if (jsonResult.data.length === 0) {
      this.renderResultNotFound(true);
      return;
    }

    for (const attractionData of jsonResult.data) {
      const attractionItemLink = document.createElement("a");
      attractionItemLink.href = `/attraction/${attractionData.id}`;
      attractionItemLink.id = `attraction_${attractionData.id}`;
      attractionItemLink.classList.add("none");

      const attractionItem = document.createElement("div");
      attractionItem.className = "attraction-item";
      const attractionImageAndName = document.createElement("div");
      attractionImageAndName.classList.add("attraction-image-name");

      const attractionImage = document.createElement("img");
      attractionImage.setAttribute("src", attractionData.images[0]);
      attractionImage.id = `image_${attractionData.id}`;
      attractionImage.setAttribute("name", "attraction_image");
      attractionImageAndName.appendChild(attractionImage);

      const attractionName = document.createElement("div");
      attractionName.textContent = attractionData.name;
      attractionImageAndName.appendChild(attractionName);
      attractionItem.appendChild(attractionImageAndName);

      const attractionInfo = document.createElement("div");
      const attractionMrt = document.createElement("div");
      const attractionCategory = document.createElement("div");
      attractionMrt.textContent = attractionData.mrt;
      attractionCategory.textContent = attractionData.category;
      attractionInfo.classList.add("attraction-info");
      attractionInfo.classList.add("content");
      attractionInfo.appendChild(attractionMrt);
      attractionInfo.appendChild(attractionCategory);
      attractionItem.appendChild(attractionInfo);
      attractionItemLink.appendChild(attractionItem);

      attractionContainer.appendChild(attractionItemLink);
    }
  };


  renderLoading = () => {
    const count = document.querySelector("#count");
    count.classList.remove("loaded");
    count.classList.add("loading");
    count.innerHTML = "Loading...";
    document.querySelector("#semiCircle").classList.remove("none");
    document.querySelector("#loader").classList.remove("none");
  };


  showContent = (attractionItemsArray) => {
    document.querySelector("#loader").classList.add("none");
    for (const item of attractionItemsArray) {
      item.classList.remove("none");
    }
  };


  renderCategory = (jsonResult) => {
    const categoryList = document.querySelector("#category-list");
    for (let i = 0; i < jsonResult.data.length; i++) {
      const categoryItem = document.createElement("div");
      categoryItem.textContent = jsonResult.data[i];
      categoryList.appendChild(categoryItem);
      categoryItem.className = "category-item";
    }
  };


  showCategory = () => {
    const mask = document.querySelector("#mask");
    mask.classList.remove("none");
    mask.classList.add("mask");
    document.querySelector("#category-list").style.display = "grid";
    document.body.style.overflow = "hidden";
  };


  hideCategory = () => {
    const mask = document.querySelector("#mask");
    mask.classList.add("none");
    mask.classList.remove("mask");
    document.body.style.overflow = "";
    document.querySelector("#category-list").style.display = "none";
  };


  renderSerchBar = (inputText) => {
    document.querySelector("#search-bar").value = inputText;
  };


  clearAttraction = () => {
    this.renderResultNotFound(false);
    document.querySelector("#attraction-container").innerHTML = "";
  };


  renderResultNotFound = (isNotFound) => {
    const pageNotFound = document.querySelector("#pageNotFound");
    isNotFound
      ? pageNotFound.classList.remove("none")
      : pageNotFound.classList.add("none");
  };
}
