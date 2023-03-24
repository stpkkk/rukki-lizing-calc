const slider1 = document.querySelector("#slider1");
const priceInput = document.querySelector("#price");

const slider2 = document.querySelector("#slider2");
const percentInput = document.querySelector("#percent");
const firstPaymentInput = document.querySelector("#payment");

const slider3 = document.querySelector("#slider3");
const monthInput = document.querySelector("#month");

const contractSum = document.querySelector("#contract");
const monthPayment = document.querySelector("#month-payment");

const button = document.querySelector(".chwvPL");

screen.width >= 980
  ? button.setAttribute(
      "onclick",
      "location.href='http://rukkipro.tilda.ws/#uc-zw-zayavka';"
    )
  : button.setAttribute(
      "onclick",
      "location.href='http://rukkipro.tilda.ws/#uc-zv-zayavka';"
    );

let formatter = new Intl.NumberFormat("ru-RU");

function setMonthlyPayment() {
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

function setFirstPaymentInput() {
  firstPaymentInput.value = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )}`;
}

function setPercentInput() {
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
  priceInput.textContent = `${formattedPrice} ₽`;
  contractSum.textContent = `${formattedPrice} ₽`;
  setFirstPaymentInput();
  setMonthlyPayment();
});

slider2.addEventListener("input", function () {
  percentInput.textContent = `${slider2.value} %`;
  setFirstPaymentInput();
  setMonthlyPayment();
});

slider3.addEventListener("input", function () {
  monthInput.textContent = slider3.value;
  setFirstPaymentInput();
  setMonthlyPayment();
});

monthInput.addEventListener("input", function () {
  setMonthlyPayment();
});

firstPaymentInput.addEventListener("input", function () {
  setMonthlyPayment();
  setPercentInput();
});

priceInput.addEventListener("input", function () {
  if (priceInput.value >= parseInt(priceInput.max)) {
    contractSum.textContent = parseInt(priceInput.max);
  } else {
    const formattedSliderPriceInput = formatter.format(priceInput.value);
    contractSum.textContent = `${formattedSliderPriceInput} ₽`;
  }
  setMonthlyPayment();
});

percentInput.addEventListener("input", function () {
  setFirstPaymentInput();
  setMonthlyPayment();
});

//calculate initial monthly payment

priceInput.addEventListener("input", function () {
  slider1.style.setProperty("--value", priceInput.value);
  if (priceInput.value <= parseInt(priceInput.min - 1)) {
    slider1.value = 0;
    monthPayment.textContent = "0 ₽";
  } else {
    slider1.value;
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

setMonthlyPayment();
