// UI Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateTotalBtn = document.getElementById('calculate-total');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Get random user
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const resData = await res.json();
  const user = resData.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}

// Double money
function doubleMoney() {
  data = data.map(user => {
    return {
      // name: user.name,
      ...user,
      money: user.money * 2
    };
  });
  updateDOM();
}

// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  // data.sort(function(a, b) {
  //   return b - a; // sort desc
  // });

  updateDOM();
}

// Show only Millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Calculate Total
function calculateTotal() {
  // const total = data.reduce((accumulator, user) => accumulator + user.money, 0);
  const reducer = (accumulator, user) => accumulator + user.money;
  const total = data.reduce(reducer, 0);
  const totalEl = document.createElement('div');
  totalEl.classList.add('total');
  totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(totalEl);
}

// Add new user to data arr
function addData(user) {
  data.push(user);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main - to prevent displaying repetitive data
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  // Display User & Money to the DOM
  providedData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateTotalBtn.addEventListener('click', calculateTotal);

// The function updateDOM() is separated from other functions, which makes the application modular and easy to expand.