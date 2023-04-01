import OrdersModel from "../models/ordersModel.js";
import UserModel from "../models/userModel.js";
import OrdersView from "../views/ordersView.js";

export default class OrdersController {
	constructor() {
        this.model = new OrdersModel();
        this.view = new OrdersView();
        this.userModel = new UserModel();
    }

    init = async () => {
        await this.model.init("/api/orders");
        await this.userModel.init("/api/orders");
        this.view.renderOrders(this.model.ordersResult);
        this.view.renderInit(this.userModel.userData);
    }
}
