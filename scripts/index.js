import { cart, productList } from "./cart.js";
import { formatCurrency } from "./utilities.js";

const displayCartQuantity = document.querySelector('.js-cart-quantity');
const bestSellingProductsHTML = document.querySelector('.js-best-selling-products');
const form = document.querySelector('.js-index-form');
const emailNotification = document.querySelector('.js-email-notification');

let productOne;
let productTwo; 
let mostPopular; 

updateCart();

function updateCart(){
  let cartQuantity = 0; 

  cart.forEach((product) => {
    cartQuantity += product.quantity;
  });

  displayCartQuantity.innerHTML = cartQuantity;
}

form.addEventListener('submit', () => {
  emailNotification.value = '';
  alert('Success!');
})

productList.forEach((product) => {

  if (product.id === 'piano-001') {
    productOne = product; 
  } 

  if (product.id === 'guitar-002') {
    productTwo = product; 
  }

  if (product.id === 'guitar-001') {
    mostPopular = product;
  }
})

bestSellingProductsHTML.innerHTML = `
  <div class="col-10 col-lg-4 col-xl-4 col-xxl-2 p-lg-3">
    <div class="card border-1">
      <div class="card-body text-center">
        <h1 class="card-title best-selling-name">${productOne.name}</h1>
        <img src="${productOne.image}" alt="" class="img-fluid best-selling-img">
        <p class="card-subtitle">Excellent Studio Piano</p>
        <p class="card-text text-muted d-none d-lg-block best-selling-description">${productOne.description}</p>
        <div class="d-flex justify-content-between align-items-center px-4 pt-2">
          <p class="fw-bold m-0">£${formatCurrency(productOne.price)}</p>
          <a href="keyboards.html" class="btn btn-sm btn-style">VIEW</a>
        </div>
      </div>
    </div>
  </div>  

  <div class="col-10 col-lg-4 col-xxl-3">
    <div class="card">
      <div class="card-header text-center card-header-style"><h1 class="h4 text-white fw-bold">MOST POPULAR</h1></div>
      <div class="card-body text-center">
        <h1 class="card-title best-selling-name">${mostPopular.name}</h1>
        <img src="${mostPopular.image}" alt="" class="img-fluid best-selling-img">
        <p class="card-subtitle">Enhanced Acoustic Tones</p>
        <p class="card-text text-muted best-selling-description">${mostPopular.description}</p>
        <div class="d-flex justify-content-between align-items-center px-4 pt-2">
          <p class="fw-bold m-0">£${formatCurrency(mostPopular.price)}</p>
          <a href="guitar.html" class="btn btn-sm btn-style">VIEW</a>
        </div>
      </div>
    </div>
  </div>  

  <div class="col-10 col-lg-4 col-xl-0 col-xxl-2 p-lg-3">
    <div class="card border-1">
      <div class="card-body text-center">
        <h1 class="card-title best-selling-name">${productTwo.name}</h1>
        <img src="${productTwo.image}" alt="" class="img-fluid best-selling-img">
        <p class="card-subtitle">Superior Tone and Durability</p>
        <p class="card-text text-muted d-none d-lg-block best-selling-description">${productTwo.description}</p>
        <div class="d-flex justify-content-between align-items-center px-4 pt-2">
          <p class="fw-bold m-0 ${productTwo.price}"></p>
          <a href="guitar.html" class="btn btn-sm btn-style">VIEW</a>
        </div>
      </div>
    </div>
  </div> 
  `;


