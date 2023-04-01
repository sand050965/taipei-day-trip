import OrdersController from "./controllers/ordersController.js";

const ordersController = new OrdersController();

window.addEventListener("load", ordersController.init);
