export default class CartView {
  renderInit = (result) => {
    this.reset();

    const noBooking = document.querySelector("#noBooking");
    const bookingConfirm = document.querySelector("#bookingConfirm");
    const footer = document.querySelector("footer");

    if (result.data.length === 0) {
      noBooking.classList.remove("none");
      noBooking.classList.add("no-booking");
      bookingConfirm.classList.add("none");
      bookingConfirm.classList.remove("booking");
      footer.classList.remove("common-footer");
      footer.classList.add("no-booking-footer");
      return;
    }
    
    noBooking.classList.add("none");
    noBooking.classList.remove("no-booking");
    bookingConfirm.classList.remove("none");
    bookingConfirm.classList.add("booking");
    footer.classList.add("common-footer");
    footer.classList.remove("no-booking-footer");

    const bookingContent = document.querySelector("#bookingContent");
    bookingContent.classList.add("booking-content");

    for (const data of result.data) {
      const bookingItem = document.createElement("div");
      bookingItem.classList.add("booking-item");
      bookingItem.setAttribute("name", "booking_item");

      const bookingCheck = document.createElement("input");
      bookingCheck.name = "booking_item";
      bookingCheck.type = "checkbox";
      bookingCheck.value = data.bookingId;
      bookingCheck.checked = true;
      bookingItem.append(bookingCheck);

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("attraction-image");

      const attractionImage = document.createElement("img");
      attractionImage.src = data.attraction.image;
      imageContainer.appendChild(attractionImage);
      bookingItem.append(imageContainer);

      const bookingInfo = document.createElement("div");
      bookingInfo.classList.add("booking-info");

      const attractionNameContainer = document.createElement("div");
      attractionNameContainer.classList.add("booking-attraction-name");
      attractionNameContainer.classList.add("left-top");
      const attractionNameTitle = document.createElement("span");
      attractionNameTitle.classList.add("title");
      attractionNameTitle.textContent = "台北一日遊：";
      attractionNameContainer.appendChild(attractionNameTitle);
      const attractionName = document.createElement("span");
      attractionName.classList.add("left-center");
      attractionName.classList.add("title");
      attractionName.textContent = data.attraction.name;
      attractionNameContainer.appendChild(attractionName);
      bookingInfo.appendChild(attractionNameContainer);

      const bookingDateContainer = document.createElement("div");
      bookingDateContainer.classList.add("booking-attraction-info");
      bookingDateContainer.classList.add("left-top");
      const bookingDateTitle = document.createElement("span");
      bookingDateTitle.classList.add("title");
      bookingDateTitle.textContent = "日期：";
      bookingDateContainer.appendChild(bookingDateTitle);
      const attractionDate = document.createElement("span");
      attractionDate.classList.add("content");
      attractionDate.textContent = data.date;
      bookingDateContainer.appendChild(attractionDate);
      bookingInfo.appendChild(bookingDateContainer);

      const bookingTimeContainer = document.createElement("div");
      bookingTimeContainer.classList.add("booking-attraction-info");
      bookingTimeContainer.classList.add("left-top");
      const bookngTimeTitle = document.createElement("span");
      bookngTimeTitle.classList.add("title");
      bookngTimeTitle.textContent = "時間：";
      bookingTimeContainer.appendChild(bookngTimeTitle);
      const bookingTime = document.createElement("span");
      bookingTime.classList.add("content");
      bookingTime.textContent =
        data.time === "morning" ? "早上9點到下午4點" : "下午2點到晚上9點";
      bookingTimeContainer.appendChild(bookingTime);
      bookingInfo.appendChild(bookingTimeContainer);

      const bookingPriceContainer = document.createElement("div");
      bookingPriceContainer.classList.add("booking-attraction-info");
      bookingPriceContainer.classList.add("left-top");
      const bookingPriceTitle = document.createElement("span");
      bookingPriceTitle.classList.add("title");
      bookingPriceTitle.textContent = "費用：";
      bookingPriceContainer.append(bookingPriceTitle);
      const bookingPrice = document.createElement("span");
      bookingPrice.classList.add("content");
      bookingPrice.textContent = data.price;
      bookingPriceContainer.appendChild(bookingPrice);
      bookingInfo.appendChild(bookingPriceContainer);

      const bookingAddressContainer = document.createElement("div");
      bookingAddressContainer.classList.add("booking-attraction-info");
      bookingAddressContainer.classList.add("left-top");
      const bookingAddressTitle = document.createElement("span");
      bookingAddressTitle.classList.add("title");
      bookingAddressTitle.textContent = "地點：";
      bookingAddressContainer.appendChild(bookingAddressTitle);
      const bookingAddress = document.createElement("span");
      bookingAddress.classList.add("content");
      bookingAddress.textContent = data.attraction.address;
      bookingAddressContainer.appendChild(bookingAddress);
      bookingInfo.appendChild(bookingAddressContainer);
      bookingItem.appendChild(bookingInfo);

      const deleteImgContainer = document.createElement("div");
      deleteImgContainer.classList.add("delete");
      deleteImgContainer.id = `booking_${data.bookingId}`;
      deleteImgContainer.setAttribute("name", "delete_booking");
      const deleteImg = document.createElement("img");
      deleteImg.classList.add("content");
      deleteImg.src = "../static/images/icon_delete.png";
      deleteImg.id = `booking_${data.bookingId}`;
      deleteImgContainer.appendChild(deleteImg);
      bookingItem.appendChild(deleteImgContainer);

      bookingContent.appendChild(bookingItem);
    }
    this.renderCountSelect();
    this.renderSelectPrice(result);
  };

