import ThankyouView from "../views/thankyouView.js";

export default class OrderCntroller {
  constructor() {
    this.view = new ThankyouView();
  }

  /* Event Handler Function */
  // =================================================================
  init = () => {
    this.view.renderInit();
  };
}
