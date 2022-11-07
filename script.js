let fromCurrency = "USD";
let toCurrency = "EUR";
let rateResult = 0;
let rateElm = document.getElementById("result");
let loadingElm = document.getElementById("loading");

const getCurrency = (from, to) => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    .then((res) => res.json())
    .then((response) => {
      rateResult = response;
      if (!response.result) {
        showToastify("We could not find these currencies!");
      } else {
        fromCurrency = from;
        toCurrency = to;
        rateElm.innerHTML = rateResult.result;
        rateElm.style.color = "white";
        rateElm.style.padding = "5px";
        rateElm.style.borderRadius = "5px";
        rateElm.style.backgroundColor = generateLightColorHex();
        rateElm.classList.remove("hidden");
        loadingElm.classList.add("hidden");
      }
    });
};

getCurrency(fromCurrency, toCurrency);

var intervalId = window.setInterval(function () {
  getCurrency(fromCurrency, toCurrency);
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
  if (event.target[0].value && event.target[1].value) {
    let fromCur = event.target[0].value.toUpperCase();
    let toCur = event.target[1].value.toUpperCase();
    document.getElementById("from").innerText = fromCur;
    document.getElementById("to").innerText = toCur;
    getCurrency(fromCur, toCur);
    rateElm.classList.add("hidden");
    loadingElm.classList.remove("hidden");
    event.target[0].value = "";
    event.target[1].value = "";
  }
};

const showToastify = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    destination: false,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  getCurrency(fromCurrency, toCurrency);
  document.getElementById("from").innerText = fromCurrency;
  document.getElementById("to").innerText = toCurrency;
};
