import {cart, removeFromCart, editItemQuantity, productList} from './cart.js';
import { formatCurrency } from './utilities.js';
import { isStandardDelivery, isNextDayDelivery, nextDay, fromStandardDay, toStandardDay, isStandard, isNextDay, standardDeliveryFee, nextDayDeliveryFee } from './delivery.js';

const cartContainer = document.querySelector('.js-orders');
const checkoutContainer = document.querySelector('.js-basket-container');
const emptyCartPage = document.querySelector('.js-empty-basket-page');
const cartQuantityDisplay = document.querySelector('.js-cart-quantity');

const standardOption = document.getElementById('js-standard-delivery');
const nextDayOption = document.getElementById('js-next-day-delivery');
const standardDate = document.querySelector('.js-standard-date');
const nextDate = document.querySelector('.js-next-date');

const standardPriceHTML = document.querySelector('.js-standard-price');
const nextDayPriceHTML = document.querySelector('.js-next-day-price');

const basketButton = document.querySelectorAll('.js-basket-payment-button');
const basketPrice = document.querySelector('.js-basket-price');
const totalPrice = document.querySelector('.js-total-price');
const quantityRegex = /^[1-9][0-9]?/;
const loader = document.querySelector('.loader');
const loaderFullScreen = document.querySelector('.loader-fullscreen');

let cartHTML = '';
let cartTotalPrice = 0; 

standardDate.innerHTML = `(${fromStandardDay}-${toStandardDay})`;
nextDate.innerHTML = `(${nextDay})`; 

standardPriceHTML.innerHTML = `£${formatCurrency(standardDeliveryFee)}`;
nextDayPriceHTML.innerHTML = `£${formatCurrency(nextDayDeliveryFee)}`;

updateCartQuantity();

standardOption.checked = isStandard; 
nextDayOption.checked = isNextDay;

cart.forEach((item) => {
  const id = item.id;

  let matchingProduct; 

  productList.forEach((product) => {
    if (product.id === id){
      matchingProduct = product;
    }
  });

  cartHTML += `
  <div class="row text-center py-2 js-cart-order-${matchingProduct.id}">

    <div class="col-7 text-start d-flex flex-column-reverse flex-sm-row gap-3 px-sm-0">
      <div class="order-image-container d-none d-sm-block">
        <img src="${matchingProduct.image}" alt="" class="img-fluid p-3">
      </div>
      <div class="d-none d-sm-flex flex-column justify-content-center gap-2">
        <p class="table-info"><span class="fw-bold">Model Name:</span> <span>${matchingProduct.name}</span></p>
        <p class="table-info"><span class="fw-bold">Colour:</span> <span>${matchingProduct.color}</span></p>
        <p class="table-info"><span class="fw-bold">Brand:</span> <span>${matchingProduct.brand}</span></p>
      </div>
      
    </div>

    <div class="col-2 d-none d-sm-block">
      <p class="table-info">
        <span class="js-update-quantity-input-${matchingProduct.id}">
          <span class="bold-text">
            ${item.quantity}
          </span>
          <button class="update-quantity-button js-update-quantity-button" data-button-id="${matchingProduct.id}">
            EDIT
          </button>
        </span>
      </p>
    </div>
    <div class="col-2 d-none d-sm-block">
      <p class="table-info">£${formatCurrency(matchingProduct.price)}</p>
    </div>
    <div class="col d-none d-sm-block">
      <a class="btn p-1 table-info js-remove-button" data-product-id="${matchingProduct.id}"><i class="fa fa-remove"></i></a>
    </div>

    <div class="col-12 d-flex d-sm-none justify-content-between px-4 pt-2">
      <p class="table-info fw-bold">${matchingProduct.color} ${matchingProduct.name}, ${matchingProduct.brand}</p>
      <p class="table-info js-remove-button" data-product-id="${matchingProduct.id}"><i class="fa fa-remove"></i></p>
    </div>
    <div class="col-12 d-flex d-sm-none justify-content-between px-4 mt-2">
      <img src="${matchingProduct.image}" alt="" class="img-fluid small-image">
      <div class="d-flex flex-column justify-content-center gap-3 text-end">
        <p class="table-info">
          <span class="js-update-quantity-input-${matchingProduct.id}">
            <button class="me-1 me-sm-0 update-quantity-button js-update-quantity-button" data-button-id="${matchingProduct.id}">
              Edit
            </button>
            <span class="bold-text">
              <span class="fw-bold">Quantity: </span>${item.quantity}
            </span>
          </span>
        </p>
        <p class="table-info"><span class="fw-bold">Price:</span> <span>£${formatCurrency(matchingProduct.price)}</span></p>
      </div>
    </div>
  </div>
  `;

  cartTotalPrice += (matchingProduct.price * item.quantity);
  updateCartQuantity();

  cartContainer.innerHTML = cartHTML;
  displayPrice(cartTotalPrice);
});

if (cart.length === 0){
  emptyCartPage.style.display = 'flex';
  checkoutContainer.style.display = 'none';
} else {
  emptyCartPage.style.display = 'none';
  checkoutContainer.style.display = 'flex';
}

