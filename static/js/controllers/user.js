import UserModel from "/static/js/models/user.js";
import UserView from "/static/js/views/user.js";

export default class UserController {
  constructor(url) {
    this.model = new UserModel();
    this.view = new UserView();
    this.url = url;
  }

  init = async () => {
    let checkSignInUrl = this.url + "api/user/auth";
    await this.model.init(checkSignInUrl);
    if (this.model.userData["data"] === null) {
      this.view.renderUserAuth("登入/註冊");
    } else {
      this.view.renderUserAuth("登出系統");
    }
  };

  doUserAuth = () => {
    if (userAuth.textContent === "登入/註冊") {
      this.view.renderSignIn();
      this.view.renderForm();
    } else {
      const signOutUrl = this.url + "api/user/auth";
      const requestObject = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      this.model.signOut(signOutUrl, requestObject);
    }
  };

  clearMessageAndInput = () => {
    if (document.querySelector("#message").style.display != "none")
      this.view.clearInput();
  };

  cloesForm = () => {
    this.view.cloesForm();
  };

  doSign = async (e) => {
    if (e.target.textContent === "登入帳戶") {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      // if (!inputCheck(null, email, password)) return;
      const signInUrl = this.url + "api/user/auth";
      const requestObject = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      };

      await this.model.signIn(signInUrl, requestObject);

      if (this.model.signInResult["ok"]) {
        window.location = window.location;
      } else {
        this.view.renderMessage("red", "登入失敗，電子郵件或密碼錯誤");
      }
    } else if (e.target.textContent === "註冊新帳戶") {
      const name = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      // if (!inputCheck(null, email, password)) return;
      const signUpUrl = this.url + "api/user";
      const requestObject = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      };

      await this.model.signUp(signUpUrl, requestObject);

      if (this.model.signUpResult["ok"]) {
        this.view.renderMessage("green", "註冊成功，請登入系統");
      } else {
        this.view.renderMessage("red", this.model.signUpResult["message"]);
      }
    }
  };

  inputCheck = (name, email, password) => {
    // let nameRegex = //;
    // let emailRegex =
    //   /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    // let passwordRegex = //;
  };

  doSignChange = (e) => {
    let popUpTitle = document.querySelector("#popUpTitle");
    let isUser = document.querySelector("#isUser");
    if (e.target.textContent === "點此登入") {
      this.view.renderSignIn();
      this.clearInput();
      e.target.textContent = "點此註冊";
    } else if (e.target.textContent === "點此註冊") {
      this.view.rendersignUp();
      this.view.clearInput();
      e.target.textContent = "點此登入";
    }
  };
}
