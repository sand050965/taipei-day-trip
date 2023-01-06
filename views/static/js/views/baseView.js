export default class BaseView {
  renderUserAuth = (textValue) => {
    document.querySelector("#userAuth").textContent = textValue;
  };

  // =================================================================

  renderModal = () => {
    const modalContainer = document.querySelector("#modalContainer");
    const modal = document.querySelector("#modal");
    modalContainer.classList.add("show");
    modalContainer.classList.remove("hidden");
    modal.classList.remove("close");
    modal.classList.add("popup");
    document.body.style.overflow = "hidden";
    this.clearMessage();
  };

  // =================================================================

  renderSignIn = () => {
    this.reset();
    document.querySelector("#usernameContainer").classList.add("none");
    document.querySelector("#modalTitle").textContent = "登入會員帳號";
    document.querySelector("#signButton").value = "登入帳戶";
    document.querySelector("#isUser").textContent = "還沒有帳戶？";
    document.querySelector("#signChange").textContent = "點此註冊";
  };

  // =================================================================

  rendersignUp = () => {
    this.reset();
    document.querySelector("#usernameContainer").classList.remove("none");
    document.querySelector("#modalTitle").textContent = "註冊會員帳號";
    document.querySelector("#signButton").value = "註冊新帳戶";
    document.querySelector("#isUser").textContent = "已經有帳戶了？";
    document.querySelector("#signChange").textContent = "點此登入";
  };

  // =================================================================

  renderUserService = () => {
    const userBubble = document.querySelector("#userBubble");
    if (userBubble.classList.contains("none")) {
      userBubble.classList.remove("none");
    } else {
      userBubble.classList.add("none");
    }
  };

  // =================================================================

  renderCloseUserService = () => {
    if (!userBubble.classList.contains("none")) {
      userBubble.classList.add("none");
    }
  };

  // =================================================================

  renderSuccessMessage = (signType) => {
    let title;
    let message;
    let buttonValue;
    const modalTitle = document.querySelector("#modalTitle");
    const signMessage = document.querySelector("#signMessage");
    if (signType) {
      title = "登入成功";
      message = "歡迎回來歡迎回來！您已成功登入會員，點擊「確定」返回先前頁面";
      buttonValue = "確定";
    } else {
      title = "恭喜您，註冊成功!";
      message =
        "請點擊「繼續登入」，並輸入電子信箱及密碼進行登入，以進入會員頁面";
      buttonValue = "繼續登入...";
    }

    modalTitle.textContent = title;
    modalTitle.classList.remove("error");
    modalTitle.classList.add("success");
    signMessage.textContent = message;
    signMessage.classList.remove("none");
    this.clearMessage([]);
    document.querySelector("#usernameContainer").classList.add("none");
    document.querySelector("#emailContainer").classList.add("none");
    document.querySelector("#passwordContainer").classList.add("none");
    document.querySelector("#signChangeRemind").classList.add("none");
    document.querySelector("#signButton").value = buttonValue;
  };

  // =================================================================

  renderErrorInputMessage = (id, isSuccess, message) => {
    const inputDom = document.querySelector(`#${id}`);
    const messageDom = document.querySelector(`#${id}Message`);
    if (!isSuccess) {
      messageDom.classList.add("show-message");
      messageDom.classList.remove("none");
      messageDom.textContent = message;
      inputDom.classList.remove("correct-input");
      inputDom.classList.add("error-input");
    } else {
      messageDom.classList.remove("show-message");
      messageDom.classList.add("none");
      inputDom.classList.remove("error-input");
      inputDom.classList.add("correct-input");
    }
  };

  // =================================================================

  renderErrorMessage = (message) => {
    const signMessage = document.querySelector("#errorMessage");
    signMessage.textContent = message;
    signMessage.classList.remove("none");
  };

  renderButton = () => {
    const usernameMessage = document.querySelector("#usernameMessage");
    const emailMessage = document.querySelector("#emailMessage");
    const passwordMessage = document.querySelector("#passwordMessage");
    const button = document.querySelector("#signButton");
    if (
      usernameMessage.classList.contains("show-message") ||
      emailMessage.classList.contains("show-message") ||
      passwordMessage.classList.contains("show-message")
    ) {
      button.classList.remove("button-able");
      button.classList.add("button-disabled");
      button.disabled = true;
      return false;
    } else {
      button.classList.add("button-able");
      button.classList.remove("button-disabled");
      button.disabled = false;
      return true;
    }
  };

  // =================================================================

  togglePassword = (isShow) => {
    const showPassword = document.querySelector("#showPassword");
    const hidePassword = document.querySelector("#hidePassword");
    const password = document.querySelector("#password");
    if (isShow) {
      showPassword.classList.add("none");
      hidePassword.classList.remove("none");
      password.setAttribute("type", "text");
    } else {
      showPassword.classList.remove("none");
      hidePassword.classList.add("none");
      password.setAttribute("type", "password");
    }
  };

  // =================================================================

  clearAllInput = () => {
    document.querySelector("#username").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
  };

  // =================================================================

  clearMessage = (messageDomIds) => {
    messageDomIds?.forEach((id) => {
      const messageDom = document.querySelector(`#${id}Message`);
      messageDom.classList.remove("show-message");
      messageDom.classList.add("none");
    });
    document.querySelector("#errorMessage").classList.add("none");
  };

  // =================================================================

  close = () => {
    const modalContainer = document.querySelector("#modalContainer");
    const modal = document.querySelector("#modal");
    modalContainer.classList.remove("show");
    modalContainer.classList.add("hidden");
    modal.classList.remove("popup");
    modal.classList.add("close");
    document.body.style.overflow = "";
  };

  // =================================================================

  reset = () => {
    this.clearAllInput();
    this.clearMessage(["username", "email", "password"]);
    const modalTitle = document.querySelector("#modalTitle");
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const button = document.querySelector("#signButton");

    modalTitle.classList.remove("success");
    modalTitle.classList.remove("error");
    document.querySelector("#signMessage").classList.add("none");
    username.classList.remove("error-input");
    username.classList.add("correct-input");
    document.querySelector("#emailContainer").classList.remove("none");
    email.classList.remove("error-input");
    email.classList.add("correct-input");
    document.querySelector("#passwordContainer").classList.remove("none");
    password.classList.remove("error-input");
    password.classList.add("correct-input");
    document.querySelector("#signChangeRemind").classList.remove("none");
    button.disabled = false;
    button.classList.add("button-able");
    button.classList.remove("button-disabled");
  };
}
