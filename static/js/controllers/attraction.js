import AttractionModel from "/static/js/models/attraction.js";
import AttractionView from "/static/js/views/attraction.js";

export default class AttractionController {
  constructor(url) {
    this.model = new AttractionModel();
    this.view = new AttractionView();
    this.url = url;
    this.currentImage = 0;
    this.maxImage = 0;
    this.imageList = [];
  }

  init = async () => {
    let apiUrl = this.url + "api/attraction/";
    let attractionLocation = window.location.href;
    let attractionIdIndex = attractionLocation.lastIndexOf("/");
    let attractionId = attractionLocation.substring(attractionIdIndex + 1);

    document.querySelector("#morning").click();
    apiUrl += attractionId;
    await this.model.init(apiUrl);
    this.view.renderAttraction(this.model.attractionResult);
    this.imageList = this.model.attractionResult["data"]["images"];
    this.maxImage = this.imageList.length - 1;
    this.view.renderImage(this.imageList);
    this.view.renderPaginationDotChange(this.currentImage);
  };

  checkedTime = (e) => {
    if (e.target.id === "morning") {
      this.view.renderTimeAndDollar("#448899", "#ffffff", "2000");
    } else if (e.target.id === "afternoon") {
      this.view.renderTimeAndDollar("#ffffff", "#448899", "2500");
    }
  };

  changeImage = (e) => {
    let imageNumber = parseInt(e.target.id.replace("image", ""));
    if (e.target.id === "leftArrow") {
      if (this.currentImage === 0) {
        this.currentImage = this.maxImage;
      } else {
        this.currentImage--;
      }
    } else if (e.target.id === "rightArrow") {
      if (this.currentImage === this.maxImage) {
        this.currentImage = 0;
      } else {
        this.currentImage++;
      }
    } else {
      this.currentImage = imageNumber;
    }
    this.view.imageScroll(this.currentImage);
    this.view.renderPaginationDotChange(this.currentImage);
  };
}
