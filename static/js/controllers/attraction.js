import AttractionModel from "/static/js/models/attraction.js";
import AttractionView from "/static/js/views/attraction.js";

export default class AttractionController {
  constructor() {
    this.model = new AttractionModel();
    this.view = new AttractionView();
    this.currentImage = 0;
    this.maxImage = 0;
    this.imageList = [];
  }

  init = async () => {
    this.view.renderLoading();
    let url = window.location.href;
    let attractionId = url.split("/")[4];
    document.querySelector("#morning").click();
    await this.model.init(`/api/attraction/${attractionId}`);
    this.view.renderAttraction(this.model.attractionResult);
    this.imageList = this.model.attractionResult.data.images;
    this.maxImage = this.imageList.length - 1;
    this.view.renderImage(this.imageList);
    this.view.renderPaginationDotChange(this.currentImage);
    this.preloadImage();
  };

  preloadImage = () => {
    let attractionImages = document.querySelectorAll(
      '[name="attraction_image"]'
    );

    let loadedCount = 0;
    Promise.all(
      Array.from(attractionImages)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              loadedCount++;
              img.onload = img.onerror = resolve;
            })
        )
    ).then(() => {
      this.view.showContent();
    });
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
