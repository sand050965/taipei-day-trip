import BookingModel from "../models/bookingModel.js";
import BookingView from "../views/bookingView.js";
import BaseController from "./baseController.js";
import BaseView from "../views/baseView.js";
import AttractionController from "./attractionController.js";
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
    this.baseController = new BaseController();
    this.baseView = new BaseView();
    this.attractionController = new AttractionController();
    this.attractoinView = new AttractionView();
    this.userData;
    this.bookingData;
  }

  init = async () => {
    await this.baseController.init();
    this.userData = this.baseController.userData;
    if (this.userData === null) {
      window.location = "/";
    }

    const bookingId = window.location.href.split("/")[4];

    await this.model.init(`/api/booking/${bookingId}`);
    this.bookingData = this.model.bookingResult.data;
    this.view.renderBooking(this.model.bookingResult.data, this.userData);
    this.view.renderTapPay();
  };


  createBooking = async () => {
    if (!(await this.checkUserAuth())) {
      return;
    }

    if (!this.attractionController.validateDate()) {
      return;
    }

    if (!this.attractionController.validateTime()) {
			return;
		}

    await this.model.createBooking("/api/booking", this.userData);
    if (this.model.createResult.ok) {
      window.location = `/booking/${this.model.createResult.book_id}`;
    } else {
      this.view.renderErrorMessage(this.model.createResult.message);
    }
  };


  addToCart = async (e) => {
    if (!(await this.checkUserAuth())) {
      return;
    }

    if (!this.attractionController.validateDate()) {
      return;
    }

    if (!this.attractionController.validateTime()) {
			return;
		}

    this.attractoinView.addedCartDone(true);

    await this.model.createBooking("/api/booking", this.userData);
    this.view.renderErrorMessage(this.model.createResult.message);
    this.baseController.getCartCount();
    setTimeout(() => {
      this.attractoinView.addedCartDone(false);
    }, 1000);
  };


  deleteBookingById = async () => {
    await this.model.deleteBookingById("/api/booking");
    if (this.model.deleteResult.ok) {
      history.back();
    }
  };


  doPayOrder = async (e) => {
    this.view.renderPreloader(true);
    e.preventDefault();

    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    let errorMessage = this.validateInputs();

    if (tappayStatus.canGetPrime === false) {
      errorMessage += "請輸入完整信用卡資訊";
    }

    if (errorMessage != "") {
      this.view.renderErrorMessage(errorMessage);
      this.baseView.renderModal();
      this.view.renderPreloader(false);
      return;
    }

    await this.model.doPay("/api/orders", this.bookingData);
  };


  revalidate = (e) => {
    if (!e.target.classList.contains("error-input")) {
      return;
    }
    const id = e.target.id;
    const value = document.querySelector(`#${id}`).value.trim();
    const revalidateResult = this.revalidateInput(id, value);
    this.view.renderCorrectInput(id, revalidateResult);
  };

  checkUserAuth = async () => {
    await this.baseController.init();
    await this.baseController.doUserAuthCheck();
    this.userData = this.baseController.userData;

    if (document.querySelector("#modal").classList.contains("popup")) {
      return false;
    }
    return true;
  };


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
