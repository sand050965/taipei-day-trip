export default class UserModel {
	constructor() {
		this.userData = {};
		this.avatarImgUrl = "";
	}

	init = async () => {
		const response = await fetch("/api/user/info");
		const result = await response.json();
		this.userData = result.data;
		this.avatarImgUrl = result.data.avatarImgUrl;
	};

	deleteAvatar = async (deleteFile) => {
		
		const payload = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(deleteFile),
		};
		const response = await fetch("/api/s3", payload);
		await response.json();
	};

	uploadAvatar = async (file) => {
		const formData = new FormData();
		formData.append("avatar", file);
		const payload = {
			method: "POST",
			body: formData,
		};
		const response = await fetch("/api/s3", payload);
		const result = await response.json();
		this.avatarImgUrl = result.data.avatarImgUrl;
		if (result.error) {
			return false;
		} else {
			return true;
		}
	};

	saveUserInfo = async (userData) => {
		const payload = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		};
		const response = await fetch("/api/user/info", payload);
		const result = await response.json();
		return result;
	};
}
