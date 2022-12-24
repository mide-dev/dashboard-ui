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
const calendarWrap = document.querySelector(".calendar-wrap");
const calendar = document.querySelector(".calendar");
const calendarDays = document.querySelector(".calendar-days");
const calendarHeaderYear = document.getElementById("year");
const monthPicker = document.getElementById("month-picker");

// dark mode toggle
darkModeSwitch.addEventListener("click", () => {
  calendarWrap.classList.toggle("dark");
  calendarWrap.classList.toggle("light");
});

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

  // prettier-ignore
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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

const inputDate = new Date();

generateCalendar(inputDate.getFullYear(), inputDate.getMonth());
