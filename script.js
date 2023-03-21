const slider1 = document.querySelector("#slider1");
const sliderPriceInput = document.querySelector("#price");

const slider2 = document.querySelector("#slider2");
const sliderPercentInput = document.querySelector("#percent");
const sliderRubInput = document.querySelector("#payment");

const slider3 = document.querySelector("#slider3");
const sliderMonthInput = document.querySelector("#month");

const contractSum = document.querySelector("#contract");
const monthPayment = document.querySelector("#month-payment");

let formatter = new Intl.NumberFormat("ru-RU");

function calculateMonthlyPayment() {
  const monthlyPayment =
    (parseInt(slider1.value) - parseInt(sliderRubInput.value)) /
    parseInt(slider3.value);
  const formattedMonthlyPayment = formatter.format(Math.trunc(monthlyPayment));
  monthlyPayment <= 0
    ? (monthPayment.textContent = "0 ₽")
    : (monthPayment.textContent = `${formattedMonthlyPayment} ₽`);
}

function setSliderRubInput() {
  sliderRubInput.value = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )}`;
}

function setSliderPercentInput() {
  const percentage = Math.trunc(
    (parseInt(sliderRubInput.value) / parseInt(slider1.value)) * 100
  );
  if (percentage > 49) {
    sliderPercentInput.value = "49";
  } else {
    sliderPercentInput.value = `${percentage}`;
  }
  slider2.style.setProperty("--value", sliderPercentInput.value);
  slider2.value = sliderPercentInput.value;
  sliderPercentInput.value === ""
    ? (slider2.value = 0)
    : sliderPercentInput.value;
}

slider1.addEventListener("input", function () {
  const formattedPrice = formatter.format(slider1.value);
  sliderPriceInput.textContent = `${formattedPrice} ₽`;
  contractSum.textContent = `${formattedPrice} ₽`;
  setSliderRubInput();
  calculateMonthlyPayment();
});

slider2.addEventListener("input", function () {
  sliderPercentInput.textContent = `${slider2.value} %`;
  setSliderRubInput();
  calculateMonthlyPayment();
});

slider3.addEventListener("input", function () {
  sliderMonthInput.textContent = slider3.value;
  setSliderRubInput();
  calculateMonthlyPayment();
});

sliderMonthInput.addEventListener("input", function () {
  calculateMonthlyPayment();
});

sliderRubInput.addEventListener("input", function () {
  calculateMonthlyPayment();
  setSliderPercentInput(); //asdaaaaaa
});

sliderPriceInput.addEventListener("input", function () {
  contractSum.textContent = slider1.value;
  calculateMonthlyPayment();
});

sliderPercentInput.addEventListener("input", function () {
  setSliderRubInput();
  calculateMonthlyPayment();
});

//calculate initial monthly payment
calculateMonthlyPayment();

//sliders progress

sliderPriceInput.addEventListener("input", function () {
  slider1.style.setProperty("--value", sliderPriceInput.value);
  sliderPriceInput.value === "" ? (slider1.value = 0) : sliderPriceInput.value;
});

sliderPercentInput.addEventListener("input", function () {
  slider2.style.setProperty("--value", sliderPercentInput.value);
  sliderPercentInput.value === ""
    ? (slider2.value = 0)
    : sliderPercentInput.value;
});

sliderMonthInput.addEventListener("input", function () {
  slider3.style.setProperty("--value", sliderMonthInput.value);
  sliderMonthInput.value === "" ? (slider3.value = 0) : sliderMonthInput.value;
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
