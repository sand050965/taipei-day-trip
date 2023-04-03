const nameValidate = (username) => {
	let result = true;
	let message;
	if (username === "") {
		result = false;
		message = "請輸入您的姓名";
	} else {
		result = true;
		message = "";
	}
	return { result: result, message: message };
};

const emailValidate = (email) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let result = true;
	let message;
	if (email === "") {
		result = false;
		message = "請輸入您的電子信箱地址";
	} else if (!regex.test(email)) {
		result = false;
		message = "請輸入有效電子信箱地址";
	} else {
		result = true;
		message = "";
	}
	return { result: result, message: message };
};

const passwordValidate = (password) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
	let result = true;
	let message;
	if (password === "") {
		result = false;
		message = "請輸入您的密碼";
	} else if (!regex.test(password)) {
		result = false;
		message =
			"密碼需為6 - 15個字元，至少包含1個數字、1個大寫字母、1個小寫字母及1個特殊符號";
	} else {
		result = true;
		message = "";
	}
	return { result: result, message: message };
};

const phoneValidate = (phone) => {
	const regex = /^09\d{8}$/;
	let result = true;
	let message;
	if (phone === "") {
		result = false;
		message = "請輸入您的手機號碼";
	} else if (!regex.test(phone)) {
		result = false;
		message = "請輸入有效手機號碼";
	} else {
		result = true;
		message = "";
	}
	return { result: result, message: message };
};

const dateValidate = (date) => {
	const regex = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	let result = true;
	let message;
	if (date === "") {
		result = false;
		message = "請輸入日期";
	} else if (!regex.test(date)) {
		result = false;
		message = "請輸入正確日期格式，應為YYYY/MM/DD";
	}
	return { result: result, message: message };
};

const bookingDateValidate = (bookingDate) => {
  let result = true;
	let message;
	const currentDate = new Date().toISOString().slice(0, 10);
	if (bookingDate < currentDate) {
		result = false;
		message = "預定行程已過期，預定日期不可早於當天日期";
  }
  
	return { result: result, message: message };
};

const bookingTimeValidate = (bookingDate, bookingTime) => {
  let result = true;
	let message;
	const currentDate = new Date().toISOString().slice(0, 10);
	const currentHour = new Date().getHours();
	if (bookingDate === currentDate) {
		if ("morning" === bookingTime && currentHour >= 16) {
			result = false;
			message = "預定行程已過期，現在時間不可晚於上半天行程結束時間";
		} else if ("afternoon" === bookingTime && currentHour >= 21) {
			result = false;
			message = "預定行程已過期，預定時間不可晚於下半天行程結束時間";
		}
	}
	return { result: result, message: message };
};

const birthdayValidate = (date) => {
	const today = new Date();
	const birthday = new Date(date);
	const regex = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	let result = true;
	let message;
	if (date === "") {
		result = false;
		message = "請輸入日期";
	} else if (!regex.test(date)) {
		result = false;
		message = "請輸入正確日期格式，應為YYYY/MM/DD";
	} else if (today < birthday) {
		result = false;
		message = "請輸入正確日期，出生日期不可晚於當天日期";
	}

	return { result: result, message: message };
};

export {
	nameValidate,
	emailValidate,
	passwordValidate,
	phoneValidate,
	dateValidate,
	bookingDateValidate,
	bookingTimeValidate,
	birthdayValidate,
};
