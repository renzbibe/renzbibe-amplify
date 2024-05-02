import { cart, productList } from "./cart.js";
import { totalFee, standardDeliveryFee, nextDayDeliveryFee, isStandard, isNextDay, userInfo } from "./delivery.js";
import { formatCurrency } from "./utilities.js";

const quantityHTML = document.querySelector('.js-checkout-quantity');
const summaryHTML = document.querySelector('.js-summary-orders');
const subTotalHTML = document.querySelector('.js-summary-subtotal');
const deliveryHTML = document.querySelector('.js-summary-delivery');
const totalHTML = document.querySelector('.js-summary-total');
const deliveryOptionHTML = document.querySelector('.js-delivery-option');

const editButton = document.querySelector('.js-checkout-edit-button')
const loaderFullScreen = document.querySelector('.loader-fullscreen');

let quantity = 0; 
let summary = '';

if (cart.length === 0) {  
  location.href = './index.html';
}

cart.forEach((item) => {
  quantity += item.quantity;

  const id = item.id; 

  let matchingProduct; 

  productList.forEach((product) => {
    if (product.id === id) {
      matchingProduct = product
    }
  })

  summary += `
  <div class="d-flex justify-content-between align-items-center py-3 ps-lg-4 gap-4">
    <div class="summary-image">
      <img src="${matchingProduct.image}" alt="" class="img-fluid">
    </div>
    <div class="d-flex flex-column gap-2 summary-information">
      <p class="fw-bold">£${formatCurrency(matchingProduct.price)}</p>
      <p>${matchingProduct.color}</p>
      <p>${matchingProduct.name}</p>
      <p>${matchingProduct.brand}</p>
      <p class="fw-bold">Quantity: ${item.quantity}</p>
    </div>
  </div>
  `;

  summaryHTML.innerHTML = summary; 
});

quantityHTML.innerHTML = `${quantity} ITEMS`;
subTotalHTML.innerHTML = `£${formatCurrency(totalFee)}`;

if (isStandard) {
  deliveryOptionHTML.innerHTML = 'Standard Delivery';
  deliveryHTML.innerHTML = `£${formatCurrency(standardDeliveryFee)}`;
  totalHTML.innerHTML = `£${formatCurrency(totalFee + standardDeliveryFee)}`;
} else if (isNextDay) {
  deliveryOptionHTML.innerHTML = 'Next Day Delivery';
  deliveryHTML.innerHTML = `£${formatCurrency(nextDayDeliveryFee)}`;
  totalHTML.innerHTML = `£${formatCurrency(totalFee + nextDayDeliveryFee)}`;
}

editButton.addEventListener('click', () => {
  loaderFullScreen.style.display = 'flex';
    loaderFullScreen.addEventListener('animationend', () => {
      loaderFullScreen.style.display = 'none';
      location.href = './basket.html';
    })
})
