export default class IndexModel {
  constructor() {
    this.attractionResult = {};
    this.categoryResult = {};
  }

  init = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.attractionResult = result;
  };

  loadCategoryResult = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.categoryResult = result;
  };
}
