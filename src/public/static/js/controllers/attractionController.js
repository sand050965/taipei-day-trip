import AttractionModel from "../models/attractionModel.js";
import AttractionView from "../views/attractionView.js";
import BaseView from "../views/baseView.js";
import {
	dateValidate,
	bookingDateValidate,
	bookingTimeValidate,
} from "../utils/validatorUtil.js";

export default class AttractionController {
	constructor() {
		this.model = new AttractionModel();
		this.view = new AttractionView();
		this.baseView = new BaseView();
		this.currentImage = 0;
		this.maxImage = 0;
		this.imagesSrcArray = [];
		this.clientWidth;
	}

	init = async () => {
		const url = window.location.href;
		const attractionId = url.split("/")[4];
		this.view.renderLoading();
		await this.model.init(`/api/attraction/${attractionId}`);
		this.view.renderAttraction(this.model.attractionResult);
		this.imagesSrcArray = this.model.attractionResult.data.images;
		this.maxImage = this.imagesSrcArray.length - 1;
		this.view.renderImage(this.imagesSrcArray);
		this.view.renderPaginationDotChange(this.currentImage);
		this.preloadImage();
	};

	checkedTime = (e) => {
		switch (e.target.id) {
			case "morning":
				this.view.renderTimeAndDollar("checked", "unchecked", "2000");
				break;
			case "afternoon":
				this.view.renderTimeAndDollar("unchecked", "checked", "2500");
				break;
		}
	};

	changeImage = (e) => {
		this.currentImage = this.countImageNumber(
			e.target.id,
			this.currentImage,
			this.maxImage
		);
		this.view.imageScroll(this.currentImage);
		this.view.renderPaginationDotChange(this.currentImage);
	};

	resizeCaresoul = (e) => {
		const clientWidth = document.documentElement.clientWidth;
		const sliders = document.querySelector(".sliders");
		sliders.scrollLeft = this.clientWidth - clientWidth;
		this.clientWidth = clientWidth;
	};

	resetInput = () => {
		this.view.resetInput();
	};

	preloadImage = async () => {
		const promiseArray = [];
		const attractionImagesArray = document.querySelectorAll(
			'[name="attraction_image"]'
		);

		for (const image of attractionImagesArray) {
			promiseArray.push(
				new Promise((resolve) => {
					image.onload = () => {
						resolve();
					};
				})
			);
		}

		await Promise.all(promiseArray).then(() => {
			setTimeout(() => {
				this.view.showContent();
			}, 0);
		});
	};

	validateDate = () => {
		const date = document.querySelector("#date").value.trim();
		const validateResult = dateValidate(date);
		const bookingDateValidateResult = bookingDateValidate(date);

		if (!validateResult.result) {
			this.baseView.renderModal();
			this.view.renderErrorMessage(validateResult.message);
			this.view.renderErrorDate(true);
			return false;
		} else if (!bookingDateValidateResult.result) {
			this.baseView.renderModal();
			this.view.renderErrorMessage(validateResult.message);
			this.view.renderErrorDate(true);
			return false;
		}

		return true;
	};

	validateTime = () => {
		const date = document.querySelector("#date").value.trim();
		const time = document
			.querySelector("#morning")
			.classList.contains("checked")
			? "morning"
			: "afternoon";
		const bookingTimeValidateResult = bookingTimeValidate(date, time);

		if (!bookingTimeValidateResult.result) {
			this.baseView.renderModal();
			this.view.renderErrorMessage(bookingTimeValidateResult.message);
			return false;
		}

		return true;
	};

	reValidateDate = (e) => {
		const validateResult = dateValidate(e.target.value.trim());
		const bookingDateValidateResult = dateValidate(date);
		if (validateResult.result) {
			this.view.renderErrorDate(false);
		} else if (bookingDateValidateResult.result) {
			this.view.renderErrorDate(false);
		}
	};

	countImageNumber = (id, count, max) => {
		const imageNumber = parseInt(id.replace("image", ""));
		switch (id) {
			case "leftArrow":
				if (count === 0) {
					count = max;
				} else {
					count--;
				}
				break;

			case "rightArrow":
				if (count === max) {
					count = 0;
				} else {
					count++;
				}
				break;

			default:
				count = imageNumber;
				break;
		}
		return count;
	};
}
