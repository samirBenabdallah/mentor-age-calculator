const dayInput = document.getElementById("inputDay");
const monthInput = document.getElementById("inputMonth");
const yearInput = document.getElementById("inputYear");
const button = document.getElementById("calculButton");
const dayNull = "day is NULL";
const monthNull = "month is NULL";
const yearNull = "year is NULL";
const dayErreur = "day is incorrect";
const monthErreur = "month is incorrect";
const yearErreur = "year is incorrect";
const correctData = "data is correct";
const _31Month = [1, 3, 5, 7, 8, 10, 12];
const _30Month = [4, 6, 9, 11];
function numberDayInMonth(date) {
  let month = +date.month;
  if (_30Month.indexOf(month) !== -1) return 30;
  if (_31Month.indexOf(month) !== -1) return 31;
  if (+date.year % 4 === 0) return 29;
  else return 28;
}
function getToday() {
  let today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
}
function getBirthDay() {
  return {
    day: dayInput.value,
    month: monthInput.value,
    year: yearInput.value,
  };
}
function isCorrectDay(date) {
  let day = +date.day;
  if (date.month == "2") {
    if (+date.year % 4 === 0 && day <= 29) return true;
    else if (day < 29) return true;
  } else {
    if (_30Month.includes(+date.month) && day < 31) return true;
    if (_31Month.includes(+date.month) && day <= 31) return true;
  }
  return false;
}
function checkInfo(date) {
  let day = date.day;
  if (day === "") return dayNull;
  if ((day + "").length > 2 || +day <= 0 || !isCorrectDay(date))
    return dayErreur;
  let month = date.month;
  if (month === "") return monthNull;
  if ((month + "").length > 2 || +month <= 0) return monthErreur;
  let year = date.year;
  if (year === "") return yearNull;
  if ((year + "").length > 4 || +year <= 1800) return yearErreur;
  else return correctData;
}
function showResult(date = 0) {
  const Day = document.getElementById("resultDay");
  const Month = document.getElementById("resultMonth");
  const Year = document.getElementById("resultYear");
  if (date === 0) {
    Day.innerText = "- -";
    Month.innerText = "- -";
    Year.innerText = "- -";
    return;
  }
  Day.innerText = date.day;
  Month.innerText = date.month;
  Year.innerText = date.year;
}
button.addEventListener("click", () => {
  let today = getToday();
  let birthDay = getBirthDay();
  let result = {
    day: "",
    month: "",
    year: "",
  };
  if (checkInfo(birthDay) === correctData) {
    result.year = today.year - birthDay.year;
    result.month = today.month - birthDay.month;
    if (result.month < 0) {
      result.month = 12 + result.month;
      result.year--;
    }
    result.day = today.day - birthDay.day;
    if (result.day < 0) {
      result.day = numberDayInMonth(today) + result.day;
      result.month--;
      if (result.month < 0) {
        result.month = 12 + result.month;
        result.year--;
      }
    }
    showResult(result);
  } else {
    console.log(checkInfo(birthDay));
  }
});
