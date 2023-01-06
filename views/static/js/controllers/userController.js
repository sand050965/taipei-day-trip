import UserModel from "../models/userModel.js";
import UserView from "../views/userView.js";
import BaseController from "./baseController.js";
import BaseView from "../views/baseView.js";

import {
  nameValidate,
  emailValidate,
  passwordValidate,
} from "/static/js/utils/validatorUtil.js";

export default class UserController {
  constructor() {
    this.model = new UserModel();
    this.view = new UserView();
    this.baseController = new BaseController();
    this.baseView = new BaseView();
    this.userData;
  }

  /* Event Handler Function */
  // =================================================================
  init = async () => {
    await this.model.init();
    this.userData = this.model.userData;
    if (this.userData === null) {
      window.location = "/";
    }

    this.view.renderInit(this.userData);
  };

  // =================================================================

  saveUserInfo = () => {

  };

  /* Private Function */
  // =================================================================

  checkUserAuth = async () => {
    await this.baseController.init();
    await this.baseController.doUserAuthCheck();
    this.userData = this.baseController.userData;

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
