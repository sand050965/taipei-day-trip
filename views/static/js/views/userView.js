export default class userView {
  renderInit = (userData) => {
    document.querySelector("#userAccountName").textContent = userData.data.name;
    document.querySelector("#sideUserAccountName").textContent = userData.data.name;
    document.querySelector("#inputName").value = userData.data.name;
    document.querySelector("#inputBirthday").value = userData.data.birthday;
    document.querySelector("#inputPhone").value = userData.data.phone;
    document.querySelector("#inputEmail").value = userData.data.email;
    
    switch (userData.data.sex) {
      case "0":
        document.querySelector("#female").selected = true;
        break;
      case "1":
        document.querySelector("#male").selected = true;
        break;
      default:
        document.querySelector("#noSelect").selected = true;
        break;
    }
  };
}
