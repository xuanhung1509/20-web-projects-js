/* 
1st, populateUI(): 
  pull out from LS the indexes of selected seats and display to the UI by adding the class 'selected'
  change the select movie to the previous selected.

2nd, update ticketPrice based on selected movie.

3nd, when select a seat:
  toggle class "selected" and run updatePrice()

4th, when change movie:
  update ticketPrice
  run updatePrice()

updatePrice():
  count the seats selected
  display count and compute total price.
  save data to LS
*/

/*
functions:
- can only select seats that are not occupied.
- when select a seat, that turns to blue color, update count and price.
- when change movie, update price.
- save data to LS.
*/