  // =================================================================

  renderCartCount = (result) => {
    const cartCount = document.querySelector("#cartCount");
    if (result.error) {
      cartCount.textContent = "0";
      return;
    }

    const count = parseInt(result.data.length);
    if (count <= 99) {
      cartCount.textContent = count;
    } else {
      cartCount.textContent = "99+";
    }
  };

  // =================================================================

  renderCountSelect = () => {
    const inputs = document.querySelectorAll('input[name="booking_item"]');
    const selectAll = document.querySelector("#selectAll");
    const seperator = document.querySelector("#seperator");
    const deleteSelect = document.querySelector("#deleteSelect");
    let cnt = 0;
    for (const input of inputs) {
      if (input.checked) cnt++;
    }

    selectAll.checked = false;

    if (cnt == inputs.length) {
      selectAll.checked = true;
    }

    if (cnt === 0) {
      seperator.classList.add("none");
      deleteSelect.classList.remove("center");
      deleteSelect.classList.add("none");
    } else {
      seperator.classList.remove("none");
      deleteSelect.classList.remove("none");
      deleteSelect.classList.add("center");
    }

    document.querySelector("#totalSelect").textContent = inputs.length;
  };

  // =================================================================

  renderSelectAll = (isChecked) => {
    const inputs = document.querySelectorAll('input[name="booking_item"]');
    for (const input of inputs) {
      input.checked = isChecked;
    }
    this.renderCountSelect();
  };

  // =================================================================

  renderCancelSelectAll = () => {
    const bookingItems = document.querySelectorAll(
      'input[name="booking_item"]'
    );
    for (const item of bookingItems) {
      item.checked = false;
    }
    this.renderCountSelect();
  };

  // =================================================================

  renderSelectPrice = (result) => {
    const bookingItems = document.querySelectorAll(
      'input[name="booking_item"]'
    );

    let checkList = [];
    for (const item of bookingItems) {
      if (item.checked) {
        checkList.push(parseInt(item.value));
      }
    }

    let totalPrice = 0;
    for (const bookingData of result.data) {
      if (checkList.includes(bookingData.bookingId)) {
        totalPrice += bookingData.price;
      }
    }
    const priceBlocks = document.querySelectorAll("#price");
    for (const price of priceBlocks) {
      price.textContent = ` ${totalPrice} `;
    }
  };

  // =================================================================

