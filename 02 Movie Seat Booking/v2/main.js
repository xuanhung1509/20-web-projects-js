// UI Elements (availableSeats, movie, count, price)
const container = document.querySelector('.container');
const availableSeats = document.querySelectorAll('.seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();

// Update Price
function updatePrice() {

  // Update count
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  
  // Update total
  const ticketPrice = +movieSelect.value;
  total.textContent = ticketPrice * selectedSeatsCount;

  saveSeats(selectedSeats);
  saveMovie(movieSelect.selectedIndex);
}

// Save Seats
function saveSeats(selectedSeats) {
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...availableSeats].indexOf(seat);
  });

  localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));
}

// Save Movie
function saveMovie(selectedMovieIndex) {
  localStorage.setItem('selectedMovie', selectedMovieIndex);
}

// Populate UI
function populateUI() {
  // Display previous selected movie
  if (localStorage.getItem('selectedMovie') !== null) {
    movieSelect.selectedIndex = localStorage.getItem('selectedMovie');
  }

  // Display previous selected seats
  const selectedSeatsIndex = JSON.parse(localStorage.getItem('seatsIndex'));

  if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
    selectedSeatsIndex.forEach(seat => {
      [...availableSeats][seat].classList.add('selected');
    });
  }

  // Update count and total
  updatePrice();
}

// Selecting Seats event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updatePrice();
  }
});

// Changing Movie event
movieSelect.addEventListener('change', () => {
  updatePrice();
});