let url = "http://0.0.0.0:3000/";
let sliders = document.querySelector(".sliders");
let paginationDots = document.querySelector("#paginationDots");
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

window.addEventListener("load", loadAttractionById, false);

radioboxList.forEach((element) => {
  element.addEventListener("click", checkedTime, false);
});

arrowList.forEach((element) => {
  element.addEventListener("click", changeImage, false);
});

paginationDots.addEventListener("click", changeImage, false);
