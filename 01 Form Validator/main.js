// UI Elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, msg) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.textContent = msg;
}

// Success border color
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

// Check Required
function checkRequired(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required.`);
    }
  });
}

// Check Length
function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength | input.value.length > maxLength) {
    showError(input, `${getFieldName(input)} must be ${minLength} to ${maxLength} characters. `);
  } else {
    showSuccess(input);
  }
}

// Check Email
function checkEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value.trim())) {
    showError(email, `Please enter a valid email.`);
  } else {
    showSuccess(email);
  }
}

// Check Passwords Match
function checkPasswordsMatch(pwd1, pwd2) {
  if (pwd1.value !== pwd2.value) {
    showError(pwd2, `Passwords do not match.`);
  }
}

// Get Input Field
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Form Event Listener
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  checkLength(username, 5, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  checkRequired([username, email, password, password2]);
});

