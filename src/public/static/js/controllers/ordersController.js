import OrdersModel from "../models/ordersModel.js";
import UserModel from "../models/userModel.js";
import BaseController from "./baseController.js";
import OrdersView from "../views/ordersView.js";

export default class OrdersController {
	constructor() {
        this.model = new OrdersModel();
        this.view = new OrdersView();
        this.baseController = new BaseController();
        this.userModel = new UserModel();
        this.userData = {};
    }

    init = async () => {
        await this.baseController.init();
        await this.baseController.doUserAuthCheck();
        this.userData = this.baseController.userData;

        if (this.userData === null) {
            window.location = "/";
        }

        await this.model.init("/api/orders");
        await this.userModel.init("/api/orders");
        this.view.renderOrders(this.model.ordersResult);
        this.view.renderInit(this.userModel.userData);
    }
}
