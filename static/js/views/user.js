export default class UserView {
  renderUserAuth = (textValue) => {
    document.querySelector("#userAuth").textContent = textValue;
  };

  renderForm = () => {
    document.querySelector("#outlayer").style.display = "block";
    document.body.style.overflow = "hidden";
    document.querySelector(".user-name").style.display = "none";
    document.querySelector("#message").display = "none";
  };

  renderSignIn = () => {
    document.querySelector("#form").className = "fade-in";
    document.querySelector(".user-name").style.display = "none";
    document.querySelector("#popUpTitle").textContent = "登入會員帳號";
    document.querySelector("#signButton").textContent = "登入帳戶";
    document.querySelector("#isUser").textContent = "還沒有帳戶？";
    document.querySelector("#signChange").textContent = "點此註冊";
  };

  rendersignUp = () => {
    document.querySelector(".user-name").style.display = "block";
    document.querySelector("#popUpTitle").textContent = "註冊會員帳號";
    document.querySelector("#signButton").textContent = "註冊新帳戶";
    document.querySelector("#isUser").textContent = "已經有帳戶了？";
    document.querySelector("#signChange").textContent = "點此登入";
  };

  renderMessage = (color, message) => {
    document.querySelector("#message").textContent = message;
    document.querySelector("#message").style.color = color;
    document.querySelector("#message").style.display = "flex";
  };

  clearInput = () => {
    document.querySelector("#username").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#message").style.display = "none";
  };

  cloesForm = () => {
    this.clearInput();
    document.querySelector("#outlayer").style.display = "none";
    document.body.style.overflow = "";
  };
}
