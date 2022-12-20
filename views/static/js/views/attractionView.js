export default class AttractionView {
  renderAttraction = (jsonResult) => {
    const address = jsonResult.data.address.replace(/ /g, "");
    const paginationDots = document.querySelector("#paginationDots");
    for (let i = 0; i < jsonResult.data.images.length; i++) {
      const paginationDotContainer = document.createElement("div");
      const paginationDot = document.createElement("div");
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
    document.querySelector(
      "#map"
    ).src = `https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${address}&z=16&output=embed&t=`;
    document.querySelector("#transport").textContent =
      jsonResult.data.transport;
    this.renderTimeAndDollar("checked", "unchecked", "2000");
  };

  // =================================================================

  renderImage = (imagesSrcArray) => {
    const sliders = document.querySelector(".sliders");
    imagesSrcArray.forEach((imageSrc) => {
      const attractionImage = document.createElement("img");
      attractionImage.src = imageSrc;
      attractionImage.classList.add("attraction-image");
      attractionImage.setAttribute("name", "attraction_image");
      const imageContainer = document.createElement("div");
      imageContainer.appendChild(attractionImage);
      sliders.appendChild(imageContainer);
      sliders.classList.add("fade-in-and-out");
    });
  };

  // =================================================================

  renderLoading = () => {
    const count = document.querySelector("#count");
    count.classList.remove("loaded");
    count.classList.add("loading");
    count.innerHTML = "Loading...";
    document.querySelector("#semiCircle").classList.remove("none");
    document.querySelector("#loader").classList.remove("none");
    document.querySelector("#mask").classList.remove("none");
  };

  // =================================================================

  showContent = () => {
    document.querySelector("#loader").classList.add("none");
    document.querySelector("#mask").classList.add("none");
  };

  // =================================================================

  renderPaginationDotChange = (currentImage) => {
    const paginationDotChilds =
      document.querySelector("#paginationDots").childNodes;
    paginationDotChilds.forEach((element) => {
      element.childNodes[0].style.backgroundColor = "#ffffff";
    });
    paginationDotChilds[currentImage].childNodes[0].style.backgroundColor =
      "#000000";
  };

  // =================================================================

  renderTimeAndDollar = (morningClass, afternoonClass, dollar) => {
    const morning = document.querySelector("#morning");
    const afternoon = document.querySelector("#afternoon");
    morning.classList.remove(afternoonClass);
    morning.classList.add(morningClass);
    afternoon.classList.remove(morningClass);
    afternoon.classList.add(afternoonClass);
    document.querySelector("#dollar").textContent = dollar;
  };

  // =================================================================

  imageScroll = (currentImage) => {
    const sliders = document.querySelector(".sliders");
    const slideWidth = sliders.offsetWidth;
    sliders.classList.remove("fade-in-and-out");
    sliders.scrollLeft = currentImage * slideWidth;
    sliders.classList.add("fade-in-and-out");
  };

  // =================================================================

  renderErrorMessage = (errorMessage) => {
    const title = "預約行程錯誤";
    const message = errorMessage;
    const buttonValue = "確認";
    const modalTitle = document.querySelector("#modalTitle");
    const successMessage = document.querySelector("#signMessage");

    modalTitle.textContent = title;
    modalTitle.classList.remove("success");
    modalTitle.classList.add("error");
    signMessage.textContent = message;
    signMessage.classList.remove("none");
    document.querySelector("#errorMessage").classList.add("none");
    document.querySelector("#usernameContainer").classList.add("none");
    document.querySelector("#emailContainer").classList.add("none");
    document.querySelector("#passwordContainer").classList.add("none");
    document.querySelector("#signChangeRemind").classList.add("none");
    document.querySelector("#signButton").value = buttonValue;
  };

  // =================================================================

  renderErrorDate = (isErrorDate) => {
    const date = document.querySelector("#date");
    if (isErrorDate) {
      date.classList.add("error-date");
      date.classList.remove("correct-date");
    } else {
      date.classList.add("correct-date");
      date.classList.remove("error-date");
    }
  };

  // =================================================================

  resetInput = () => {
    document.querySelector("date").value = "";
    this.renderTimeAndDollar("checked", "unchecked", "2000");
    this.renderErrorDate(false);
  };
}
