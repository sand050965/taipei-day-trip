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

// =================================================================

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

// =================================================================

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

// =================================================================

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

// =================================================================

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

// =================================================================

// const cardNumberValidate = (cardNumber) => {
//   const regex = /^\d{16}$/;
//   let result = true;
//   let message;
//   if (cardNumber === "") {
//     result = false;
//     message = "請輸入信用卡卡號";
//   } else if (!regex.test(cardNumber)) {
//     result = false;
//     message = "請輸入有效信用卡卡號";
//   }
//   return { result: result, message: message };
// };

// // =================================================================

// const expirationDateValidate = (expirationDate) => {
//   const regex = /^((0[1-9])|(1[0-2]))\/(\d{2})$/;
//   let result = true;
//   let message;
//   if (expirationDate === "") {
//     result = false;
//     message = "請輸入信用卡過期日期";
//   } else if (!regex.test(expirationDate)) {
//     result = false;
//     message = "請輸入有效信用卡過期日期";
//   }
//   return { result: result, message: message };
// };

// // =================================================================

// const ccvValidate = (ccv) => {
//   const regex = /^(\d{3,4})$/;
//   let result = true;
//   let message;
//   if (ccv === "") {
//     result = false;
//     message = "請輸入信用卡驗證碼";
//   } else if (!regex.test(ccv)) {
//     result = false;
//     message = "請輸入有效信用卡驗證密碼";
//   }
//   return { result: result, message: message };
// };

export {
  nameValidate,
  emailValidate,
  passwordValidate,
  phoneValidate,
  dateValidate,
};
