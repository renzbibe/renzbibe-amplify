import {cart, addToCart} from './cart.js';
import { drumsList } from '../data/drums-data.js';
import { displayProducts } from './products.js';
import { tickAnimation } from './buttons.js';

const drumsDisplayHTML = document.querySelector('.js-drums-list');
const displayCartQuantity = document.querySelector('.js-cart-quantity');
const buttonName = 'js-add-drums';
const productName = 'drums';
const productList = document.querySelector('.products-list');

displayProducts(drumsList, drumsDisplayHTML, buttonName, productName);
updateCart();

const addToCartDrums = document.querySelectorAll('.js-add-drums');
addToCartDrums.forEach((button) => {
  button.addEventListener('click', () => {
    const drumsId = button.dataset.drumsId;
    addToCart(drumsId);
    updateCart();
  });
});

function updateCart(){
  let cartQuantity = 0; 

    cart.forEach((product) => {
      cartQuantity += product.quantity;
    });

    displayCartQuantity.innerHTML = cartQuantity;
}

tickAnimation(buttonName);