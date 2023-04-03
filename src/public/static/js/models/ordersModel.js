export default class OrdersModel {
	
	constructor() {
		this.ordersResult = {};
	}

	init = async (url) => {
		const response = await fetch(url);
		const result = await response.json();
		this.ordersResult = result;
	};
}
