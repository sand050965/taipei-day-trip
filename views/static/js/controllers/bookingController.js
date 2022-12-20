import BookingModel from "../models/bookingModel.js";
import BookingView from "../views/bookingView.js";
import UserAuthController from "./userAuthController.js";
import UserAuthView from "../views/userAuthView.js";
import AttractionController from "../controllers/attractionController.js";
import AttractionView from "../views/attractionView.js";

export default class BookingController {
  constructor() {
    this.model = new BookingModel();
    this.view = new BookingView();
    this.userController = new UserAuthController();
    this.userView = new UserAuthView();
    this.attractionController = new AttractionController();
    this.attractoinView = new AttractionView();
    this.userData;
  }

  /* Event Handler Function */
  // =================================================================

  init = async (e) => {
    await this.userController.init();
    this.userData = this.userController.userData;
    if (this.userData === null) {
      window.location = "/";
    }

    await this.model.init("/api/booking");
    this.view.renderBooking(this.model.bookingResult.data, this.userData);
  };

  // =================================================================

  createBooking = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }

    if (!this.attractionController.validateDate()) {
      return;
    }

    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: this.userData.id,
        attractionId: window.location.href.split("/")[4],
        date: document.querySelector("#date").value.trim(),
        time: document.querySelector("#morning").classList.contains("checked")
          ? "morning"
          : "afternoon",
        price: document.querySelector("#dollar").textContent,
      }),
    };

    await this.model.createDeleteBooking("/api/booking", requestObject);
    if (this.model.createResult.ok) {
      window.location = "/booking";
    }
  };

  // =================================================================

  getBooking = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }
    window.location = "/booking";
  };

  // =================================================================

  deleteBooking = async () => {
    const requestObject = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: this.userData.id }),
    };
    await this.model.createDeleteBooking("/api/booking", requestObject);
    if (this.model.deleteResult.ok) {
      window.location = "/booking";
    }
  };

  /* Private Function */
  // =================================================================

  checkUserAuth = async (e) => {
    await this.userController.init();
    await this.userController.doUserAuth(e);
    this.userData = this.userController.userData;

    if (document.querySelector("#modal").classList.contains("popup")) {
      return false;
    }
    return true;
  };
}
