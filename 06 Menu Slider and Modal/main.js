const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

// Show Nav
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));

// Show Modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Close Modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Close Modal on clicking outside
document.addEventListener('click', e => e.target === modal ? modal.classList.remove('show-modal') : false);