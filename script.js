const slider1 = document.querySelector("#slider1");
const sliderPriceInput = document.querySelector("#price");

const slider2 = document.querySelector("#slider2");
const percentInput = document.querySelector("#percent");
const firstPaymentInput = document.querySelector("#payment");

const slider3 = document.querySelector("#slider3");
const monthInput = document.querySelector("#month");

const contractSum = document.querySelector("#contract");
const monthPayment = document.querySelector("#month-payment");

let formatter = new Intl.NumberFormat("ru-RU");

function calculateMonthlyPayment() {
  const monthlyPayment =
    (parseInt(slider1.value) - parseInt(firstPaymentInput.value)) /
    parseInt(slider3.value);
  if (!Number.isFinite(monthlyPayment) || monthlyPayment <= 0) {
    monthPayment.textContent = "0 ₽";
  } else {
    const formattedMonthlyPayment = formatter.format(
      Math.trunc(monthlyPayment)
    );
    monthPayment.textContent = `${formattedMonthlyPayment} ₽`;
  }
}

function setSliderRubInput() {
  firstPaymentInput.value = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )}`;
}

function setSliderPercentInput() {
  const percentage = Math.trunc(
    (parseInt(firstPaymentInput.value) / parseInt(slider1.value)) * 100
  );
  if (percentage > 49) {
    percentInput.value = "49";
  } else {
    percentInput.value = `${percentage}`;
  }
  slider2.style.setProperty("--value", percentInput.value);
  slider2.value = percentInput.value;
  percentInput.value === "" ? (slider2.value = 0) : percentInput.value;
}

slider1.addEventListener("input", function () {
  const formattedPrice = formatter.format(slider1.value);
  sliderPriceInput.textContent = `${formattedPrice} ₽`;
  contractSum.textContent = `${formattedPrice} ₽`;
  setSliderRubInput();
  calculateMonthlyPayment();
});

slider2.addEventListener("input", function () {
  percentInput.textContent = `${slider2.value} %`;
  setSliderRubInput();
  calculateMonthlyPayment();
});

slider3.addEventListener("input", function () {
  monthInput.textContent = slider3.value;
  setSliderRubInput();
  calculateMonthlyPayment();
});

monthInput.addEventListener("input", function () {
  calculateMonthlyPayment();
});

firstPaymentInput.addEventListener("input", function () {
  calculateMonthlyPayment();
  setSliderPercentInput();
});

sliderPriceInput.addEventListener("input", function () {
  if (sliderPriceInput.value >= parseInt(sliderPriceInput.max)) {
    contractSum.textContent = parseInt(sliderPriceInput.max);
  } else {
    const formattedSliderPriceInput = formatter.format(sliderPriceInput.value);
    contractSum.textContent = `${formattedSliderPriceInput} ₽`;
  }
  calculateMonthlyPayment();
});

percentInput.addEventListener("input", function () {
  setSliderRubInput();
  calculateMonthlyPayment();
});

//calculate initial monthly payment
calculateMonthlyPayment();

//sliders progress

sliderPriceInput.addEventListener("input", function () {
  slider1.style.setProperty("--value", sliderPriceInput.value);
  if (sliderPriceInput.value <= parseInt(sliderPriceInput.min - 1)) {
    slider1.value = 0;
    monthPayment.textContent = "0 ₽";
  } else {
    slider1.value;
    monthPayment.textContent = `${formattedMonthlyPayment} ₽`;
  }
});

percentInput.addEventListener("input", function () {
  slider2.style.setProperty("--value", percentInput.value);
  percentInput.value === "" ? (slider2.value = 0) : percentInput.value;
});

monthInput.addEventListener("input", function () {
  slider3.style.setProperty("--value", monthInput.value);
  monthInput.value === "" ? (slider3.value = 0) : slider3.value;
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
