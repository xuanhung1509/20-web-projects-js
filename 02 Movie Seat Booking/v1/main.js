// UI Elements
const container = document.querySelector('.container');
const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movies');
const seatsCount = document.getElementById('count');
const total = document.getElementById('total');

populateUI();
// let ticketPrice = +movieSelect.value; // Removed

// Update Count and Total
function updatePrice() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  seatsCount.textContent = selectedSeatsCount;
  const ticketPrice = +movieSelect.value; // Added
  total.textContent = ticketPrice * selectedSeatsCount;

  setSeatsData(selectedSeats);
}

// Set Seats Data
function setSeatsData(selectedSeats) {
  const seatsIndex = [...selectedSeats].map(seat => [...availableSeats].indexOf(seat));
  localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));
}
// Set Movie Data
function setMovieData(movieIndex) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
}

// Populate UI
function populateUI() {
  const seatsIndex = JSON.parse(localStorage.getItem('seatsIndex'));

  if (seatsIndex !== null && seatsIndex.length > 0) {
    seatsIndex.forEach((curIndex) => {
      availableSeats[curIndex].classList.add('selected');
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updatePrice();
  }
});

// Movie change event
movieSelect.addEventListener('change', (e) => {
  // ticketPrice = +e.target.value; // Removed
  updatePrice();
  setMovieData(e.target.selectedIndex);
});

// Initial count and total
updatePrice();

// Note: I see that we can put the expression of ticketPrice into the function updatePrice() and remove line 9 and line 60.