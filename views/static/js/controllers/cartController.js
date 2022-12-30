import CartModel from "../models/cartModel.js";
import CartView from "../views/cartView.js";
import UserAuthController from "./userAuthController.js";
import UserAuthView from "../views/userAuthView.js";
import {
  nameValidate,
  emailValidate,
  phoneValidate,
} from "../utils/validatorUtil.js";

export default class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();
    this.userController = new UserAuthController();
    this.userView = new UserAuthView();
    this.userData;
    this.checkedBookingIdList = [];
  }

  // =================================================================

  init = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }
    await this.model.getAllBookings("/api/bookings");
    this.view.renderInit(this.model.cartResult);

    const bookingItemsInputs = document.querySelectorAll(
      'input[name="booking_item"]'
    );

    const bookingDelete = document.querySelectorAll('[name="delete_booking"]');

    for (const input of bookingItemsInputs) {
      input.addEventListener("change", this.chageInputStatus, false);
    }

    for (const deleteItem of bookingDelete) {
      deleteItem.addEventListener("click", this.deleteBookingById, false);
    }

    this.view.renderTapPay();
  };

  // =================================================================

  chageInputStatus = () => {
    this.view.renderCountSelect();
    this.view.renderSelectPrice(this.model.cartResult);
  };

  // =================================================================

  selectAll = (e) => {
    if (e.target.checked) {
      this.view.renderSelectAll(true);
    } else {
      this.view.renderSelectAll(false);
    }
    this.view.renderSelectPrice(this.model.cartResult);
  };

  // =================================================================

  deleteBookingById = async (e) => {
    const bookingItemId = e.target.id;
    const bookingId = bookingItemId.replace("booking_", "");
    await this.model.deleteBookingById("/api/booking", bookingId);
    this.init(e);
  };

  // =================================================================

  deleteBookings = async (e) => {
    let idArrays = [];
    this.checkSelected(idArrays);
    await this.model.deleteBookings("/api/bookings", idArrays);
    this.init(e);
  };

  // =================================================================

  directToCheckOut = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }

    window.location = "/api/cartcheckout";
  };

  // =================================================================

  goCheckout = async (e) => {
    if (!(await this.checkUserAuth(e))) {
      return;
    }

    this.checkSelected(this.checkedBookingIdList);
    this.view.renderCartCheckOut(
      this.userData,
      this.model.cartResult,
      this.checkedBookingIdList
    );
  };

  // =================================================================

  doCheckout = async (e) => {
    e.preventDefault();

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    let errorMessage = this.validateInputs();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      errorMessage += "請輸入完整信用卡資訊";
    }

    if (errorMessage != "") {
      this.view.renderErrorMessage(errorMessage);
      this.userView.renderModal();
      return;
    }

    // Get prime
    await this.model.doCheckout(
      "/api/orders",
      this.model.cartResult,
      this.checkedBookingIdList
    );
  };

  /* Private Function */
  // =================================================================
  checkSelected = (idArrays) => {
    idArrays.length = 0;
    const bookingItemsInputs = document.querySelectorAll(
      'input[name="booking_item"]'
    );

    for (const input of bookingItemsInputs) {
      if (input.checked) {
        idArrays.push(parseInt(input.value));
      }
    }
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
