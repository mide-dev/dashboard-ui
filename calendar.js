"use strict";

const darkModeSwitch = document.querySelector(".dark-mode-switch");
const calendarWrap = document.querySelector(".calendar-wrap");

darkModeSwitch.onClick = () => {
  calendarWrap.classList.toggle(".dark");
  calendarWrap.classList.toggle(".light");
};
