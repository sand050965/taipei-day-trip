export default class IndexView {
  renderAttractions = (jsonResult, imageHref) => {
    let attractionContainer = document.querySelector("#attraction-container");

    for (let i = 0; i < jsonResult["data"].length; i++) {
      let attractionItemLink = document.createElement("a");
      attractionItemLink.href = imageHref + "/" + jsonResult["data"][i]["id"];

      let attractionItem = document.createElement("div");
      attractionItem.className = "attraction-item";
      let attractionImageAndName = document.createElement("div");
      attractionImageAndName.className = "attraction-image-name";

      let attractionImage = document.createElement("img");
      attractionImage.setAttribute("src", jsonResult["data"][i]["images"][0]);
      attractionImageAndName.appendChild(attractionImage);

      let attractionName = document.createElement("div");
      attractionName.textContent = jsonResult["data"][i]["name"];
      attractionImageAndName.appendChild(attractionName);
      attractionItem.appendChild(attractionImageAndName);

      let attractionInfo = document.createElement("div");
      let attractionMrt = document.createElement("div");
      let attractionCategory = document.createElement("div");
      attractionMrt.textContent = jsonResult["data"][i]["mrt"];
      attractionCategory.textContent = jsonResult["data"][i]["category"];
      attractionInfo.className = "attraction-info content";
      attractionInfo.appendChild(attractionMrt);
      attractionInfo.appendChild(attractionCategory);
      attractionItem.appendChild(attractionInfo);
      attractionItemLink.appendChild(attractionItem);
      attractionContainer.appendChild(attractionItemLink);
    }
  };

  renderCategory = (jsonResult) => {
    let categoryList = document.querySelector("#category-list");
    for (let i = 0; i < jsonResult["data"].length; i++) {
      let categoryItem = document.createElement("div");
      categoryItem.textContent = jsonResult["data"][i];
      categoryList.appendChild(categoryItem);
      categoryItem.className = "category-item";
    }
  };

  showCategory = () => {
    document.querySelector("#category-list").style.display = "grid";
  };

  hideCategory = () => {
    document.querySelector("#category-list").style.display = "none";
  };

  renderSerchBar = (inputText) => {
    document.querySelector("#search-bar").value = inputText;
  };

  clearAttraction = () => {
    document.querySelector("#attraction-container").innerHTML = "";
  };
}
