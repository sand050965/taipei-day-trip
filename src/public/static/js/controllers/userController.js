import UserModel from "../models/userModel.js";
import UserView from "../views/userView.js";
import BaseController from "./baseController.js";
import BaseView from "../views/baseView.js";

import {
	nameValidate,
	emailValidate,
	phoneValidate,
	birthdayValidate,
} from "/static/js/utils/validatorUtil.js";

export default class UserController {
	constructor() {
		this.model = new UserModel();
		this.view = new UserView();
		this.baseController = new BaseController();
		this.baseView = new BaseView();
		this.userData;
		this.originAvatarImgUrl = "";
	}

	init = async () => {
		await this.baseController.init();
		await this.baseController.doUserAuthCheck();
		this.userData = this.baseController.userData;

		if (this.userData === null) {
			window.location = "/";
		}

		await this.model.init();
		this.userData = this.model.userData;
		if (this.userData === null) {
			window.location = "/";
		}

		this.view.renderInit(this.userData);
		this.originAvatarImgUrl = this.userData.avatarImgUrl;
	};

	changeAvatar = async () => {
		this.view.reset();
		const avatarFileUpload = document.querySelector("#avatarFileUpload");
		const file = avatarFileUpload.files[0];
		if (!file) {
			return;
		}
		const validateResult = await this.validateAvatarImg(file);
		if (!validateResult) {
			this.avatarFileUpload.value = "";
			this.view.renderFileUploadError(validateResult, this.originAvatarImgUrl);
			return;
		}
		this.view.renderChangeAvatar(file);
	};

	uploadAvatar = async () => {
		const avatarFileUpload = document.querySelector("#avatarFileUpload");
		const file = avatarFileUpload.files[0];
		if (!file) {
			return true;
		}
		const validateResult = await this.validateAvatarImg(file);
		if (!validateResult) {
			this.avatarFileUpload.value = "";
			this.view.renderFileUploadError(validateResult);
			return;
		}
		const result = await this.model.uploadAvatar(file);
		if (result) {
			this.view.renderUploadAvatar(this.model.avatarImgUrl);
			this.baseView.renderAvatar(this.model.avatarImgUrl);
			const deleteFile = { filename: this.originAvatarImgUrl };
			if (!this.originAvatarImgUrl.includes("avatar.png")) {
				await this.model.deleteAvatar(deleteFile);
			}
			this.originAvatarImgUrl = this.model.avatarImgUrl;
			return true;
		} else {
			this.view.renderFileUploadError(false, this.originAvatarImgUrl);
			return false;
		}
	};

	saveUserInfo = async () => {
		this.view.renderPreloader(true);

		const userData = {
			name: document.querySelector("#inputName").value,
			sex: document.querySelector("#selectSex").value,
			birthday: document.querySelector("#inputBirthday").value,
			email: document.querySelector("#inputEmail").value,
			phone: document.querySelector("#inputPhone").value,
			avatarImgUrl: document.querySelector("#avatarImg").src,
		};

		const inputCheck = this.validateInputs(userData);

		if (!inputCheck) {
			this.view.renderPreloader(false);
			return;
		}

		const uploadResult = await this.uploadAvatar();

		if (!uploadResult) {
			this.view.renderPreloader(false);
			return;
		}

		const newAvatarImgUrl = this.model.avatarImgUrl;
		userData.avatarImgUrl = newAvatarImgUrl;
		const saveUserResult = await this.model.saveUserInfo(userData);
		this.view.renderSaveUserResult(saveUserResult);
		setTimeout(1, this.view.renderPreloader(false));
	};

	showSideMenu = () => {
		this.view.renderSideMenu();
	};

	resetInputs = () => {
		this.view.reset();
	};

	closeSideMenu = (e) => {
		const sidemenuArray = ["menuContainer", "menu"];
		if (sidemenuArray.includes(e.target.id)) return;
		this.view.closeSideMenu();
	};

	// checkUserAuth = async () => {
	// 	await this.baseController.init();
	// 	await this.baseController.doUserAuthCheck();
	// 	this.userData = this.baseController.userData;

	// 	if (document.querySelector("#modal").classList.contains("popup")) {
	// 		return false;
	// 	}
	// 	return true;
	// };

	// validateInputs = () => {
	// 	const name = document.querySelector("#contactName").value.trim();
	// 	const nameValidateResult = nameValidate(name);

	// 	const email = document.querySelector("#contactMail").value.trim();
	// 	const emailValidateResult = emailValidate(email);

	// 	const phone = document.querySelector("#contactPhone").value.trim();
	// 	const phoneValidateResult = phoneValidate(phone);

	// 	return this.view.renderErrorInput(
	// 		nameValidateResult,
	// 		emailValidateResult,
	// 		phoneValidateResult
	// 	);
	// };

	validateAvatarImg = (file) => {
		const fileType = file.name.split(".")[1];
		const fileTypeArray = ["jpg", "jpeg", "png"];
		const fileSize = file.size;

		if (fileSize > 1024 * 1024 * 5) {
			("File size must be less than 1 MB!");
			this.displayAvatarValidateStyle(
				false,
				"File size must be less than 1 MB!"
			);
			return false;
		}

		if (!fileTypeArray.includes(fileType)) {
			this.displayAvatarValidateStyle(
				false,
				"File is only allowed to be these file types: [jpeg, jpg, png]!"
			);
			return false;
		}

		return true;
	};

	validateInputs = (userData) => {
		let checkResult = true;
		const nameValidateResult = nameValidate(userData.name);
		this.view.renderValidateUserInput("Name", nameValidateResult, false);
		if (!nameValidateResult.result) {
			checkResult = false;
		}

		const emailValidateResult = emailValidate(userData.email);
		this.view.renderValidateUserInput("Email", emailValidateResult, false);
		if (!emailValidateResult.result) {
			checkResult = false;
		}

		if (userData.birthday !== "") {
			const birthdayValidateResult = birthdayValidate(userData.birthday);
			this.view.renderValidateUserInput(
				"Birthday",
				birthdayValidateResult,
				false
			);
			if (!birthdayValidateResult.result) {
				checkResult = false;
			}
		}

		if (userData.phone !== "") {
			const phoneValidateResult = phoneValidate(userData.phone);
			this.view.renderValidateUserInput("Phone", phoneValidateResult, false);
			if (!phoneValidateResult.result) {
				checkResult = false;
			}
		}

		return checkResult;
	};

	revalidateInput = (e) => {
		if (
			!e.target.classList.contains("success-user-input") &&
			!e.target.classList.contains("error-user-input")
		) {
			return;
		}

		switch (e.target.id) {
			case "inputName":
				const nameValidateResult = nameValidate(e.target.value);
				this.view.renderValidateUserInput("Name", nameValidateResult, true);
				break;
			case "inputBirthday":
				let birthdayValidateResult = birthdayValidate(e.target.value);
				if (e.target.value === "") {
					birthdayValidateResult = { result: true };
				}
				this.view.renderValidateUserInput(
					"Birthday",
					birthdayValidateResult,
					true
				);
				break;
			case "inputPhone":
				let phoneValidateResult = phoneValidate(e.target.value);
				if (e.target.value === "") {
					phoneValidateResult = { result: true };
				}
				this.view.renderValidateUserInput("Phone", phoneValidateResult, true);
				break;
			case "inputEmail":
				const emailValidateResult = emailValidate(e.targert.value);
				this.view.renderValidateUserInput("Email", emailValidateResult, true);
				break;
		}
	};
}
