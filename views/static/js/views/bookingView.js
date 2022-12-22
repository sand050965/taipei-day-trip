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

  renderTapPay = () => {
    TPDirect.setupSDK(
      126875,
      "app_rMoZVbJvU6CKP0R90QvAPk0NJmTPxVh2ljZL73XivyCvX9z0BhHU6VSAVofe",
      "sandbox"
    );

    TPDirect.card.setup({
      fields: {
        number: {
          element: "#card-number",
          placeholder: "**** **** **** ****",
        },
        expirationDate: {
          element: "#card-expiration-date",
          placeholder: "MM / YY",
        },
        ccv: {
          element: "#card-ccv",
          placeholder: "ccv",
        },
      },
      styles: {
        input: {
          color: "gray",
        },
        "input.ccv": {
          "font-size": "16px",
        },
        "input.expiration-date": {
          "font-size": "16px",
        },
        "input.card-number": {
          "font-size": "16px",
        },
        ".valid": {
          color: "green",
        },
        ".invalid": {
          color: "red",
        },
        // Media queries
        "@media screen and (max-width: 400px)": {
          input: {
            color: "orange",
          },
        },
        // isMaskCreditCardNumber: true,
        // maskCreditCardNumberRange: {
        //   beginIndex: 6,
        //   endIndex: 11,
        // },
      },
    });
  };

  // =================================================================

  renderErrorInput = (
    nameValidateResult,
    emailValidateResult,
    phoneValidateResult
  ) => {
    let errorMessage = "";
    if (!nameValidateResult.result) {
      document.querySelector("#contactName").classList.remove("correct-input");
      document.querySelector("#contactName").classList.add("error-input");
      errorMessage += nameValidateResult.message + "\n";
    }

    if (!emailValidateResult.result) {
      document.querySelector("#contactMail").classList.remove("correct-input");
      document.querySelector("#contactMail").classList.add("error-input");
      errorMessage += emailValidateResult.message + "\n";
    }

    if (!phoneValidateResult.result) {
      document.querySelector("#contactPhone").classList.remove("correct-input");
      document.querySelector("#contactPhone").classList.add("error-input");
      errorMessage += phoneValidateResult.message + "\n";
    }

    return errorMessage;
  };

  // =================================================================

  renderErrorMessage = (errorMessage) => {
    const title = "請完整填入所有資訊";
    const buttonValue = "確認";
    const modalTitle = document.querySelector("#modalTitle");
    const signMessage = document.querySelector("#signMessage");

    modalTitle.textContent = title;
    modalTitle.classList.remove("success");
    modalTitle.classList.add("error");
    signMessage.innerText = errorMessage;
    signMessage.classList.remove("none");
    document.querySelector("#errorMessage").classList.add("none");
    document.querySelector("#usernameContainer").classList.add("none");
    document.querySelector("#emailContainer").classList.add("none");
    document.querySelector("#passwordContainer").classList.add("none");
    document.querySelector("#signChangeRemind").classList.add("none");
    document.querySelector("#signButton").value = buttonValue;
  };

  // =================================================================

  renderCorrectInput = (inputId, revalidateResult) => {
    if (!revalidateResult.result) return;

    if (inputId.substring(0, 5) === "card") {
      document.querySelector(`#${inputId}`).classList.add("card-correct-input");
      document
        .querySelector(`#${inputId}`)
        .classList.remove("card-error-input");
    } else {
      document.querySelector(`#${inputId}`).classList.add("correct-input");
      document.querySelector(`#${inputId}`).classList.remove("error-input");
    }
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
    document.querySelector("#card-number").value = "";
    document.querySelector("#card-expiration-date").value = "";
    document.querySelector("#card-ccv").value = "";
  };
}
