const nameValidate = (username) => {
  let result;
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
  let result;
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
  let result;
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

export { nameValidate, emailValidate, passwordValidate };
