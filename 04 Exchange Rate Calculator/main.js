// UI Elements
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Caculate Exchange Rate and Update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const exchange = new ExchangeRate(currency_one, currency_two);

  exchange.calculateExchangeRate()
    .then(rate => {
      rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = ( amountEl_one.value * rate ).toFixed(2);
    });
}

function swapCurrency() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);

calculate();