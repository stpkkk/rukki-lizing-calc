const slider1 = document.querySelector("#slider1");
const priceValue = document.querySelector("#price");

const slider2 = document.querySelector("#slider2");
const percentValue = document.querySelector("#percent");
const contributionRubles = document.querySelector("#payment");

const slider3 = document.querySelector("#slider3");
const slider3Value = document.querySelector("#month");

const contractSum = document.querySelector("#contract");
const monthPayment = document.querySelector("#month-payment");

let formatter = new Intl.NumberFormat("ru");

function calculateMonthlyPayment() {
  const monthlyPayment =
    (parseInt(slider1.value) - parseInt(contributionRubles.value)) /
    parseInt(slider3.value);
  const formattedMonthlyPayment = formatter.format(Math.trunc(monthlyPayment));
  monthlyPayment <= 0
    ? (monthPayment.textContent = "0 ₽")
    : (monthPayment.textContent = `${formattedMonthlyPayment} ₽`);
}

function setContributionRubles() {
  contributionRubles.value = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )}`;
}

slider1.addEventListener("input", function () {
  const formattedPrice = formatter.format(slider1.value);
  priceValue.textContent = `${formattedPrice} ₽`;
  contractSum.textContent = `${formattedPrice} ₽`;
  setContributionRubles();
  calculateMonthlyPayment();
});

slider2.addEventListener("input", function () {
  percentValue.textContent = `${slider2.value} %`;
  setContributionRubles();
  calculateMonthlyPayment();
});

slider3.addEventListener("input", function () {
  slider3Value.textContent = slider3.value;
  setContributionRubles();
  calculateMonthlyPayment();
});

contributionRubles.addEventListener("input", function () {});

//calculate initial monthly payment
calculateMonthlyPayment();

//inputs progress
percentValue.addEventListener("input", function () {
  slider2.style.setProperty("--value", percentValue.value);
});

priceValue.addEventListener("input", function () {
  slider1.style.setProperty("--value", priceValue.value);
});

slider3Value.addEventListener("input", function () {
  slider3.style.setProperty("--value", slider3Value.value);
});

for (let el of document.querySelectorAll(
  'input[type="range"].slider-progress'
)) {
  el.style.setProperty("--value", el.value);
  el.style.setProperty("--min", el.min == "" ? "0" : el.min);
  el.style.setProperty("--max", el.max == "" ? "100" : el.max);
  el.addEventListener("input", () => {
    el.style.setProperty("--value", el.value);
  });
}