const removeButton = document.querySelectorAll('.js-remove-button'); 

removeButton.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.productId; 

    let cartItem = '';
    cart.forEach((item) => {
      if(item.id === id){
        cartItem = item;  
      }
    });

    let currentProduct = '';
    productList.forEach((product) => {
      if (product.id === id) {
        currentProduct = product;
      }
    });

    const container = document.querySelector(`.js-cart-order-${id}`);
    
    removeFromCart(id);
    cartTotalPrice -= (currentProduct.price * cartItem.quantity);
    displayPrice(cartTotalPrice);   

    loader.style.display = 'flex';
    loader.addEventListener('animationend', () => {
      container.remove();
      
      updateCartQuantity();
      loader.style.display = 'none';

      if (cart.length === 0) {
        emptyCartPage.style.display = 'flex';
        checkoutContainer.style.display = 'none';
      } 
    });          
  })
});

const editButton = document.querySelectorAll('.js-update-quantity-button');

editButton.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonId = button.dataset.buttonId; 
    const inputId = document.querySelectorAll(`.js-update-quantity-input-${buttonId}`);

    inputId.forEach((input) => {
      let cartItem = '';
      cart.forEach((item) => {
        if(item.id === buttonId){
          cartItem = item;  
        }
      });

      input.innerHTML = `<input type="number" value="${cartItem.quantity}" class="text-center quantity-input js-quantity-input-${buttonId}" min="1" max="50"><span class="max-quantity"> / MAX AMOUNT: 50</span>`;
      const quantityInput = document.querySelectorAll(`.js-quantity-input-${buttonId}`);

      quantityInput.forEach((qInput) => {
        qInput.select();

        qInput.addEventListener('focusout', () => {
          loader.style.display = 'flex';
          if (Number(qInput.value) <= 0 || Number(qInput.value) > 50|| qInput.value === '' || !quantityRegex.test(qInput.value)){
            cart.forEach((item) => {
              if (item.id === buttonId) {
                loader.addEventListener('animationend', () => {
                location.reload();
                })
              }
            })
          } else {
            editItemQuantity(buttonId, qInput);
            loader.addEventListener('animationend', () => {
              location.reload();
            })
          }
        })

        qInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            loader.style.display = 'flex';
            if (Number(qInput.value) <= 0 || Number(qInput.value) > 50|| qInput.value === '' || !quantityRegex.test(qInput.value)){
              cart.forEach((item) => {
                if (item.id === buttonId) {
                  loader.addEventListener('animationend', () => {
                  location.reload();
                  })
                }
              })
            } else {
              editItemQuantity(buttonId, qInput);
              loader.addEventListener('animationend', () => {
                location.reload();
              })
            }
          }
        })
      })
    })
  })
})

function displayPrice(price){
  if (cart.length === 0 || cart.length === null){
    basketPrice.innerHTML = '£0';
    totalPrice.innerHTML = '£0';
    
  } else {
    if (isStandard) {
      basketPrice.innerHTML = `£${formatCurrency(price + standardDeliveryFee)}`;
      totalPrice.innerHTML = `£${formatCurrency(price + standardDeliveryFee)}`;
      standardOption.checked = isStandard; 
      nextDayOption.checked = isNextDay;
      isStandardDelivery();
  
    } else if (isNextDay) {
      basketPrice.innerHTML = `£${formatCurrency(price + nextDayDeliveryFee)}`;
      totalPrice.innerHTML = `£${formatCurrency(price + nextDayDeliveryFee)}`;
      standardOption.checked = isStandard; 
      nextDayOption.checked = isNextDay;
      isNextDayDelivery();
  
    }

  }

}

function updateCartQuantity() {
  let cartQuantity = 0; 

  cart.forEach((product) => {
    cartQuantity += product.quantity;
  });

  cartQuantityDisplay.innerHTML = cartQuantity;
}

standardOption.addEventListener('click', () => {
  basketPrice.innerHTML = `£${formatCurrency(cartTotalPrice + standardDeliveryFee)}`;
  totalPrice.innerHTML = `£${formatCurrency(cartTotalPrice + standardDeliveryFee)}`;
  isStandardDelivery();
})

nextDayOption.addEventListener('click', () => {
  basketPrice.innerHTML = `£${formatCurrency(cartTotalPrice + nextDayDeliveryFee)}`;
  totalPrice.innerHTML = `£${formatCurrency(cartTotalPrice + nextDayDeliveryFee)}`;
  isNextDayDelivery();
})

// checkOutButton.addEventListener('click', () => {
//   if (!standardOption.checked && !nextDayOption.checked) {
//     invalidDelivery.style.display = 'block';
//     shakeAnimation(invalidDelivery);
//   } else {
//     loader.style.display = 'flex';
//     loader.addEventListener('animationend', () => {
//       location.href = './payment.html';
//     })
//   }
// })

basketButton.forEach((button) => {
  button.addEventListener('click', () => {
    loaderFullScreen.style.display = 'flex';
    loaderFullScreen.addEventListener('animationend', () => {
      loaderFullScreen.style.display = 'none';
      location.href = './checkout.html';
    })
  })
})
 

