import UserController from "./controllers/userController.js";
import AvatarController from "./controllers/avatarController.js";

const controller = new UserController();
const avatarController = new AvatarController();

const avatarImgs = [
	document.querySelector("#sideUserAccountAvatarImg"),
	document.querySelector("#userAccountAvatarImg"),
];
const avatarFileUpload = document.querySelector("#avatarFileUpload");
const saveButton = document.querySelector("#saveButton");

const inputs = [
	document.querySelector("#inputName"),
	document.querySelector("#selectSex"),
	document.querySelector("#inputBirthday"),
	document.querySelector("#inputPhone"),
	document.querySelector("#inputEmail"),
	document.querySelector("#avatarFileUpload"),
];

window.addEventListener("load", controller.init, false);

window.addEventListener("click", controller.closeSideMenu, false);

avatarFileUpload.addEventListener("change", controller.changeAvatar, false);

saveButton.addEventListener("click", controller.saveUserInfo, false);

for (const input of inputs) {
	input.addEventListener("change", controller.revalidateInput, false);
}

for (const avatarImg of avatarImgs) {
	avatarImg.addEventListener("load", avatarController.resizeAvatar, false);
}
