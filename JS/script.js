// for whole document
document.addEventListener('DOMContentLoaded', () => {
  // screen size to set the width according to current size of the screen
  const mainContainer = document.querySelector('.main-container');

  function updateScreenSize() {
    let widthContainer = window.innerWidth;
    mainContainer.style.maxWidth = `${widthContainer}px`;
  }
  window.addEventListener('resize', updateScreenSize);
  updateScreenSize();
});

// dashboard
document.addEventListener('DOMContentLoaded', () => {
  //for drop down
  const button = document.querySelector(".user-icon");
  const dropdown = document.querySelector(".drop-down");
  const arrow = document.querySelector(".fa-chevron-down");
  let currentTransformStyle = "transform: rotate(180deg);";
  const transformRotate1 = "rotate(0)";
  const transformRotate2 = "rotate(-180deg)";

  button.addEventListener("click", function () {
    dropdown.classList.toggle("dropdown-transition");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";

    if (currentTransformStyle === transformRotate2) {
      arrow.style.transform = transformRotate1;
      currentTransformStyle = transformRotate1;
    } else {
      arrow.style.transform = transformRotate2;
      currentTransformStyle = transformRotate2;
    }
  });

  document.addEventListener("click", function (event) {
    // Check if the click is not on the button or dropdown
    if (!event.target.closest(".user-icon,.drop-down")) {
      // If dropdown is visible, hide it
      if (dropdown.style.display === "flex") {
        dropdown.style.display = "none";
        arrow.style.transform = transformRotate1;
        currentTransformStyle = transformRotate1;
      }
    }
  });

  //for date and time
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function updateDateTime() {
    const today = new Date();
    const weekday = weekdays[today.getDay()];
    const date = `${monthNames[today.getMonth()]
      } ${today.getDate()}, ${today.getFullYear()}`;
    const hour = today.getHours() % 12 === 0 ? 12 : today.getHours() % 12;
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const amPm = today.getHours() < 12 ? "AM" : "PM";

    document.querySelectorAll(".sub-header").forEach((subHeader) => {
      subHeader.querySelector(".weekdays").textContent = weekday;
      subHeader.querySelector(".date").textContent = date;
      subHeader.querySelector(".time").textContent = `${hour}:${String(
        minute
      ).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
      subHeader.querySelector(".am-pm").textContent = amPm;
    });
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

  //for sales visibility
  document.querySelectorAll(".eye").forEach((button) => {
    button.addEventListener("click", () => {
      const salesAmounts =
        button.parentNode.nextElementSibling.querySelectorAll(".heading-3");
      const icon = button.querySelector("i");

      if (icon.classList.contains("fa-eye-slash")) {
        salesAmounts.forEach((amount) => {
          amount.textContent = "₱ 10000.00";
        });
        icon.classList.replace("fa-eye-slash", "fa-eye");
      } else {
        salesAmounts.forEach((amount) => {
          amount.textContent = "₱ *****.00";
        });
        icon.classList.replace("fa-eye", "fa-eye-slash");
      }
    });
  });

  // chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const data = {
    labels: ['January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024', 'July 2024', 'August 2024', 'September 2024', 'October 2024', 'November 2024', 'December 2024'],
    datasets: [
      {
        label: 'Category1',
        data: [5000, 300, 200, 300, 200, 300, 200, 1000, 2500, 10000, 10000, 10000],
        backgroundColor: '#22326e'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: 'Monthly Data'
      },
      legend: {
        display: false,
        position: 'top'
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  // Create the chart
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });

  // Update the chart on resize of screen
  window.addEventListener('resize', () => {
    myChart.destroy();
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  });
});

// table
document.addEventListener('DOMContentLoaded', () => {
  //for dropdown status color
  const selectElements = document.querySelectorAll('.booking-status');

  selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', function () {
      const selectedValue = this.value;
      switch (selectedValue) {
        case 'booked':
          this.style.color = 'green';
          break;
        case 'pending':
          this.style.color = 'orange';
          break;
        case 'canceled':
          this.style.color = 'red';
          break;
        case 'checkIn':
          this.style.color = 'blue';
          break;
        case 'checkOut':
          this.style.color = 'gray';
          break;
      }
    });
    selectElement.dispatchEvent(new Event('change'));
  });

  // another drop down for booking ref no that will direct to payment or penalty
  const pTags = document.querySelectorAll('td.booking-no p');

  pTags.forEach(pTag => {
    pTag.addEventListener('mouseover', () => {
      const dropdown = pTag.nextElementSibling;
      dropdown.style.display = 'flex';
    });

    pTag.addEventListener('mouseout', () => {
      const dropdown = pTag.nextElementSibling;
      dropdown.style.display = 'none';
    });

    const dropdown = pTag.nextElementSibling;
    dropdown.addEventListener('mouseover', () => {
      dropdown.style.display = 'flex';
    });

    dropdown.addEventListener('mouseout', () => {
      dropdown.style.display = 'none';
    });

    const dropdownLinks = dropdown.querySelectorAll('a');
    dropdownLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        dropdown.style.display = 'flex';
      });

      link.addEventListener('mouseout', () => {

      });
    });
  });

  //for viewing room content and closing it etc.
  //all about the room content
  const contentContainer = document.querySelectorAll(".room-info");
  const imageContainer = document.querySelectorAll(".image");
  const closeButtons = document.querySelectorAll(".button-close");
  const imageCloseButtons = document.querySelectorAll(".image-close");

  contentContainer.forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const roomContent = event.target.parentNode.parentNode.querySelector(".room-content");
      const roomDescription = event.target.parentNode.parentNode.querySelector(".room-description");
      roomContent.style.display = "flex";
      roomContent.style.animationName = "fadeIn";
      roomContent.style.animationDuration = "300ms";
      roomDescription.scrollTop = 0;
    });
  });

  imageContainer.forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const imageView = event.target.closest(".image-viewer");
      const viewedImage = imageView.querySelector(".viewed-image");
      viewedImage.style.display = "flex";
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const roomContent = button.closest(".room-content");
      roomContent.style.display = "none";
    });
  });

  imageCloseButtons.forEach(button => {
    button.addEventListener("click", function () {
      const viewedImage = button.parentNode;
      viewedImage.style.display = "none";
    });
  });
});

//for room selection
document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[type="radio"][name="room-selection"]');
  const nextButton = document.querySelector('.room-next');
  let errorContainer = document.querySelectorAll('.message-alert');
  const errorMessage = document.querySelector('.alert-message');

  let previouslySelectedRoom = null;

  radios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      // Get the parent element with class "room"
      const room = event.target.parentNode;

      // Reset styles of previously selected room
      if (previouslySelectedRoom) {
        previouslySelectedRoom.style.backgroundColor = 'var(--white)'; // reset background color
        previouslySelectedRoom.querySelectorAll('.pax-number').forEach((element) => {
          element.style.color = 'black'; // reset font color
        });
        previouslySelectedRoom.querySelectorAll('.room-price').forEach((element) => {
          element.style.color = 'var(--blue-1)'; // reset font color
        });
        previouslySelectedRoom.querySelectorAll('.room-info').forEach((element) => {
          element.style.backgroundColor = 'var(--blue-1)'; // reset background color
          element.style.color = 'var(--white)'; // reset font color
        });
      }

      // Add the background color to the selected.room element
      room.style.backgroundColor = 'var(--blue-1)'; // set background color
      room.querySelectorAll('.pax-number').forEach((element) => {
        element.style.color = 'var(--white)'; // set font color
      });
      room.querySelectorAll('.room-price').forEach((element) => {
        element.style.color = 'var(--white)'; // set font color
      });
      room.querySelectorAll('.room-info').forEach((element) => {
        element.style.backgroundColor = 'var(--white)'; // set background color
        element.style.color = 'var(--blue-1)'; // set font color
      });

      // Update previouslySelectedRoom
      previouslySelectedRoom = room;

      // // Enable next button
      // nextButton.disabled = false;
      // nextButton.style.backgroundColor = '';
      // errorContainer.forEach((element) => {
      //   element.style.display = 'none';
      // });
    });
  });

  // Check if any radio is selected on page load
  if (!Array.prototype.some.call(radios, (radio) => radio.checked)) {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = 'gray';
  }

  // Add an event listener to check if any radio is selected
  radios.forEach((radio) => {
    radio.addEventListener('click', () => {
      if (!Array.prototype.some.call(radios, (radio) => radio.checked)) {
        nextButton.disabled = true;
        nextButton.style.backgroundColor = 'gray';
        errorMessage.forEach((element) => {
          element.style.display = 'block';
        });
      } else {
        nextButton.disabled = false;
        nextButton.style.backgroundColor = 'var(--blue-1)';
        nextButton.style.cursor = 'pointer';
        errorMessage.forEach((element) => {
          element.style.display = 'none';
        });
        nextButton.onclick = function () {
          window.location.href = '2_DateSelection.html';
        };
      }
    });
  });

  // Add an event listener to the next button to display the error message
  nextButton.addEventListener('click', () => {
    if (!Array.prototype.some.call(radios, (radio) => radio.checked)) {
      errorMessage.textContent = "Select a room first before proceeding";
      errorContainer.forEach((element) => {
        element.style.display = 'flex';
      });
    } else {
      window.location.href = '2_DateSelection.html';
    }
  });

  // Add an event listener to the OK button to hide the error message
  document.querySelectorAll('.ok-button').forEach((button) => {
    button.addEventListener('click', () => {
      button.parentNode.parentNode.style.display = 'none';
    });
  });
});


// collapsing side navigation
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll('.navsize-button');
  const sideNavs = document.querySelectorAll('.side-nav');
  const contentContainer = document.querySelectorAll('.container');
  let isCollapsed = false;

  navButtons.forEach(button => {
    button.addEventListener("click", function () {
      isCollapsed = !isCollapsed;

      const aTags = document.querySelectorAll(".navigation a");
      const aActive = document.querySelectorAll(".active-nav");
      const pTags = document.querySelectorAll(".navigation a p");
      const sideBanners = document.querySelectorAll(".side-banner");

      if (isCollapsed) {
        sideNavs.forEach(sideNav => sideNav.style.width = "80px");
        contentContainer.forEach(contentContainer => contentContainer.style.maxWidth = "calc(100% - 80px)");
        navButtons.forEach(btn => btn.style.transform = "rotatey(-180deg)");
        pTags.forEach(p => p.style.display = "none");
        sideBanners.forEach(sideBanner => sideBanner.children[1].style.display = "none");
        aTags.forEach(a => a.style.justifyContent = "center");
        aTags.forEach(a => a.style.padding = "1rem 0.625rem");
        // aTags.forEach(a => a.style.backgroundColor = "var(--white)");
        aActive.forEach(a => a.style.borderRight = "none");
        aActive.forEach(a => a.style.backgroundColor = "var(--blue-1)");
        aActive.forEach(a => a.style.color = "var(--white)");

      } else {
        sideNavs.forEach(sideNav => sideNav.style.width = "240px");
        contentContainer.forEach(contentContainer => contentContainer.style.maxWidth = "calc(100% - 240px)");
        navButtons.forEach(btn => btn.style.transform = "rotatey(0deg)");
        pTags.forEach(p => p.style.display = "block");
        sideBanners.forEach(sideBanner => sideBanner.children[1].style.display = "block");
        aTags.forEach(a => a.style.justifyContent = "start");
        aTags.forEach(a => a.style.backgroundColor = "");
        aActive.forEach(a => a.style.borderRight = "5px solid var(--blue-1)");
        aActive.forEach(a => a.style.backgroundColor = "var(--blue-2)");
        aActive.forEach(a => a.style.color = "var(--blue-1)");
      }
    });
  });
});

// for calendar
document.addEventListener("DOMContentLoaded", function () {
  const currentMonthContainer = document.getElementById("currentMonthCalendar");
  const nextMonthContainer = document.getElementById("nextMonthCalendar");

  let currentDisplayedMonth = 0;
  let selectedStartDate = null;
  let selectedEndDate = null;

  const renderCalendar = (container, offsetMonth) => {
    const daysContainer = container.querySelector(".days");
    const month = container.querySelector(".calendar-month");

    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    const date = new Date();
    let currentMonth = date.getMonth() + offsetMonth + currentDisplayedMonth;
    let currentYear = date.getFullYear();

    while (currentMonth > 11) {
      currentMonth -= 12;
      currentYear++;
    }
    while (currentMonth < 0) {
      currentMonth += 12;
      currentYear--;
    }

    date.setFullYear(currentYear, currentMonth, 1);
    date.setDate(1);

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;
    const today = new Date();

    month.innerHTML = `${months[currentMonth]} ${currentYear}`;

    let days = "";

    for (let x = firstDay.getDay(); x > 0; x--) {
      days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDayDate; i++) {
      let classList = "day";
      const currentDate = new Date(currentYear, currentMonth, i);

      if (currentDate < today) {
        classList += " day-over"; // Add "day-over" class if the day is in the past
      }

      if (selectedStartDate && selectedStartDate.getTime() === currentDate.getTime()) {
        classList += " selected-start";
      }

      if (selectedEndDate && selectedEndDate.getTime() === currentDate.getTime()) {
        classList += " selected-end";
      }

      if (selectedStartDate && selectedEndDate &&
        currentDate > selectedStartDate && currentDate < selectedEndDate) {
        classList += " in-range";
      }


      if (
        i === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        classList += " today";
      }

      days += `<div class="${classList}" data-date="${currentYear}-${currentMonth + 1}-${i}">${i}</div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    // adding the text check in and out to the days
    const updateCheckInOutText = () => {
      const allDays = document.querySelectorAll(".day");
      allDays.forEach(day => {
        const checkedText = day.querySelector('p.checked-text');
        if (checkedText) {
          checkedText.remove();
        }
      });

      allDays.forEach(day => {
        const dateStr = day.getAttribute("data-date");
        const date = new Date(dateStr);
        if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
          const checkedText = document.createElement('p');
          checkedText.textContent = 'Check-in';
          checkedText.classList.add("checked-text");
          day.appendChild(checkedText);
          day.style.backgroundColor = "var(--blue-1)";
        } else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
          const checkedText = document.createElement('p');
          checkedText.textContent = 'Check-out';
          checkedText.classList.add("checked-text");
          day.appendChild(checkedText);
          day.style.backgroundColor = "var(--blue-1)";
        }
      });
    };

    updateCheckInOutText();

    // Add event listeners for date selection
    const calendarDays = container.querySelectorAll(".day:not(.next):not(.prev)");
    const errorMessage = document.querySelector(".alert-message");
    const errorContainer = document.querySelector(".message-alert");

    calendarDays.forEach(day => {
      day.addEventListener("click", () => {
        const clickedDate = new Date(day.getAttribute("data-date"));
        const currentDate = new Date(); // Get the current date

        // Ensure the clicked date is not earlier than today
        // I know this will not be needed becoz I already disabled all the days that are finished. But just in case.
        if (clickedDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
          errorContainer.style.display = "flex";
          errorMessage.textContent = "You cannot select a check-in date earlier than today.";
          clickedDate = null; //reset the selection of date becoz it might cost error or the date will be selected even if its not a right date.
        }

        if (!selectedStartDate) {
          selectedStartDate = clickedDate;
        } else if (!selectedEndDate) {
          if (clickedDate >= selectedStartDate) {
            selectedEndDate = clickedDate;
          } else {
            errorContainer.style.display = "flex";
            errorMessage.textContent = "Selected date must be later than the start date.";
          }
        } else {
          // Reset selection if both start and end dates are already selected
          selectedStartDate = clickedDate;
          selectedEndDate = null;
        }

        document.getElementById("startDate").value = shortenDate(selectedStartDate);
        document.getElementById("endDate").value = shortenDate(selectedEndDate);

        renderCalendar(currentMonthContainer, 0);
        renderCalendar(nextMonthContainer, 1);
        updateButtonColor();
      });
    });
  };

  // for closing the alert message
  document.querySelectorAll('.ok-button').forEach((button) => {
    button.addEventListener('click', () => {
      button.parentNode.parentNode.style.display = 'none';
    });
  });


  function shortenDate(longDate) {
    var dateObj = new Date(longDate);
    var month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
    var day = dateObj.getDate().toString().padStart(2, '0');
    var year = dateObj.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const currentBtn = document.querySelector(".today");

  currentBtn.addEventListener("click", () => {
    currentDisplayedMonth = 0;
    selectedStartDate = null;
    selectedEndDate = null;
    renderCalendar(currentMonthContainer, 0);
    renderCalendar(nextMonthContainer, 1);
  });

  const nextBtns = document.querySelectorAll(".next");
  const prevBtns = document.querySelectorAll(".prev");

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentDisplayedMonth += 2;
      renderCalendar(currentMonthContainer, 0);
      renderCalendar(nextMonthContainer, 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentDisplayedMonth > 0) {
        currentDisplayedMonth -= 2;
        renderCalendar(currentMonthContainer, 0);
        renderCalendar(nextMonthContainer, 1);
      }
    });
    if (currentDisplayedMonth === 0) {
      btn.disabled = true;
      btn.style.backgroundColor = 'var(--gray-1)';
    } else {
      btn.disabled = false;
    }
  });

  renderCalendar(currentMonthContainer, 0);
  renderCalendar(nextMonthContainer, 1);

  //for next button of selecting of check in and out dates 
  const nextButton = document.querySelector(".date-next");
  const errorContainer = document.querySelector(".message-alert");
  const errorMessage = document.querySelector(".alert-message");

  //updating the button if theres a selected check in and check out dates
  function updateButtonColor() {
    if (selectedStartDate && selectedEndDate) {
      nextButton.style.backgroundColor = 'var(--blue-1)';
      nextButton.style.cursor = 'pointer';
      nextButton.addEventListener('mouseover', () => {
        nextButton.style.backgroundColor = 'var(--blue-4)';
      });
      nextButton.addEventListener('mouseout', () => {
        nextButton.style.backgroundColor = 'var(--blue-1)';
      });
    } else {
      nextButton.style.backgroundColor = 'var(--gray-1)';
      nextButton.style.cursor = 'not-allowed';
      nextButton.addEventListener('mouseover', () => {
        nextButton.style.backgroundColor = 'var(--gray-4)';
      });
      nextButton.addEventListener('mouseout', () => {
        nextButton.style.backgroundColor = 'var(--gray-1)';
      });
    }
  }

  //alert if theres a selected check in and check out dates before proceeding
  nextButton.addEventListener("click", () => {
    if (!(selectedStartDate && selectedEndDate)) {
      errorContainer.style.display = "flex";
      if (!selectedStartDate) {
        errorMessage.textContent = "You must select a check-in and check-out date.";
      } else {
        errorMessage.textContent = "You must select a check-out date.";
      }
    } else {
      // Submit the form or perform the desired action
      window.location.href = '3_BookingInfo.html';
    }
  });

});


