let fromCurrency = "USD";
let toCurrency = "EUR";
let rateResult = 0;
let rateElm = document.getElementById("result");
let loadingElm = document.getElementById("loading");

const getCurrency = (from, to) => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    .then((res) => res.json())
    .then((response) => {
      // console.log(response)
      rateResult = response;
      rateElm.innerHTML = rateResult.result;
      rateElm.style.color = "white";
      rateElm.style.padding = "5px";
      rateElm.style.borderRadius = "5px";
      rateElm.style.backgroundColor = generateLightColorHex();
      rateElm.classList.remove("hidden");
      loadingElm.classList.add("hidden");
    });
};

getCurrency(fromCurrency, toCurrency);

var intervalId = window.setInterval(function () {
  getCurrency(fromCurrency, toCurrency);
  //   console.log("--> ", rateResult.result);
}, 3000);

function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
}

document.getElementById("currency-inputs").onsubmit = (event) => {
  event.preventDefault();
  // console.log(event.target[0].value)
  if (event.target[0].value && event.target[1].value) {
    fromCurrency = event.target[0].value.toUpperCase();
    toCurrency = event.target[1].value.toUpperCase();
    document.getElementById("from").innerText = fromCurrency;
    document.getElementById("to").innerText = toCurrency;
    getCurrency(fromCurrency, toCurrency);
    rateElm.classList.add("hidden");
    loadingElm.classList.remove("hidden");
    event.target[0].value = ''
    event.target[1].value = ''
  }
};
