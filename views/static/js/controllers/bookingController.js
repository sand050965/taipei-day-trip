import BookingModel from "../models/bookingModel.js";
import BookingView from "../views/bookingView.js";
import UserAuthController from "./userAuthController.js";
import UserAuthView from "../views/userAuthView.js";
import AttractionController from "../controllers/attractionController.js";
import AttractionView from "../views/attractionView.js";
import {
  nameValidate,
  emailValidate,
  phoneValidate,
} from "../utils/validatorUtil.js";

export default class BookingController {
  constructor() {
    this.model = new BookingModel();
    this.view = new BookingView();
    this.userController = new UserAuthController();
    this.userView = new UserAuthView();
    this.attractionController = new AttractionController();
    this.attractoinView = new AttractionView();
    this.userData;
    this.bookingData;
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
    this.bookingData = this.model.bookingResult.data;
    this.view.renderBooking(this.model.bookingResult.data, this.userData);
    this.view.renderTapPay();
  };

  // =================================================================

  createBooking = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }

    if (!this.attractionController.validateDate()) {
      return;
    }

    await this.model.createBooking("/api/booking", this.userData);
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
    await this.model.deleteBooking("/api/booking");
    if (this.model.deleteResult.ok) {
      window.location = "/booking";
    }
  };

  // =================================================================

  doPayOrder = async (e) => {
    e.preventDefault();

    // ?????? TapPay Fields ??? status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    let errorMessage = this.validateInputs();

    // ?????????????????? getPrime
    if (tappayStatus.canGetPrime === false) {
      errorMessage += "??????????????????????????????";
    }

    if (errorMessage != "") {
      this.view.renderErrorMessage(errorMessage);
      this.userView.renderModal();
      return;
    }

    // Get prime
    await this.model.doPay(
      "/api/orders",
      this.bookingData
    );
  };

  // =================================================================

  revalidate = (e) => {
    if (!e.target.classList.contains("error-input")) {
      return;
    }
    const id = e.target.id;
    const value = document.querySelector(`#${id}`).value.trim();
    const revalidateResult = this.revalidateInput(id, value);
    this.view.renderCorrectInput(id, revalidateResult);
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

  // =================================================================

  validateInputs = () => {
    const name = document.querySelector("#contactName").value.trim();
    const nameValidateResult = nameValidate(name);

    const email = document.querySelector("#contactMail").value.trim();
    const emailValidateResult = emailValidate(email);

    const phone = document.querySelector("#contactPhone").value.trim();
    const phoneValidateResult = phoneValidate(phone);

    return this.view.renderErrorInput(
      nameValidateResult,
      emailValidateResult,
      phoneValidateResult
    );
  };

  // =================================================================

  revalidateInput = (id, value) => {
    let revalidateResult;
    switch (id) {
      case "contactName":
        revalidateResult = nameValidate(value);
        break;
      case "contactMail":
        revalidateResult = emailValidate(value);
        break;
      case "contactPhone":
        revalidateResult = phoneValidate(value);
        break;
    }
    return revalidateResult;
  };
}
