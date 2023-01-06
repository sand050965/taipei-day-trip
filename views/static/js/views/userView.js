export default class userView {
  renderInit = (userData) => {
    document.querySelector("#userAccountName").textContent = userData.data.name;
    document.querySelector("#sideUserAccountName").textContent =
      userData.data.name;
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

  // =================================================================
  renderSaveUser = () => {};

  // =================================================================

  renderSideMenu = () => {
    const sideMenu = document.querySelector("#sideMenu");
    const sideUserNavbar = document.querySelector("#sideUserNavbar");
    const sideUserAccount = document.querySelector("#sideUserAccount");
    const sideNavbarItem = document.querySelector("#sideNavbarItem");
    const sideMask = document.querySelector("#sideMask");

    if (!sideMenu.classList.contains("increase-side-navbar-width")) {
      sideMenu.classList.add("increase-side-navbar-width");
      sideUserAccount.classList.remove("none");
      sideNavbarItem.classList.remove("none");
      sideMask.classList.remove("none");
    } else {
      sideMenu.classList.remove("increase-side-navbar-width");
      sideUserAccount.classList.add("none");
      sideNavbarItem.classList.add("none");
      sideMask.classList.add("none");
    }
  };

  // =================================================================

  closeSideMenu = () => {
    const sideMenu = document.querySelector("#sideMenu");
    const sideUserNavbar = document.querySelector("#sideUserNavbar");
    const sideUserAccount = document.querySelector("#sideUserAccount");
    const sideNavbarItem = document.querySelector("#sideNavbarItem");
    const sideMask = document.querySelector("#sideMask");

    if (sideMenu.classList.contains("increase-side-navbar-width")) {
      sideMenu.classList.remove("increase-side-navbar-width");
      sideUserAccount.classList.add("none");
      sideNavbarItem.classList.add("none");
      sideMask.classList.add("none");
    }
  };
}
