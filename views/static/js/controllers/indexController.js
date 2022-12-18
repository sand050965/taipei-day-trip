import IndexModel from "/static/js/models/indexModel.js";
import IndexView from "/static/js/views/indexView.js";

export default class IndexController {
  constructor() {
    this.model = new IndexModel();
    this.view = new IndexView();
    this.isLoading = false;
    this.isClickedSearchBar = false;
    this.anchorCount = 0;
    this.currentGroupCount = 0;
    this.totalCount = 0;
    this.page = 0;
    this.keyword = null;
    this.nextPage = null;
  }

  init = async () => {
    let apiUrl = "";

    if (this.keyword != null && this.keyword != "") {
      apiUrl = `/api/attractions?page=${this.page}&keyword=${this.keyword}`;
    } else {
      apiUrl = `/api/attractions?page=${this.page}`;
    }

    this.isLoading = true;
    this.view.renderLoading();
    await this.model.init(apiUrl);
    this.nextPage = this.model.attractionResult.nextPage;
    this.view.renderAttractions(this.model.attractionResult);
    this.anchorCount = this.page * 12 + 1;
    this.currentGroupCount = this.view.currentGroupCount;
    this.totalCount += this.view.currentGroupCount;
    this.preloadImage();
    this.isLoading = false;
  };

  loadMore = () => {
    if (this.nextPage != null) {
      this.page = this.nextPage;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight) {
        if (!this.isLoading) {
          this.init();
        }
      }
    }
  };

  preloadImage = () => {
    let attractionImages = [];
    for (let i = this.anchorCount; i <= this.currentGroupCount; i++) {
      attractionImages.push(document.querySelector(`#image_${i}`));
    }
    
    Promise.all(
      Array.from(attractionImages)
        .filter((img) => !img.complete)
        .map((img) => {
          return new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          });
        })
    ).then(() => {
      this.view.showContent(this.anchorCount, this.totalCount);
    });
  };

  closeCategory = (e) => {
    if (e.target.id === "search-input" || e.target.id === "category-list")
      return;
    if (this.isClickedSearchBar) {
      this.isClickedSearchBar = false;
      this.view.hideCategory();
    }
  };

  categoryFillInput = (e) => {
    if (e.target.childNodes.length > 1) return;
    this.keyword = e.target.textContent;
    this.view.renderSerchBar(e.target.textContent);
  };

  loadCategory = async () => {
    const categoryList = document.querySelector("#category-list");
    const categoryDivs = categoryList.getElementsByTagName("div");
    if (!this.isClickedSearchBar) {
      this.isClickedSearchBar = true;
      if (categoryDivs.length == 0) {
        await this.model.loadCategoryResult("/api/categories");
        this.view.renderCategory(this.model.categoryResult);
      }
      this.view.showCategory();
    }
  };

  searchByKeyword = () => {
    this.view.clearAttraction();
    this.page = 0;
    this.keyword = document.querySelector("#search-bar").value.trim();
    if (this.keyword === "") {
      this.view.renderResultNotFound(true);
      return;
    }
    this.init();
  };
}
