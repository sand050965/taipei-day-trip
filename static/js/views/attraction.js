export default class attractionViews {
  renderAttraction = (jsonResult) => {
    let paginationDots = document.querySelector("#paginationDots");
    for (let i = 0; i < jsonResult["data"]["images"].length; i++) {
      let paginationDotContainer = document.createElement("div");
      let paginationDot = document.createElement("div");
      paginationDotContainer.id = "image" + i;
      paginationDot.id = "image" + i;
      paginationDotContainer.appendChild(paginationDot);
      paginationDots.appendChild(paginationDotContainer);
    }

    document.querySelector("#attractionName").textContent =
      jsonResult["data"]["name"];
    document.querySelector("#attractionCtegoryAndMrt").textContent =
      jsonResult["data"]["category"] + " at " + jsonResult["data"]["mrt"];
    document.querySelector("#description").textContent =
      jsonResult["data"]["description"];
    document.querySelector("#address").textContent =
      jsonResult["data"]["address"];
    document.querySelector("#transport").textContent =
      jsonResult["data"]["transport"];
  };

  renderImage = (imageList) => {
    let sliders = document.querySelector(".sliders");
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

  renderPaginationDotChange = (currentImage) => {
    let paginationDotChilds =
      document.querySelector("#paginationDots").childNodes;
    paginationDotChilds.forEach((element) => {
      element.childNodes[0].style.backgroundColor = "#ffffff";
    });
    paginationDotChilds[currentImage].childNodes[0].style.backgroundColor =
      "#000000";
  };

  renderTimeAndDollar = (morning, afternoon, dollar) => {
    document.querySelector("#afternoon").style.backgroundColor = afternoon;
    document.querySelector("#morning").style.backgroundColor = morning;
    document.querySelector("#dollar").textContent = dollar;
  };

  imageScroll = (currentImage) => {
    let sliders = document.querySelector(".sliders");
    let slideWidth = sliders.offsetWidth;
    sliders.classList.remove("fade-in-and-out");
    sliders.scrollLeft = currentImage * slideWidth;
    sliders.classList.add("fade-in-and-out");
  };
}
