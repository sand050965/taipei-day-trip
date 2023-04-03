import ThankyouView from "../views/thankyouView.js";

export default class OrderCntroller {
  
  constructor() {
    this.view = new ThankyouView();
  }

  init = () => {
    this.view.renderInit();
  };
}
