"use strict";

const darkModeSwitch = document.querySelector(".dark-mode-switch");
const calendar = document.querySelector(".calendar");
const calendarDays = document.querySelector(".calendar-days");
const calendarHeader = document.querySelector(".calendar-header");
const calendarBody = document.querySelector(".calendar-body");
const calendarFooter = document.querySelector(".calendar-footer");
const calendarHeaderYear = document.getElementById("year");
const monthPicker = document.getElementById("month-picker");
const monthsContainer = document.querySelector(".months");
const previousYearBtn = document.getElementById("prev-year");
const nextYearBtn = document.getElementById("next-year");

// prettier-ignore
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let calendarYear;

// check for leap year
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

// calc days to  appear in Feb
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// generate calendar
const generateCalendar = (year, month) => {
  // reset calendar days display
  calendarDays.innerHTML = "";

  // prettier-ignore
  const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const currentDate = new Date();

  // set display for current month & year
  monthPicker.innerHTML = monthNames[month];
  calendarHeaderYear.innerHTML = calendarYear = year;

  //  get day of the week the first day falls on
  const firstDay = new Date(year, month, 1);

  // Add empty cells for the days of the week that come before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    calendarDays.innerHTML += `<span></span>`;
  }

  // Add the days of the month
  for (let i = 1; i <= daysOfMonth[month]; i++) {
    calendarDays.innerHTML += `<div id='day-${i}'>${i}</div>`;
    // indicate current day's date with bg color
    if (i === currentDate.getDate()) {
      if (
        currentDate.getFullYear() == calendarHeaderYear.textContent &&
        currentDate.getMonth() == monthNames.indexOf(monthPicker.textContent)
      ) {
        document.getElementById(`day-${i}`).classList.add("current-day");
      } else {
        document.getElementById(`day-${i}`).classList.remove("current-day");
      }
    }
  }
};

// display calendar with respect to current date
let calendarDate = new Date();

// render calendar function
const renderCalendar = () => {
  generateCalendar(calendarDate.getFullYear(), calendarDate.getMonth());
};
// render calendar
renderCalendar();

// toggle months display
const toggleMonthsDisplay = () => {
  calendarHeader.classList.toggle("hidden");
  calendarBody.classList.toggle("hidden");
  monthsContainer.classList.toggle("hidden");
};

// let user change calendar month
monthPicker.addEventListener("click", () => {
  // render all months
  toggleMonthsDisplay();
});

// SET CALENDAR MONTH TO CLICKED MONTH
const months = document.querySelectorAll(".month");
// listen for click event on each month dynamically
months.forEach((month) => {
  month.addEventListener("click", () => {
    // find out which month is  clicked
    // achieved this by finding a match btw "monthNames" Array and text content of clicked month
    for (let i of monthNames) {
      if (i == month.textContent) {
        // once the clicked month is known, hide all months and display calendar
        toggleMonthsDisplay();
        // set calendar month to clicked month
        const clickedMonth = monthNames.indexOf(i);
        calendarDate.setMonth(clickedMonth);
        // re-render calender with clicked month data
        renderCalendar();
      }
    }
  });
});

// LET USER SET CALENDAR YEAR
// decrease calendar year
previousYearBtn.onclick = () => {
  calendarYear--;
  calendarDate.setFullYear(calendarYear);
  renderCalendar();
};

// increase calendar year
nextYearBtn.onclick = () => {
  calendarYear++;
  calendarDate.setFullYear(calendarYear);
  renderCalendar();
};
