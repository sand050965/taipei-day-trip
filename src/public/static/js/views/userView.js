export default class userView {
	renderInit = (userData) => {
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 < 10
				? `0${date.getMonth() + 1}`
				: date.getMonth() + 1;
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		document.querySelector("#userAccountName").textContent = userData.name;
		document.querySelector("#sideUserAccountName").textContent = userData.name;
		document.querySelector("#inputName").value = userData.name;
		document.querySelector("#inputBirthday").value = userData.birthday;
		document
			.querySelector("#inputBirthday")
			.setAttribute("max", `${year}-${month}-${day}`);
		document.querySelector("#inputPhone").value = userData.phone;
		document.querySelector("#inputEmail").value = userData.email;
		document.querySelector("#userAccountAvatarImg").src = userData.avatarImgUrl;
		document.querySelector("#sideUserAccountAvatarImg").src =
			userData.avatarImgUrl;

		switch (userData.sex) {
			case "0":
				document.querySelector("#noSelect").selected = true;
				break;
			case "1":
				document.querySelector("#male").selected = true;
				break;
			case "2":
				document.querySelector("#female").selected = true;
				break;
		}
	};


	renderPreloader = (isRendered) => {
		const preloader = document.querySelector("#preloader");
		if (isRendered) {
			preloader.classList.remove("none");
		} else {
			preloader.classList.add("none");
		}
	};


	renderFileUploadError = (isShow, originAvatarURL) => {
		document.querySelector("#userAccountAvatarImg").src = originAvatarURL;
		const fileError = document.querySelector("#fileError");
		if (isShow) {
			fileError.classList.remove("none");
		} else {
			fileError.classList.add("none");
		}
	};


	renderChangeAvatar = (file) => {
		document.querySelector("#userAccountAvatarImg").src =
			URL.createObjectURL(file);
		document.querySelector("#sideUserAccountAvatarImg").src =
			URL.createObjectURL(file);
	};


	renderUploadAvatar = (avatarImgUrl) => {
		document.querySelector("#userAccountAvatarImg").src = avatarImgUrl;
		document.querySelector("#sideUserAccountAvatarImg").src = avatarImgUrl;
	};


	renderValidateUserInput = (id, checkResult, isReValidate) => {
		if (checkResult.result && isReValidate) {
			document.querySelector(`#failed${id}`).classList.add("none");
			document
				.querySelector(`#input${id}`)
				.classList.remove("error-user-input");
		} else if (!checkResult.result) {
			document.querySelector(`#failed${id}`).classList.remove("none");
			document.querySelector(`#input${id}`).classList.add("error-user-input");
		}
	};


	renderSaveUserResult = (result) => {
		if (result.ok) {
			document.querySelector("#success").classList.remove("none");
			document.querySelector("#error").classList.add("none");
		} else {
			document.querySelector("#error").classList.remove("none");
			document.querySelector("#success").classList.add("none");
		}
	};
	

	closeSideMenu = () => {
		const sideMenu = document.querySelector("#sideMenu");
		const sideUserNavbar = document.querySelector("#sideUserNavbar");
		const sideUserAccount = document.querySelector("#sideUserAccount");
		const sideNavbarItem = document.querySelector("#sideNavbarItem");
		const sideMask = document.querySelector("#sideMask");

		if (sideMenu.classList.contains("increase-side-navbar-width")) {
			sideMenu.classList.remove("increase-side-navbar-width");
			sideUserAccount.classList.add("none");
			sideNavbarItem.classList.add("none");
			sideMask.classList.add("none");
		}
	};


	reset = () => {
		document.querySelector("#fileError").classList.add("none");

		document.querySelector("#inputName").classList.remove("error-user-input");
		document.querySelector("#failedName").classList.add("none");
		document
			.querySelector("#inputBirthday")
			.classList.remove("error-user-input");
		document.querySelector("#failedBirthday").classList.add("none");
		document.querySelector("#inputPhone").classList.remove("error-user-input");
		document.querySelector("#failedPhone").classList.add("none");
		document.querySelector("#inputEmail").classList.remove("error-user-input");
		document.querySelector("#failedEmail").classList.add("none");
		document.querySelector("#success").classList.add("none");
		document.querySelector("#error").classList.add("none");
	};
}
