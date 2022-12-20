export default class BookingView {
  renderBooking = (bookingResult, userData) => {
    document.querySelector("#name").textContent = userData.name;

    if (bookingResult !== null) {
      this.reset();
      document.querySelector("#attractionImage").src =
        bookingResult.attraction.image;
      document.querySelector("#bookingAttractionName").textContent =
        bookingResult.attraction.name;
      document.querySelector("#bookingDate").textContent = bookingResult.date;
      document.querySelector("#bookingTime").textContent =
        bookingResult.time === "morning"
          ? "早上9點到下午4點"
          : "下午2點到晚上9點";
      document.querySelector(
        "#bookingPrice"
      ).textContent = `新台幣 ${bookingResult.price} 元`;
      document.querySelector("#bookingAttractionAddress").textContent =
        bookingResult.attraction.address;
      document.querySelector("#contactName").value = userData.name;
      document.querySelector("#contactMail").value = userData.email;
      document.querySelector("#price").textContent = bookingResult.price;
    } else {
      this.renderNoBooking();
    }
  };

  // =================================================================

  renderNoBooking = () => {
    const bookingContent = document.querySelector("#bookingContent");
    const footer = document.querySelector("footer");
    bookingContent.classList.remove("show-booking");
    bookingContent.classList.add("none");
    bookingContent.classList.add("no-border");
    footer.classList.remove("common-footer");
    footer.classList.add("no-booking-footer");

    document
      .querySelector("#bookingAttraction")
      .classList.remove("bottom-line");
    document.querySelector("#noBooking").classList.remove("none");
    document.querySelector("#bookingContact").classList.add("none");
    document.querySelector("#bookingCreditCard").classList.add("none");
    document.querySelector("#delete").classList.add("none");
    document.querySelector("#bookingConfirm").classList.add("none");
  };

  // =================================================================

  reset = () => {
    const bookingContent = document.querySelector("#bookingContent");
    const footer = document.querySelector("footer");
    bookingContent.classList.add("show-booking");
    bookingContent.classList.remove("none");
    bookingContent.classList.remove("no-border");
    footer.classList.add("common-footer");
    footer.classList.remove("no-booking-footer");

    this.clearAllInputs();

    document.querySelector("#bookingAttraction").classList.add("bottom-line");
    document.querySelector("#noBooking").classList.add("none");
    document.querySelector("#bookingContact").classList.remove("none");
    document.querySelector("#bookingCreditCard").classList.remove("none");
    document.querySelector("#delete").classList.remove("none");
    document.querySelector("#bookingConfirm").classList.remove("none");
  };

  // =================================================================

  clearAllInputs = () => {
    document.querySelector("#contactName").value = "";
    document.querySelector("#contactMail").value = "";
    document.querySelector("#contactPhone").value = "";
    document.querySelector("#cardNumber").value = "";
    document.querySelector("#invalidDate").value = "";
    document.querySelector("#CVV").value = "";
  };
}
