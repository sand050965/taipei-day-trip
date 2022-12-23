export default class ThankyouView {
  renderInit = () => {
    const params = new URL(window.location.href).searchParams;
    const orderId = params.get("number");
    const payStatus = params.get("status");
    document.querySelector("#ordeId").textContent = orderId;

    if (payStatus === "0") {
      document.querySelector("#successImage").classList.remove("none");
      document.querySelector("#orderTitle").textContent =
        "謝謝您！您的行程已預定成功";
      document.querySelector("#remider").textContent =
        "我們將盡快處理您的行程，我們的客服人員將盡快與您聯繫，敬請耐心等候，謝謝！";
    } else {
      document.querySelector("#failedImage").classList.remove("none");
      document.querySelector("#orderTitle").textContent =
        "很抱歉！行程預定失敗";
      document.querySelector("#remider").textContent =
        "請再次嘗試預定，對於本次預定有任何疑問，可聯繫客服人員，造成您的不便，非常抱歉！";
    }
  };
}
