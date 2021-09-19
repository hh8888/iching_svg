// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
//sappDiv.innerHTML = `<h1>JS Starter123</h1>`;

function rotateEl(el) {
  console.log('rotateEL');
}

function rotate() {
  var el = document.getElementById('yinyang');
  rotateEl(el);
}

document.addEventListener('load', function (e) {
  console.log('Load');
  rotate();
});

rotate();
