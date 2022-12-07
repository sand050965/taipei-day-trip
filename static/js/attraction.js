import { checkSignin, signIn, signUp, signOut } from "./user.js";
let url = "http://0.0.0.0:3000/";
let userAuth = document.querySelector("#userAuth");
let outLayer = document.querySelector("#outlayer");
let cloes = document.querySelector("#close");
let signButton = document.querySelector("#signButton");
let userName = document.querySelector(".user-name");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signChange = document.querySelector("#signChange");
let message = document.querySelector("#message");
let sliders = document.querySelector(".sliders");
let paginationDots = document.querySelector("#paginationDots");
let leftArrow = document.querySelector("#leftArrow");
let rightArrow = document.querySelector("#rightArrow");
let morning = document.querySelector("#morning");
let afternoon = document.querySelector("#afternoon");
let currentImage = 0;
let maxImage;
let imageList = [];
let arrowList = [leftArrow, rightArrow];
let radioboxList = [morning, afternoon];

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

const loadAttractionById = () => {
  let apiUrl = url + "api/attraction/";
  let attractionLocation = window.location.href;
  let attractionIdIndex = attractionLocation.lastIndexOf("/");
  let attractionId = attractionLocation.substring(attractionIdIndex + 1);

  let attractionName = document.querySelector("#attractionName");
  let attractionCtegoryAndMrt = document.querySelector(
    "#attractionCtegoryAndMrt"
  );
  let description = document.querySelector("#description");
  let address = document.querySelector("#address");
  let transport = document.querySelector("#transport");

  morning.click();
  apiUrl += attractionId;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((jsonResult) => {
      loadData(
        jsonResult,
        attractionName,
        attractionCtegoryAndMrt,
        description,
        address,
        transport
      );
      changePaginationDot(currentImage);
    });
};

const loadData = (jsonResult, ...doms) => {
  imageList = jsonResult["data"]["images"];
  loadImage();
  maxImage = imageList.length - 1;
  for (let i = 0; i < imageList.length; i++) {
    let paginationDotContainer = document.createElement("div");
    let paginationDot = document.createElement("div");
    paginationDotContainer.id = "image" + i;
    paginationDot.id = "image" + i;
    paginationDotContainer.appendChild(paginationDot);
    paginationDots.appendChild(paginationDotContainer);
  }

  doms[0].textContent = jsonResult["data"]["name"];
  doms[1].textContent =
    jsonResult["data"]["category"] + " at " + jsonResult["data"]["mrt"];
  doms[2].textContent = jsonResult["data"]["description"];
  doms[3].textContent = jsonResult["data"]["address"];
  doms[4].textContent = jsonResult["data"]["transport"];
};

const loadImage = () => {
  imageList.forEach((imageSrc) => {
    let attractionImage = document.createElement("img");
    attractionImage.src = imageSrc;
    attractionImage.classList.add("attraction-image");
    let imageContainer = document.createElement("div");
    imageContainer.appendChild(attractionImage);
    sliders.appendChild(imageContainer);
    sliders.classList.add("fade-in-and-out");
  });
};

const changeImage = (e) => {
  let slideWidth = sliders.offsetWidth;
  let imageNumber = parseInt(e.target.id.replace("image", ""));
  sliders.classList.remove("fade-in-and-out");
  if (e.target.id === "leftArrow") {
    if (currentImage === 0) {
      currentImage = maxImage;
    } else {
      currentImage--;
    }
  } else if (e.target.id === "rightArrow") {
    if (currentImage === maxImage) {
      currentImage = 0;
    } else {
      currentImage++;
    }
  } else {
    currentImage = imageNumber;
  }
  sliders.scrollLeft = currentImage * slideWidth;
  sliders.classList.add("fade-in-and-out");
  changePaginationDot(currentImage);
};

const changePaginationDot = (currentImg) => {
  let paginationDotChilds = paginationDots.childNodes;
  paginationDotChilds.forEach((element) => {
    element.childNodes[0].style.backgroundColor = "#ffffff";
  });
  paginationDotChilds[currentImage].childNodes[0].style.backgroundColor =
    "#000000";
};

const checkedTime = (e) => {
  let dollar = document.querySelector("#dollar");
  if (e.target.id === "morning") {
    afternoon.style.backgroundColor = "#ffffff";
    morning.style.backgroundColor = "#448899";
    dollar.textContent = "2000";
  } else if (e.target.id === "afternoon") {
    morning.style.backgroundColor = "#ffffff";
    afternoon.style.backgroundColor = "#448899";
    dollar.textContent = "2500";
  }
};

window.addEventListener("load", checkSignin(url, userAuth), false);
window.addEventListener("load", loadAttractionById, false);

radioboxList.forEach((element) => {
  element.addEventListener("click", checkedTime, false);
});

arrowList.forEach((element) => {
  element.addEventListener("click", changeImage, false);
});

paginationDots.addEventListener("click", changeImage, false);

userAuth.addEventListener("click", doUserAuth, false);

outlayer.addEventListener("click", clearMessageAndInput, false);

cloes.addEventListener("click", cloesUserAuth, false);

signButton.addEventListener("click", doSign, false);

signChange.addEventListener("click", doSignChange, false);
