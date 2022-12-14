import UserAuthModel from "/static/js/models/userAuth.js";
import UserAuthView from "/static/js/views/userAuth.js";
import {
  nameValidate,
  emailValidate,
  passwordValidate,
} from "/static/js/utils/validator.js";

export default class UserAuthController {
  constructor(url) {
    this.model = new UserAuthModel();
    this.view = new UserAuthView();
  }

  init = async () => {
    await this.model.init("/api/user/auth");
    if (this.model.userData.data === null) {
      this.view.renderUserAuth("登入/註冊");
    } else {
      this.view.renderUserAuth("登出系統");
    }
  };

  doUserAuth = () => {
    if (userAuth.textContent === "登入/註冊") {
      this.view.renderModal();
      this.view.renderSignIn();
    } else {
      const requestObject = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      this.model.signOut("/api/user/auth", requestObject);
    }
  };

  closeModal = () => {
    this.view.close();
    if (document.querySelector("#modalTitle").textContent === "登入成功") {
      window.location = window.location;
    }
  };

  doValidate = (e) => {
    this.validator(e.target.id, e.target.value.trim());
    this.buttonControll();
  };

  reValidate = (e) => {
    if (
      document
        .querySelector(`#${e.target.id}Message`)
        .classList.contains("show-message")
    ) {
      this.validator(e.target.id, e.target.value.trim());
    }
    this.buttonControll();
  };

  validator = (id, value) => {
    let validateResult;
    switch (id) {
      case "username":
        validateResult = nameValidate(value);
        break;
      case "email":
        validateResult = emailValidate(value);
        break;
      case "password":
        validateResult = passwordValidate(value);
        break;
    }
    this.view.renderErrorInputMessage(
      id,
      validateResult.result,
      validateResult.message
    );
  };

  buttonControll = () => {
    let buttonFlag = false;
    const usernameMessage = document.querySelector("#usernameMessage");
    const emailMessage = document.querySelector("#emailMessage");
    const passwordMessage = document.querySelector("#passwordMessage");
    if (
      usernameMessage.classList.contains("show-message") ||
      emailMessage.classList.contains("show-message") ||
      passwordMessage.classList.contains("show-message")
    ) {
      buttonFlag = true;
    }
    this.view.renderButton(buttonFlag);
    return buttonFlag;
  };

  togglePassword = (e) => {
    let isShow = false;
    e.target.id === "showPassword" ? (isShow = true) : (isShow = false);
    this.view.togglePassword(isShow);
  };

  doSign = async (e) => {
    const name = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (e.target.value === "登入帳戶") {
      this.validator("email", email);
      this.validator("password", password);
      if (this.buttonControll()) return;

      const requestObject = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      };

      await this.model.signIn("/api/user/auth", requestObject);

      if (this.model.signInResult["ok"]) {
        this.view.renderSuccessMessage(true);
      } else {
        this.view.renderErrorMessage("登入失敗，電子郵件或密碼錯誤");
      }
    } else if (e.target.value === "註冊新帳戶") {
      this.validator("username", name);
      this.validator("email", email);
      this.validator("password", password);
      if (this.buttonControll()) return;

      const requestObject = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      };

      await this.model.signUp("/api/user", requestObject);

      if (this.model.signUpResult["ok"]) {
        this.view.renderSuccessMessage(false);
      } else {
        this.view.renderErrorMessage(this.model.signUpResult["message"]);
      }
    } else if (e.target.value === "確定") {
      window.location = window.location;
    } else if (e.target.value === "繼續登入...") {
      this.view.renderModal();
      this.view.renderSignIn();
    }
  };

  doSignChange = (e) => {
    if (e.target.textContent === "點此登入") {
      this.view.renderSignIn();
      e.target.textContent = "點此註冊";
    } else if (e.target.textContent === "點此註冊") {
      this.view.rendersignUp();
      e.target.textContent = "點此登入";
    }
    this.view.renderButton(false);
  };
}
