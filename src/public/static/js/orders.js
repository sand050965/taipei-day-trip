import OrdersController from "./controllers/ordersController.js";
import AvatarController from "./controllers/avatarController.js";

const ordersController = new OrdersController();
const avatarController = new AvatarController();

const avatarImgs = [
	document.querySelector("#sideUserAccountAvatarImg"),
	document.querySelector("#userAccountAvatarImg"),
];

window.addEventListener("load", ordersController.init);

for (const avatarImg of avatarImgs) {
	avatarImg.addEventListener("load", avatarController.resizeAvatar, false);
}
