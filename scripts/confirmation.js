import { totalFee, isStandard, isNextDay, standardDeliveryFee, nextDayDeliveryFee, fromStandardDay, toStandardDay, nextDay, userInfo, clearInfo, isStandardDelivery, currentYear  } from "./delivery.js";
import { formatCurrency } from "./utilities.js";
import { cart, productList, clearCart } from "./cart.js";

const firstName = document.querySelector('.js-confirmation-name');
const referenceNumber = document.querySelector('.js-ref-number');
const totalPrice = document.querySelector('.js-total-price');
const address = document.querySelector('.js-address');
const postcode = document.querySelector('.js-postcode');
const deliveryMethod = document.querySelector('.js-delivery-method');
const deliveryDate = document.querySelector('.js-delivery-date');
const orderSummaryHTML = document.querySelector('.js-order-summary');
const confirmationMenuButtons = document.querySelectorAll('.js-confirmation-menu-button');
const loaderFullScreen = document.querySelector('.loader-fullscreen');

let orderSummary = '';

if (cart.length === 0 || Object.keys(userInfo).length === 0) {  
  location.href = './index.html';
}

firstName.innerHTML = userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1);
referenceNumber.innerHTML = userInfo.reference;
address.innerHTML = userInfo.address;
postcode.innerHTML = userInfo.postcode.toUpperCase();


if (isStandard) {
  totalPrice.innerHTML = `£${formatCurrency(totalFee + standardDeliveryFee)}`;
  deliveryMethod.innerHTML = 'Standard Delivery'
  deliveryDate.innerHTML = `${fromStandardDay} - ${toStandardDay} ${currentYear}`;
} else if (isNextDay){
  totalPrice.innerHTML = `£${formatCurrency(totalFee + nextDayDeliveryFee)}`;
  deliveryMethod.innerHTML = 'Next Day Delivery'
  deliveryDate.innerHTML = `${nextDay} ${currentYear}`;
}

cart.forEach((item) => {

  const id = item.id; 

  let matchingProduct; 

  productList.forEach((product) => {
    if (product.id === id) {
      matchingProduct = product
    }
  })

  orderSummary += `
  <div class="row order-summary-container">
    <div class="col-4 col-md-2 d-flex justify-content-center align-items-center">
      <img src="${matchingProduct.image}" class="img-fluid small-image">
    </div> 
    <div class="col-8 col-md-10 ps-4 d-flex flex-column justify-content-around
    gap-2">
      <p><span class="confirmation-heading-text">Order Name:</span> ${matchingProduct.color} ${matchingProduct.name}</p>
      <p><span class="confirmation-heading-text">Quantity:</span> ${item.quantity}</p>
      <p><span class="confirmation-heading-text">Price:</span> £${formatCurrency(matchingProduct.price)}</p>
    </div>
  </div>
  `;

  orderSummaryHTML.innerHTML = orderSummary;
})


confirmationMenuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    loaderFullScreen.style.display = 'flex';
      loaderFullScreen.addEventListener('animationend', () => {
        clearInfo();
        clearCart();
        isStandardDelivery();
        loaderFullScreen.style.display = 'none';
        location.href = './index.html';
      })
  })
})








