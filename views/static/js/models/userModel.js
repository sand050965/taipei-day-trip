export default class UserModel {
  constructor() {
    this.userData;
  }

  init = async () => {
    const response = await fetch("/api/user/info");
    const result = await response.json();
    this.userData = result;
  };
}
