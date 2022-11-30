let attractionImage = document.querySelector("#attractionImage");
let imageOrder = document.querySelector("#imageOrder");
let currentImage = 0;
let maxImage;
let imageList = [];

const arrowList = [
  (leftArrow = document.querySelector("#leftArrow")),
  (rightArrow = document.querySelector("#rightArrow")),
];

const radioboxList = [
  (morning = document.querySelector("#morning")),
  (afternoon = document.querySelector("#afternoon")),
];

const loadAttractionById = () => {
  let url = "http://0.0.0.0:3000/api/attraction/";
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
  url += attractionId;
  fetch(url)
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

      changeImageOrder(currentImage);
    });
};

const loadData = (jsonResult, ...doms) => {
  imageList = jsonResult["data"]["images"];
  attractionImage.src = imageList[0];
  maxImage = imageList.length - 1;
  for (let i = 0; i < imageList.length; i++) {
    let orderDotContainer = document.createElement("div");
    let orderDot = document.createElement("div");
    orderDotContainer.id = "image" + i;
    orderDot.id = "image" + i;
    orderDotContainer.appendChild(orderDot);
    imageOrder.appendChild(orderDotContainer);
  }

  doms[0].textContent = jsonResult["data"]["name"];
  doms[1].textContent =
    jsonResult["data"]["category"] + " at " + jsonResult["data"]["mrt"];
  doms[2].textContent = jsonResult["data"]["description"];
  doms[3].textContent = jsonResult["data"]["address"];
  doms[4].textContent = jsonResult["data"]["transport"];
};

const changeImage = (e) => {
  let imageNumber = parseInt(e.target.id.replace("image", ""));
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
  attractionImage.src = imageList[currentImage];
  changeImageOrder(currentImage);
};

const changeImageOrder = (currentImg) => {
  let imageOrderChilds = imageOrder.childNodes;
  imageOrderChilds.forEach((element) => {
    element.childNodes[0].style.backgroundColor = "#ffffff";
  });
  imageOrderChilds[currentImage].childNodes[0].style.backgroundColor =
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

window.addEventListener("load", loadAttractionById, false);

radioboxList.forEach((element) => {
  element.addEventListener("click", checkedTime, false);
});

arrowList.forEach((element) => {
  element.addEventListener("click", changeImage, false);
});

imageOrder.addEventListener("click", changeImage, false);
