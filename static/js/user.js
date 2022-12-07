export const checkSignin = (url, dom) => {
  let checkSignInUrl = url + "api/user/auth";
  fetch(checkSignInUrl)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result["data"] === null) {
        dom.textContent = "登入/註冊";
      } else {
        dom.textContent = "登出系統";
      }
    });
};

export const signIn = (message, url, email, password) => {
  const signInUrl = url + "api/user/auth";
  const requestObject = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };

  fetch(signInUrl, requestObject)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result["ok"]) {
        window.location = window.location;
      } else {
        message.textContent = "登入失敗，電子郵件或密碼錯誤";
        message.style.color = "red";
        message.style.display = "flex";
      }
    });
};

export const signUp = (message, url, name, email, password) => {
  const signUpUrl = url + "api/user";
  const requestObject = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };

  fetch(signUpUrl, requestObject)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result["ok"]) {
        message.textContent = "註冊成功，請登入系統";
        message.style.color = "green";
        message.style.display = "flex";
      } else {
        message.textContent = result["message"];
        message.style.color = "red";
        message.style.display = "flex";
      }
    });
};

export const signOut = (url) => {
  const signOutUrl = url + "api/user/auth";
  const requestObject = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  fetch(signOutUrl, requestObject)
    .then((response) => response.json())
    .then((result) => {
      window.location = window.location;
    });
};
