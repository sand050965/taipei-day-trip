export default class OrdersView {
	constructor() {
		this.currentGroupCount = 0;
	}

	renderInit = (userData) => {
		document.querySelector("#userAccountName").textContent = userData.name;
		document.querySelector("#sideUserAccountName").textContent = userData.name;
		document.querySelector("#userAccountAvatarImg").src = userData.avatarImgUrl;
		document.querySelector("#sideUserAccountAvatarImg").src =
			userData.avatarImgUrl;
	};

	renderOrders = (jsonResult) => {
		const ordersContainer = document.querySelector("#ordersContainer");
		this.currentGroupCount = jsonResult.data.length;

		if (jsonResult.data.length === 0) {
			this.renderResultNotFound(true);
			document.querySelector("#noOrdersContainer").classList.remove("none");
			return;
		}

		for (const ordersData of jsonResult.data) {
			let totlaPrice = 0;
			const orderContainer = document.createElement("div");
			const orderTitle = document.createElement("div");
			orderTitle.textContent = `訂單編號: ${ordersData.number}`;
			orderContainer.classList.add("order-container");
			orderContainer.appendChild(orderTitle);

			for (const attraction of ordersData.trip.attraction) {
				const orderContent = document.createElement("div");
				const orderImgContainer = document.createElement("div");
				const orderImg = document.createElement("img");
				const orderDetail = document.createElement("div");
				const attractionTitle = document.createElement("div");
				const attractionName = document.createElement("div");
				const attractionDate = document.createElement("div");
				const attractionTime = document.createElement("div");
				const attractionPrice = document.createElement("div");
				const attractionAddress = document.createElement("div");
				const contactTitle = document.createElement("div");
				const contactName = document.createElement("div");
				const contactEmail = document.createElement("div");
				const contactPhone = document.createElement("div");

				orderTitle.classList.add("order-title");
				orderContent.classList.add("order-content");
				orderImgContainer.classList.add("center");
				orderImg.classList.add("order-img");
				attractionTitle.classList.add("order-content-title");
				contactTitle.classList.add("order-content-title");

				orderImgContainer.appendChild(orderImg);
				orderContent.appendChild(orderImgContainer);

				attractionName.classList.add("content");
				attractionDate.classList.add("content");
				attractionTime.classList.add("content");
				attractionAddress.classList.add("content");
				attractionPrice.classList.add("content");
				contactName.classList.add("content");
				contactEmail.classList.add("content");
				contactPhone.classList.add("content");

				orderImg.src = attraction.image;
				attractionTitle.textContent = "景點資訊";
				attractionName.textContent = `台北一日遊: ${attraction.name}`;
				attractionDate.textContent = `日期: ${ordersData.trip.date}`;
				attractionTime.textContent = `時間: ${ordersData.trip.time}`;
				attractionAddress.textContent = `地點: ${attraction.address}`;
				attractionPrice.textContent = `費用: ${attraction.price}`;
				contactTitle.textContent = "聯絡資訊";
				contactName.textContent = `聯絡姓名: ${ordersData.contact.name}`;
				contactEmail.textContent = `聯絡信箱: ${ordersData.contact.email}`;
				contactPhone.textContent = `手機號碼: ${ordersData.contact.phone}`;

				totlaPrice += parseInt(attraction.price);

				orderDetail.appendChild(attractionTitle);
				orderDetail.appendChild(attractionName);
				orderDetail.appendChild(attractionDate);
				orderDetail.appendChild(attractionTime);
				orderDetail.appendChild(attractionPrice);
				orderDetail.appendChild(attractionAddress);
				orderDetail.appendChild(contactTitle);
				orderDetail.appendChild(contactName);
				orderDetail.appendChild(contactEmail);
				orderDetail.appendChild(contactPhone);

				orderContent.appendChild(orderDetail);
				orderContainer.appendChild(orderContent);
				ordersContainer.appendChild(orderContainer);
			}

			const totalPrice = document.createElement("div");
			totalPrice.textContent = `訂單總金額: ${totlaPrice}`;
			totalPrice.classList.add("total-price");
			orderContainer.appendChild(totalPrice);
		}
	};

	renderResultNotFound = (isNotFound) => {
		const noOrdersContainer = document.querySelector("#noOrdersContainer");
		if (isNotFound) {
			noOrdersContainer.classList.remove("none");
		} else {
			noOrdersContainer.classList.add("none");
		}
	};
}
