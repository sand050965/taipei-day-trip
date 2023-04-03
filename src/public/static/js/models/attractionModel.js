export default class AttractionModels {

  constructor() {
    this.attractionResult = {};
  }


  init = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.attractionResult = result;
  };
}