  renderCartCheckOut = (userData, cartResult, checkedBookingIdList) => {
    document.querySelector("#cartBooking").classList.add("none");
    document.querySelector("#checkout").classList.remove("none");

    document.querySelector("#contactName").value = userData.name;
    document.querySelector("#userName").textContent = userData.name;
    document.querySelector("#contactMail").value = userData.email;

    for (const data of cartResult.data) {
      if (!checkedBookingIdList.includes(data.bookingId)) {
        continue;
      }
    }

    const checkoutContent = document.querySelector("#checkoutContent");
    checkoutContent.classList.add("checkout-content");

    for (const data of cartResult.data) {
      if (!checkedBookingIdList.includes(data.bookingId)) {
        continue;
      }

      const checkoutItem = document.createElement("div");
      checkoutItem.classList.add("checkout-booking-item");
      checkoutItem.setAttribute("name", "booking_item");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("attraction-image");

      const attractionImage = document.createElement("img");
      attractionImage.src = data.attraction.image;
      imageContainer.appendChild(attractionImage);
      checkoutItem.append(imageContainer);

      const checkoutBookingInfo = document.createElement("div");
      // checkoutBookingInfo.classList.add("booking-info");

      const attractionNameContainer = document.createElement("div");
      attractionNameContainer.classList.add("booking-attraction-name");
      attractionNameContainer.classList.add("left-top");
      const attractionNameTitle = document.createElement("span");
      attractionNameTitle.classList.add("title");
      attractionNameTitle.textContent = "台北一日遊：";
      attractionNameContainer.appendChild(attractionNameTitle);
      const attractionName = document.createElement("span");
      attractionName.classList.add("left-center");
      attractionName.classList.add("title");
      attractionName.textContent = data.attraction.name;
      attractionNameContainer.appendChild(attractionName);
      checkoutBookingInfo.appendChild(attractionNameContainer);

      const checkoutBookingDateContainer = document.createElement("div");
      checkoutBookingDateContainer.classList.add("booking-attraction-info");
      checkoutBookingDateContainer.classList.add("left-top");
      const checkoutBookingDateTitle = document.createElement("span");
      checkoutBookingDateTitle.classList.add("title");
      checkoutBookingDateTitle.textContent = "日期：";
      checkoutBookingDateContainer.appendChild(checkoutBookingDateTitle);
      const checkoutBookingDate = document.createElement("span");
      checkoutBookingDate.classList.add("content");
      checkoutBookingDate.textContent = data.date;
      checkoutBookingDateContainer.appendChild(checkoutBookingDate);
      checkoutBookingInfo.appendChild(checkoutBookingDateContainer);

      const checkoutBookingTimeContainer = document.createElement("div");
      checkoutBookingTimeContainer.classList.add("booking-attraction-info");
      checkoutBookingTimeContainer.classList.add("left-top");
      const checkoutBookingTimeTitle = document.createElement("span");
      checkoutBookingTimeTitle.classList.add("title");
      checkoutBookingTimeTitle.textContent = "時間：";
      checkoutBookingTimeContainer.appendChild(checkoutBookingTimeTitle);
      const checkoutBookingTime = document.createElement("span");
      checkoutBookingTime.classList.add("content");
      checkoutBookingTime.textContent =
        data.time === "morning" ? "早上9點到下午4點" : "下午2點到晚上9點";
      checkoutBookingTimeContainer.appendChild(checkoutBookingTime);
      checkoutBookingInfo.appendChild(checkoutBookingTimeContainer);

      const checkoutBookingPriceContainer = document.createElement("div");
      checkoutBookingPriceContainer.classList.add("booking-attraction-info");
      checkoutBookingPriceContainer.classList.add("left-top");
      const checkoutBookingPriceTitle = document.createElement("span");
      checkoutBookingPriceTitle.classList.add("title");
      checkoutBookingPriceTitle.textContent = "費用：";
      checkoutBookingPriceContainer.append(checkoutBookingPriceTitle);
      const checkoutBookingPrice = document.createElement("span");
      checkoutBookingPrice.classList.add("content");
      checkoutBookingPrice.textContent = data.price;
      checkoutBookingPriceContainer.appendChild(checkoutBookingPrice);
      checkoutBookingInfo.appendChild(checkoutBookingPriceContainer);

      const checkoutBookingAddressContainer = document.createElement("div");
      checkoutBookingAddressContainer.classList.add("booking-attraction-info");
      checkoutBookingAddressContainer.classList.add("left-top");
      const checkoutBookingAddressTitle = document.createElement("span");
      checkoutBookingAddressTitle.classList.add("title");
      checkoutBookingAddressTitle.textContent = "地點：";
      checkoutBookingAddressContainer.appendChild(checkoutBookingAddressTitle);
      const checkoutBookingAddress = document.createElement("span");
      checkoutBookingAddress.classList.add("content");
      checkoutBookingAddress.textContent = data.attraction.address;
      checkoutBookingAddressContainer.appendChild(checkoutBookingAddress);
      checkoutBookingInfo.appendChild(checkoutBookingAddressContainer);
      checkoutItem.appendChild(checkoutBookingInfo);

      checkoutContent.appendChild(checkoutItem);
    }

    window.scrollTo(0, 0);
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
    document.querySelector("#bookingContent").innerHTML = "";
    document.querySelector("#price").innerHTML = ` 0 `;
    this.renderCountSelect();
  };
}
