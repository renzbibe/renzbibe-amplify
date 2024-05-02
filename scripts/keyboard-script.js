import {cart, addToCart} from './cart.js';
import { keyboardList } from '../data/keyboard-data.js';
import { displayProducts } from './products.js';
import { tickAnimation } from './buttons.js';

const keyBoardDisplayHTML = document.querySelector('.js-keyboard-list');
const displayCartQuantity = document.querySelector('.js-cart-quantity');
const buttonName = 'js-add-keyboard';
const productName = 'keyboard'
const productList = document.querySelector('.products-list');

displayProducts(keyboardList, keyBoardDisplayHTML, buttonName, productName);
updateCart();

const addToCartKeyboard = document.querySelectorAll('.js-add-keyboard');
addToCartKeyboard.forEach((button) => {
  button.addEventListener('click', () => {
    const keyboardId = button.dataset.keyboardId;
    addToCart(keyboardId);
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