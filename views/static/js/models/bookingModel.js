export default class BookingModel {
  constructor() {
    this.bookingResult = {};
    this.createResult = {};
    this.deleteResult = {};
  }

  init = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.bookingResult = result;
  };

  createDeleteBooking = async (url, requestObject) => {
    const response = await fetch(url, requestObject);
    const result = await response.json();
    switch (requestObject.method) {
      case "POST":
        this.createResult = result;
        break;
      case "DELETE":
        this.deleteResult = result;
        break;
    }
  };
}
