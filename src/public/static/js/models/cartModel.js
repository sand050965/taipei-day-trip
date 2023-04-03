export default class CartModel {
  
  constructor() {
    this.cartResult = {};
    this.deleteByIdResult = {};
    this.deletResult = {};
  }


  getAllBookings = async (url) => {
    const requestObject = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.cartResult = result;
  };


  deleteBookingById = async (url, id) => {
    const requestObject = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: id }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.deleteByIdResult = result;
  };


  deleteBookings = async (url, ids) => {
    const requestObject = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_ids: ids }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    this.deleteByIdResult = result;
  };


  doCheckout = async (url, bookingData, checkedBookingIdList) => {
    await TPDirect.card.getPrime((result) => {
      this.prime = result.card.prime;
      this.doOrder(url, bookingData, checkedBookingIdList);
    });
  };


  doOrder = async (url, bookingData, checkedBookingIdList) => {
    let tripArray = [];

    for (const data of bookingData.data) {
      if (checkedBookingIdList.includes(data.bookingId)) {
        tripArray.push({
          attraction: data.attraction,
          date: data.date,
          time: data.time,
          price: data.price,
        });
      }
    }

    const requestObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prime: this.prime,
        order: {
          totalPrice: parseInt(document.querySelector("#price").textContent),
          trip: tripArray,
          contact: {
            name: document.querySelector("#contactName").value.trim(),
            email: document.querySelector("#contactMail").value.trim(),
            phone: document.querySelector("#contactPhone").value.trim(),
          },
        },
        bookingId: checkedBookingIdList,
      }),
    };
    const response = await fetch(url, requestObject);
    const result = await response.json();
    window.location = `/thankyou?number=${result.data.number}&status=${result.data.payment.status}`;
  };
}
