export default class BookingModel {
  constructor() {
    this.bookingResult = {};
    this.createResult = {};
    this.deleteResult = {};
    this.paymentResult = {};
  }

  // =================================================================

  init = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    this.bookingResult = result;
  };

  // =================================================================

  createBooking = async (url, userData) => {
    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userData.id,
        attractionId: parseInt(window.location.href.split("/")[4]),
        date: document.querySelector("#date").value.trim(),
        time: document.querySelector("#morning").classList.contains("checked")
          ? "morning"
          : "afternoon",
        price: parseInt(document.querySelector("#dollar").textContent),
      }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.createResult = result;
  };

  // =================================================================

  deleteBooking = async (url) => {
    const requestObject = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.deleteResult = result;
  };

  // =================================================================

  doPay = async (url, bookingData) => {
    await TPDirect.card.getPrime((result) => {
      this.prime = result.card.prime;
      this.doOrder(url, bookingData);
    });
  };
  
  // =================================================================
  
  doOrder = async (url, bookingData) => {
    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prime: this.prime,
        order: {
          price: parseInt(bookingData.price),
          trip: {
            attraction: bookingData.attraction,
            date: bookingData.date,
            time: bookingData.time,
          },
          contact: {
            name: document.querySelector("#contactName").value.trim(),
            email: document.querySelector("#contactMail").value.trim(),
            phone: document.querySelector("#contactPhone").value.trim(),
          },
        },
      }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    window.location = `/thankyou?number=${result.data.number}&status=${result.data.payment.status}`;
  };
}
