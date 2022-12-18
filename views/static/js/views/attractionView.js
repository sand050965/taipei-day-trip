export default class attractionViews {
  renderAttraction = (jsonResult) => {
    let paginationDots = document.querySelector("#paginationDots");
    for (let i = 0; i < jsonResult.data.images.length; i++) {
      let paginationDotContainer = document.createElement("div");
      let paginationDot = document.createElement("div");
      paginationDotContainer.id = `image${i}`;
      paginationDot.id = `image${i}`;
      paginationDotContainer.appendChild(paginationDot);
      paginationDots.appendChild(paginationDotContainer);
    }

    document.querySelector("#attractionName").textContent =
      jsonResult.data.name;
    document.querySelector(
      "#attractionCtegoryAndMrt"
    ).textContent = `${jsonResult.data.category} at ${jsonResult.data.mrt}`;
    document.querySelector("#description").textContent =
      jsonResult.data.description;
    document.querySelector("#address").textContent = jsonResult.data.address;
    document.querySelector("#transport").textContent =
      jsonResult.data.transport;
  };

  renderImage = (imageList) => {
    let sliders = document.querySelector(".sliders");
    imageList.forEach((imageSrc) => {
      let attractionImage = document.createElement("img");
      attractionImage.src = imageSrc;
      attractionImage.classList.add("attraction-image");
      attractionImage.setAttribute("name", "attraction_image");
      let imageContainer = document.createElement("div");
      imageContainer.appendChild(attractionImage);
      sliders.appendChild(imageContainer);
      sliders.classList.add("fade-in-and-out");
    });
  };

  renderLoading = () => {
    const count = document.querySelector("#count");
    count.classList.remove("loaded");
    count.classList.add("loading");
    count.innerHTML = "Loading...";
    document.querySelector("#semiCircle").classList.remove("none");
    document.querySelector("#loader").classList.remove("none");
    document.querySelector("#mask").classList.remove("none");
  };

  showContent = (start, end) => {
    document.querySelector("#loader").classList.add("none");
    document.querySelector("#mask").classList.add("none");
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

  renderTimeAndDollar = (morningClass, afternoonClass, dollar) => {
    const morning = document.querySelector("#morning");
    const afternoon = document.querySelector("#afternoon");
    morning.classList.remove(afternoonClass);
    morning.classList.add(morningClass);
    afternoon.classList.remove(morningClass);
    afternoon.classList.add(afternoonClass);
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
