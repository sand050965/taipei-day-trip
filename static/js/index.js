const $ = (element) => document.querySelector(element);

let attractionContainer = $("#attraction-container");
let categoryList = $("#category-list");
let searchBar = $("#search-bar");
let magnifier = $("#magnifier");
let isClickedSearchBar = false;
let nextPage = null;
let keyword = null;

const throttle = (callback, delay) => {
  let timer = null,
    isClose = false;
  return (...args) => {
    if (isClose) return;

    isClose = true;
    clearTimeout(timer);
    timer = setTimeout(
      function () {
        callback.apply(this, args);
        isClose = false;
      }.bind(this),
      delay
    );
  };
};

const loadMore = () => {
  if (nextPage != null) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
      loadAttraction(nextPage, keyword);
    }
  }
};

const loadAttraction = async (page, keyword) => {
  url = "http://0.0.0.0:3000/api/attractions?page=" + page;

  if (keyword != null && keyword != "") {
    url += "&keyword=" + keyword;
  }

  const response = await fetch(url);
  const jsonResult = await response.json();

  nextPage = jsonResult["nextPage"];

  for (let i = 0; i < jsonResult["data"].length; i++) {
    let attractionItem = document.createElement("div");
    attractionItem.className = "attraction-item";
    let attractionImageAndName = document.createElement("div");
    attractionImageAndName.className = "attraction-image-name";

    let attractionImage = document.createElement("img");
    attractionImage.setAttribute("src", jsonResult["data"][i]["images"][0]);
    attractionImageAndName.appendChild(attractionImage);

    let attractionName = document.createElement("div");
    attractionName.textContent = jsonResult["data"][i]["name"];
    attractionImageAndName.appendChild(attractionName);
    attractionItem.appendChild(attractionImageAndName);

    let attractionInfo = document.createElement("div");
    let attractionMrt = document.createElement("div");
    let attractionCategory = document.createElement("div");
    attractionMrt.textContent = jsonResult["data"][i]["mrt"];
    attractionCategory.textContent = jsonResult["data"][i]["category"];
    attractionInfo.className = "attraction-info";
    attractionInfo.appendChild(attractionMrt);
    attractionInfo.appendChild(attractionCategory);
    attractionItem.appendChild(attractionInfo);

    attractionContainer.appendChild(attractionItem);
  }
};

const clearAttraction = () => {
  attractionContainer.innerHTML = "";
};

const loadCategory = async (e) => {
  searchBar.value = "";
  let categoryDivs = categoryList.getElementsByTagName("div");
  if (!isClickedSearchBar) {
    keyword = null;
    isClickedSearchBar = true;
    if (categoryDivs.length == 0) {
      url = "http://0.0.0.0:3000/api/categories";
      const response = await fetch(url);
      const jsonResult = await response.json();
      for (let i = 0; i < jsonResult["data"].length; i++) {
        let categoryItem = document.createElement("div");
        categoryItem.textContent = jsonResult["data"][i];
        categoryList.appendChild(categoryItem);
        categoryItem.className = "category-item";
      }
    }
    categoryList.style.display = "grid";
  }
};

const closeCategory = (e) => {
  if (e.target.id === "search-input" || e.target.id === "category-list") {
    return;
  }

  if (keyword == null) {
    searchBar.value = "輸入景點名稱查詢";
    searchBar.style.color = "#757575";
  }

  if (isClickedSearchBar) {
    isClickedSearchBar = false;
    categoryList.style.display = "none";
  }
};

const fillInputKeyword = (e) => {
  keyword = e.target.textContent;
  if (keyword != null) {
    searchBar.value = keyword;
    searchBar.style.color = "#000000";
  }
};

const searchByKeyword = () => {
  if (searchBar.value === "" || searchBar.value === "輸入景點名稱查詢") {
    keyword = null;
  }

  clearAttraction();

  loadAttraction(0, keyword);
};

window.addEventListener("load", loadAttraction(0, null));

window.addEventListener("scroll", throttle(loadMore, 100), false);

searchBar.addEventListener("click", loadCategory, true);

window.addEventListener("click", closeCategory, true);

categoryList.addEventListener("click", fillInputKeyword, true);

magnifier.addEventListener("click", searchByKeyword, 1000, true);
