"use strict";

/*
- calc leap year and normal year
- calc days in feb using leap year
- generate calendar to display days in each month
- month button links to all month
- year button links to all year
- <> - decrease and increase year
- place background color on current date
- calendar always show current day page
*/

const darkModeSwitch = document.querySelector(".dark-mode-switch");
// const calendarWrap = document.querySelector(".calendar-wrap");
const calendar = document.querySelector(".calendar");
const calendarDays = document.querySelector(".calendar-days");
const calendarHeader = document.querySelector(".calendar-header");
const calendarBody = document.querySelector(".calendar-body");
const calendarFooter = document.querySelector(".calendar-footer");
const calendarHeaderYear = document.getElementById("year");
const monthPicker = document.getElementById("month-picker");
const months = document.querySelector(".months");

// dark mode toggle
darkModeSwitch.addEventListener("click", () => {
  calendar.classList.toggle("dark");
  calendar.classList.toggle("light");
});

// prettier-ignore
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
  calendarHeaderYear.innerHTML = year;

  //  get day of the week the first day falls on
  const firstDay = new Date(year, month, 1);

  // Add empty cells for the days of the week that come before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  // Add the days of the month
  for (let i = 1; i <= daysOfMonth[month]; i++) {
    calendarDays.innerHTML += `<div id=day-${i}>${i}</div>`;
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

// change calendar month
monthPicker.onclick = () => {
  // populate month names from the above month array
  for (let i of monthNames) {
    months.innerHTML += `<div id='${i}'>${i}</div>`;
    i++;
  }

  // render all months
  calendarHeader.classList.add("hidden");
  calendarBody.classList.add("hidden");
  calendarFooter.classList.add("hidden");
  months.classList.remove("hidden");
};

for (let month of monthNames) {
}

const inputDate = new Date();

generateCalendar(inputDate.getFullYear(), inputDate.getMonth());
