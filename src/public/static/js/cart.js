import CartController from "./controllers/cartController.js";

const controller = new CartController();
const selectAll = document.querySelector("#selectAll");
const deleteSelect = document.querySelector("#deleteSelect");
const goCheckoutButton = document.querySelector("#goCheckoutButton");
const payButton = document.querySelector("#payButton");
const inputs = document.querySelectorAll("[name='info']");

window.addEventListener("load", controller.init, false);

selectAll.addEventListener("change", controller.selectAll, false);

deleteSelect.addEventListener("click", controller.deleteBookings, false);

goCheckoutButton.addEventListener("click", controller.goCheckout, false);

payButton.addEventListener("click", controller.doCheckout, false);

for (const input of inputs) {
  input.addEventListener("keyup", controller.revalidate, false);
}
