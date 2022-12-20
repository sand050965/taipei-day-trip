export default class UserAuthModel {
  constructor() {
    this.userData = [];
    this.signInResult = {};
    this.signUpResult = {};
  }

  // =================================================================

  init = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.userData = result;
  };

  // =================================================================

  signIn = async (url, email, password) => {
    const requestObject = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.signInResult = result;
  };

  // =================================================================

  signUp = async (url, name, email, password) => {
    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.signUpResult = result;
  };

  // =================================================================

  signOut = async (url, method) => {
    const requestObject = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, requestObject)
      .then((response) => response.json())
      .then((result) => {
        window.location = window.location;
      });
  };
}
