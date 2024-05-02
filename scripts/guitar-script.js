import { cart, addToCart } from './cart.js';
import { guitarList } from '../data/guitar-data.js';
import { displayProducts } from './products.js';
import { tickAnimation } from './buttons.js';

const guitarDisplayHTML = document.querySelector('.js-guitar-list');
const displayCartQuantity = document.querySelector('.js-cart-quantity');
const buttonName = 'js-add-guitar';
const productName = 'guitar';

displayProducts(guitarList, guitarDisplayHTML, buttonName, productName);
updateCart();


const addToCartGuitar = document.querySelectorAll('.js-add-guitar');
addToCartGuitar.forEach((button) => {
  button.addEventListener('click', () => {
    const guitarId = button.dataset.guitarId;
    addToCart(guitarId);
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