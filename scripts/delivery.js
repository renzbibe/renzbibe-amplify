import { cart, productList } from "./cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatDate, formatDateInYYYY } from "./utilities.js";

export let isStandard = JSON.parse(localStorage.getItem('standard'));
export let isNextDay = JSON.parse(localStorage.getItem('next'));

export let nextDay = formatDate(dayjs().add(1, 'days')); 
export let fromStandardDay = formatDate(dayjs().add(3, 'days')); 
export let toStandardDay = formatDate(dayjs().add(5, 'days'));

export const currentYear = formatDateInYYYY(dayjs());
export const standardDeliveryFee = 499; 
export const nextDayDeliveryFee = 799; 
export let totalFee = 0;
export let isDifferentAddress = false; 
export let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

export function addInfo(name, ref, address, postcode){
  userInfo = {
    name: name, 
    reference: ref,
    address: address, 
    postcode: postcode, 
  }; 

  saveInfo();
}

export function clearInfo() {
  userInfo = {};
  saveInfo();
}

function saveInfo() {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

cart.forEach((item) => {
  const id = item.id; 

  let matchingProduct; 

  productList.forEach((product) => {
    if (product.id === id) {
      matchingProduct = product;
    }
  })

  calculateTotalFee(matchingProduct.price, item.quantity);
})

function calculateTotalFee(price, quantity) {
  totalFee += price * quantity;
}

if (isStandard === null) {
  isStandard = true; 
}

export function isStandardDelivery() {
  isStandard = true; 
  isNextDay = false; 
  localStorage.setItem('standard', JSON.stringify(isStandard)); 
  localStorage.setItem('next', JSON.stringify(isNextDay)); 
}

export function isNextDayDelivery() {
  isStandard = false; 
  isNextDay = true; 
  localStorage.setItem('standard', JSON.stringify(isStandard)); 
  localStorage.setItem('next', JSON.stringify(isNextDay)); 
}

export function changeDeliveryAddress() {
  isDifferentAddress === false ? isDifferentAddress = true: isDifferentAddress = false;
}
 