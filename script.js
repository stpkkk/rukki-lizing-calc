const slider1 = document.querySelector("#slider1");
const slider1Value = document.querySelector(".price-value");
const slider2 = document.querySelector("#slider2");
const slider2Value = document.querySelector(".precent");
const contributionRubles = document.querySelector(".prise");
const slider3 = document.querySelector("#slider3");
const slider3Value = document.querySelector(".month");

slider1.addEventListener("input", function () {
  slider1Value.textContent = `${slider1.value} ₽`;
});

slider2.addEventListener("input", function () {
  slider2Value.textContent = `${slider2.value} %`;
  contributionRubles.textContent = `${Math.trunc(
    (parseInt(slider1.value) * parseInt(slider2.value)) / 100
  )} ₽`;
});

slider3.addEventListener("input", function () {
  slider3Value.textContent = `${slider3.value} месяцев`;
});

//inputs progress
for (let e of document.querySelectorAll(
  'input[type="range"].slider-progress'
)) {
  e.style.setProperty("--value", e.value);
  e.style.setProperty("--min", e.min == "" ? "0" : e.min);
  e.style.setProperty("--max", e.max == "" ? "100" : e.max);
  e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}
