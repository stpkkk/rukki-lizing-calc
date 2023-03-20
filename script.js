const slider1 = document.querySelector("#slider1");
const priceValue = document.querySelector(".price-value");

const slider2 = document.querySelector("#slider2");
const percentValue = document.querySelector(".percent");
const contributionRubles = document.querySelector(".paymentPrice");

const slider3 = document.querySelector("#slider3");
const slider3Value = document.querySelector(".month");

const contractSum = document.querySelector(".sum-contract");
const monthPayment = document.querySelector(".calculator__price");

monthPayment.textContent = "0 ₽";
priceValue.textContent = "0 ₽";

function calculateMonthlyPayment() {
  const monthlyPayment =
    (parseInt(slider1.value) - parseInt(contributionRubles.textContent)) /
    parseInt(slider3.value);
  monthlyPayment < 0
    ? (monthPayment.textContent = "0 ₽")
    : (monthPayment.textContent = `${Math.trunc(monthlyPayment)} ₽`);
}

slider1.addEventListener("input", function () {
  priceValue.textContent = `${slider1.value} ₽`;
  contractSum.textContent = `${slider1.value} ₽`;
  calculateMonthlyPayment();
});

slider2.addEventListener("input", function () {
  percentValue.textContent = `${slider2.value} %`;
  contributionRubles.textContent = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )} ₽`;
  calculateMonthlyPayment();
});

slider3.addEventListener("input", function () {
  slider3Value.textContent = `${slider3.value} месяцев`;
  calculateMonthlyPayment();
});

// calculate initial monthly payment
calculateMonthlyPayment();

//inputs progress
for (let e of document.querySelectorAll(
  'input[type="range"].slider-progress'
)) {
  e.style.setProperty("--value", e.value);
  e.style.setProperty("--min", e.min == "" ? "0" : e.min);
  e.style.setProperty("--max", e.max == "" ? "100" : e.max);
  e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}