// booking form
document.addEventListener("DOMContentLoaded", function () {
  // Get the radio input and checkbox container
  const checkboxContainer = document.querySelector('.checkbox-container');

  document.querySelectorAll('.amenities-option input').forEach((input) => {
    input.addEventListener('change', () => {
      checkboxContainer.style.display = input.id === 'yesAmenities' ? 'flex' : 'none';
    });
  });

  const addButton = document.getElementById("add-id");
  const inputsContainer = document.getElementById("input-container");
  const totalInputs = document.getElementById("total-counts");

  let inputCount = 0;

  addButton.addEventListener("click", function () {
    inputCount++;
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("id-container");

    const idInput = document.createElement("input");
    idInput.setAttribute("type", "text");
    idInput.classList.add("id-input");
    idInput.setAttribute("placeholder", "ID Number");
    inputContainer.appendChild(idInput);

    const selectInput = document.createElement("select");
    const options = [
      { value: "idPWD", text: "PWD" },
      { value: "idSenior", text: "Senior" }
    ];
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      selectInput.appendChild(optionElement);
    });
    inputContainer.appendChild(selectInput);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    removeButton.classList.add("id-remove");
    removeButton.addEventListener("click", function () {
      inputContainer.remove();
      inputCount--;
      totalInputs.textContent = inputCount;
    });
    inputContainer.appendChild(removeButton);

    inputsContainer.appendChild(inputContainer);
    totalInputs.textContent = inputCount;
  });

  const messageAlert = document.querySelector('.message-alert');
  const messageNote = document.querySelector('.alert-message');
  const okButton = document.querySelector('.ok-button');
  const inputField = document.querySelector('.add-pax input');

  okButton.addEventListener("click", () => {
    messageAlert.style.display = "none";
  });

  inputField.value = 0;

  inputField.addEventListener('input', function () {
    const inputValue = this.value;
    if (inputValue.startsWith('0') && inputValue.length > 1) {
      this.value = inputValue.substring(1);
    }
    const numericValue = parseInt(this.value);
    if (numericValue < 0 || numericValue > 2) {
      this.value = 0;
      messageNote.textContent = "max of additional 2 pax only";
      messageAlert.style.display = "flex";
      inputField.style.outline = "1px solid red";
    } else {
      inputField.style.outline = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function(){
  const viewDetails = document.querySelectorAll('.view-details');
  const detailsAmount = document.querySelector('.details-amount'); 
  const closeDetails = document.querySelectorAll('.details-amount .button-close');

  viewDetails.forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      detailsAmount.style.display = "flex";
      detailsAmount.style.animationName = "fadeIn";
      detailsAmount.style.animationDuration = "300ms";
      detailsAmount.scrollTop = 0;
    });
  });

  closeDetails.forEach(button => {
    button.addEventListener("click", function(event){
      detailsAmount.style.display = "none";
    });
  });
});
