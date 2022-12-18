import BookingModel from "../models/bookingModel.js";
import BookingView from "../views/bookingView.js";
import UserAuthController from "./userAuthController.js";
import UserAuthView from "../views/userAuthView.js";
import { dateValidate } from "../utils/validatorUtil.js";

export default class BookingController {
  constructor() {
    this.model = new BookingModel();
    this.view = new BookingView();
    this.userController = new UserAuthController();
    this.userView = new UserAuthView();
    this.userData;
  }

  init = async (e) => {
    await this.userController.init();
    this.userData = this.userController.userData;
    if (document.querySelector("#userAuth").textContent !== "登出系統") {
      window.location = "/";
    }

    await this.model.init("/api/booking", null);
    this.view.renderBooking(this.model.bookingResult.data, this.userData);
  };

  createBooking = async (e) => {
    const date = document.querySelector("#date").value.trim();
    let validateResult = dateValidate(date);
    if (!validateResult.result) {
      this.userView.renderModal();
      this.view.renderErrorMessage(validateResult.message);
      return;
    }

    const attractionId = window.location.href.split("/")[4];
    const time = document
      .querySelector("#morning")
      .classList.contains("checked")
      ? "morning"
      : "afternoon";
    const price = document.querySelector("#dollar").textContent;

    await this.userController.init();
    await this.userController.doUserAuth(e);
    this.userData = this.userController.userData;
    if (document.querySelector("#modal").classList.contains("popup")) {
      return;
    }

    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attractionId: attractionId,
        date: date,
        time: time,
        price: price,
      }),
    };

    await this.model.createDeleteBooking("/api/booking", requestObject);
    if (this.model.createResult.ok) {
      window.location = "/booking";
    }
  };

  getBooking = async (e) => {
    await this.userController.init();
    await this.userController.doUserAuth(e);
    if (document.querySelector("#modal").classList.contains("popup")) {
      return;
    }
    window.location = "/booking";
  };

  deleteBooking = async () => {
    const requestObject = { method: "DELETE" };
    await this.model.createDeleteBooking("/api/booking", requestObject);
    if (this.model.deleteResult.ok) {
      window.location = "/booking";
    }
  };
}
