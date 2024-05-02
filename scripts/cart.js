import { guitarList } from '../data/guitar-data.js'
import { keyboardList } from '../data/keyboard-data.js';
import { drumsList } from '../data/drums-data.js';
import { accessoriesList } from '../data/accessories-data.js';

export let productList = guitarList.concat(keyboardList, drumsList, accessoriesList);

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id){
  let existingItem; 

    cart.forEach((item) => {
      if (id === item.id){
        existingItem = item;
      }
    });

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      cart.push({
        id: id,
        quantity: 1
      });
    }

    saveCart();
}

export function removeFromCart(id){
  const newCart = [];

  cart.forEach((item) => {
    if (item.id !== id) {
      newCart.push(item);
    }
  });

  cart = newCart; 

  saveCart();
}

export function editItemQuantity(id, newValue) {
  let existingItem;

  cart.forEach((item) => {
    if (item.id === id) {
      existingItem = item; 
    }
  })

  existingItem.quantity = Number(newValue.value);

  saveCart();

}

export function clearCart() {
  cart = [];
  saveCart();
} 