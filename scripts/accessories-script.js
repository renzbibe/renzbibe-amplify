import {cart, addToCart} from './cart.js';
import { accessoriesList } from '../data/accessories-data.js';
import { displayProducts } from './products.js';
import { tickAnimation } from './buttons.js';

const accessoriesDisplayHTML = document.querySelector('.js-accessories-list'); 
const displayCartQuantity = document.querySelector('.js-cart-quantity');
const buttonName = 'js-add-accessories';
const productName = 'accessories'

displayProducts(accessoriesList, accessoriesDisplayHTML, buttonName, productName);
updateCart();

const addToCartAccessories = document.querySelectorAll('.js-add-accessories');
addToCartAccessories.forEach((button) => {
  button.addEventListener('click', () => {
    const accessoriesId = button.dataset.accessoriesId;
    addToCart(accessoriesId);
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