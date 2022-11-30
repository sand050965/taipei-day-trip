let attractionContainer = document.querySelector("#attraction-container");
let categoryList = document.querySelector("#category-list");
let searchBar = document.querySelector("#search-bar");
let magnifier = document.querySelector("#magnifier");
let isLoading = false;
let isClickedSearchBar = false;
let nextPage = null;
let keyword = null;

const loadMore = () => {
  if (nextPage != null) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 100) {
      if (!isLoading) {
        loadAttraction(nextPage, keyword);
      }
    }
  }
};

const loadAttraction = async (page, keyword) => {
  let url = "http://0.0.0.0:3000/api/attractions?page=" + page;

  if (keyword != null && keyword != "") {
    url += "&keyword=" + keyword;
  }

  let imageHref = "http://0.0.0.0:3000/attraction";

  isLoading = true;

  const response = await fetch(url);
  const jsonResult = await response.json();

  nextPage = jsonResult["nextPage"];

  for (let i = 0; i < jsonResult["data"].length; i++) {
    let attractionItemLink = document.createElement("a");
    attractionItemLink.href = imageHref + "/" + jsonResult["data"][i]["id"];

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
    attractionInfo.className = "attraction-info content";
    attractionInfo.appendChild(attractionMrt);
    attractionInfo.appendChild(attractionCategory);
    attractionItem.appendChild(attractionInfo);
    attractionItemLink.appendChild(attractionItem);
    attractionContainer.appendChild(attractionItemLink);
  }

  isLoading = false;
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
      let url = "http://0.0.0.0:3000/api/categories";
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

  if (keyword === null) {
    searchBar.value = "輸入景點名稱查詢";
    searchBar.style.color = "#757575";
  }

  if (isClickedSearchBar) {
    isClickedSearchBar = false;
    categoryList.style.display = "none";
  }
};

const categoryFillInputKeyword = (e) => {
  if (e.target.childNodes.length > 1) {
    return;
  }
  
  keyword = e.target.textContent;
  searchBar.value = e.target.textContent;
  searchBar.style.color = "#000000";
};

const inputFillInputKeyword = () => {
  if (searchBar.value !== "" && searchBar.value !== "輸入景點名稱查詢") {
    keyword = searchBar.value;
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

window.addEventListener("scroll", loadMore, false);

searchBar.addEventListener("click", loadCategory, false);

window.addEventListener("click", closeCategory, true);

categoryList.addEventListener("click", categoryFillInputKeyword, false);

searchBar.addEventListener("change", inputFillInputKeyword, false);

magnifier.addEventListener("click", searchByKeyword, false);
