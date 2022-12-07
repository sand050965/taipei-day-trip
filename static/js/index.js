import { checkSignin, signIn, signUp, signOut } from "./user.js";
let url = "http://0.0.0.0:3000/";
let userAuth = document.querySelector("#userAuth");
let outLayer = document.querySelector("#outlayer");
let form = document.querySelector("#form");
let cloes = document.querySelector("#close");
let signButton = document.querySelector("#signButton");
let userName = document.querySelector(".user-name");
let signChange = document.querySelector("#signChange");
let message = document.querySelector("#message");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let attractionContainer = document.querySelector("#attraction-container");
let categoryList = document.querySelector("#category-list");
let searchBar = document.querySelector("#search-bar");
let magnifier = document.querySelector("#magnifier");
let isLoading = false;
let isClickedSearchBar = false;
let nextPage = null;
let keyword = null;
let inputList = [userName];

const showSignIn = () => {
  form.className = "fade-in";
  userName.style.display = "none";
  popUpTitle.textContent = "登入會員帳號";
  signButton.textContent = "登入帳戶";
  isUser.textContent = "還沒有帳戶？";
};

const showSignUp = () => {
  userName.style.display = "block";
  popUpTitle.textContent = "註冊會員帳號";
  signButton.textContent = "註冊新帳戶";
  isUser.textContent = "已經有帳戶了？";
};

const doUserAuth = () => {
  if (userAuth.textContent === "登入/註冊") {
    showSignIn();
    outLayer.style.display = "block";
    document.body.style.overflow = "hidden";
    userName.style.display = "none";
    message.display = "none";
  } else {
    signOut(url);
  }
};

const cloesUserAuth = () => {
  clearInput();
  outLayer.style.display = "none";
  document.body.style.overflow = "";
};

const doSign = (e) => {
  if (e.target.textContent === "登入帳戶") {
    signIn(message, url, email.value, password.value);
  } else if (e.target.textContent === "註冊新帳戶") {
    signUp(message, url, name.value, email.value, password.value);
  }
};

const doSignChange = (e) => {
  let popUpTitle = document.querySelector("#popUpTitle");
  let isUser = document.querySelector("#isUser");
  if (e.target.textContent === "點此登入") {
    showSignIn();
    clearInput();
    e.target.textContent = "點此註冊";
  } else if (e.target.textContent === "點此註冊") {
    showSignUp();
    clearInput();
    e.target.textContent = "點此登入";
  }
};

const clearInput = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  message.style.display = "none";
};

const clearMessageAndInput = () => {
  if (message.style.display != "none") clearInput();
};

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
  let apiUrl = url + "api/attractions?page=" + page;

  if (keyword != null && keyword != "") {
    apiUrl = apiUrl + "&keyword=" + keyword;
  }

  let imageHref = url + "attraction";

  isLoading = true;

  const response = await fetch(apiUrl);
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
      let apiUrl = url + "api/categories";
      const response = await fetch(apiUrl);
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
  if (searchBar.value.trim() !== "") {
    keyword = searchBar.value;
    searchBar.style.color = "#000000";
  }
};

const searchByKeyword = () => {
  if (searchBar.value.trim() === "") {
    keyword = null;
  }

  clearAttraction();

  loadAttraction(0, keyword);
};

window.addEventListener("load", checkSignin(url, userAuth), false);

window.addEventListener("load", loadAttraction(0, null));

window.addEventListener("scroll", loadMore, false);

searchBar.addEventListener("click", loadCategory, false);

window.addEventListener("click", closeCategory, true);

categoryList.addEventListener("click", categoryFillInputKeyword, false);

searchBar.addEventListener("change", inputFillInputKeyword, false);

magnifier.addEventListener("click", searchByKeyword, false);

userAuth.addEventListener("click", doUserAuth, false);

outlayer.addEventListener("click", clearMessageAndInput, false);

cloes.addEventListener("click", cloesUserAuth, false);

signButton.addEventListener("click", doSign, false);

signChange.addEventListener("click", doSignChange, false);
