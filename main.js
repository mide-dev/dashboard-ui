"use strict";

const calendarDropdown = document.querySelector(".calendar-dropdown");

calendarDropdown.onclick = () => {
  calendar.classList.toggle("hidden");

  if (!calendar.classList.contains("hidden")) {
    calendarDropdown.setAttribute("data-expand", "true");
  } else {
    calendarDropdown.setAttribute("data-expand", "false");
  }
};
