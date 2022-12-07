import IndexModel from "/static/js/Models/index.js";
import IndexView from "/static/js/views/index.js";

export default class IndexController {
  constructor(url) {
    this.model = new IndexModel();
    this.view = new IndexView();
    this.url = url;
    this.isLoading = false;
    this.isClickedSearchBar = false;
    this.nextPage = null;
    this.keyword = null;
  }

  init = async (page, keyword) => {
    let apiUrl = this.url + "api/attractions?page=" + page;

    if (keyword != null && keyword != "") {
      apiUrl = apiUrl + "&keyword=" + keyword;
    }

    this.isLoading = true;
    await this.model.init(apiUrl);
    this.nextPage = this.model["attractionResult"]["nextPage"];
    let imageHref = this.url + "attraction";
    this.view.renderAttractions(this.model.attractionResult, imageHref);

    this.isLoading = false;
  };

  loadMore = () => {
    if (this.nextPage != null) {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight - 100) {
        if (!this.isLoading) {
          this.init(this.nextPage, this.keyword);
        }
      }
    }
  };

  closeCategory = (e) => {
    if (e.target.id === "search-input" || e.target.id === "category-list")
      return;
    if (this.isClickedSearchBar) {
      this.isClickedSearchBar = false;
      this.view.renderSerchBar(this.keyword);
      this.view.hideCategory();
    }
  };

  categoryFillInputKeyword = (e) => {
    if (e.target.childNodes.length > 1) return;
    this.keyword = e.target.textContent;
    this.view.renderSerchBar(e.target.textContent);
  };

  loadCategory = async () => {
    let categoryList = document.querySelector("#category-list");
    let categoryDivs = categoryList.getElementsByTagName("div");
    this.view.renderSerchBar("");
    if (!this.isClickedSearchBar) {
      this.isClickedSearchBar = true;
      let apiUrl = this.url + "api/categories";
      if (categoryDivs.length == 0) {
        await this.model.loadCategoryResult(apiUrl);
        this.view.renderCategory(this.model.categoryResult);
      }
      this.view.showCategory();
    }
  };

  inputFillInputKeyword = () => {
    let searchBar = document.querySelector("#search-bar");
    if (searchBar.value.trim() !== "") {
      this.keyword = searchBar.value;
    }
  };

  searchByKeyword = () => {
    if (document.querySelector("#search-bar").value.trim() === "") {
      this.keyword = null;
    }
    this.view.clearAttraction();
    this.init(0, this.keyword);
  };
}
