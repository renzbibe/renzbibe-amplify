import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatDateInYY } from './utilities.js';
import { addInfo, isDifferentAddress, changeDeliveryAddress } from './delivery.js';

const currentYear = formatDateInYY(dayjs());
const futureYear = formatDateInYY(dayjs().add(5, 'years'));
const referenceNumber = 'AMP' + ("" + Math.random()).substring(2, 9);

const form = document.querySelector('.js-checkout-form');
// let isDifferentAddress = false; 
let inputList; 

// BILLING DETAILS
const email = document.querySelector('.js-email');
const firstName = document.querySelector('.js-first-name');
const lastName = document.querySelector('.js-last-name');
const addressOne = document.querySelector('.js-address-one');
const addressTwo = document.querySelector('.js-address-two');
const postcode = document.querySelector('.js-postcode');
const county = document.querySelector('.js-county');

// DELIVERY DETAILS
const deliveryFirstName = document.querySelector('.js-delivery-first-name');
const deliveryLastName = document.querySelector('.js-delivery-last-name');
const deliveryAddressOne = document.querySelector('.js-delivery-address-one');
const deliveryPostcode = document.querySelector('.js-delivery-postcode');
const deliveryCounty = document.querySelector('.js-delivery-county');

// PAYMENT DETAILS
const cardNumber = document.querySelector('.js-card-number');
const expiryMonth = document.querySelector('.js-expiry-month');
const expiryYear = document.querySelector('.js-expiry-year');
const securityNumber = document.querySelector('.js-security-number');
const cardName = document.querySelector('.js-card-name');

// ALL INPUTS EXCEPT DELIVERY DETAILS
// const inputs = document.querySelectorAll('.js-email, .js-first-name, .js-last-name, .js-address-one, .js-postcode, .js-county, .js-card-number, .js-expiry-month, .js-expiry-year, .js-security-number, .js-card-name')

const alertNotification = document.querySelector('.js-alert-notification');
const loaderFullScreen = document.querySelector('.loader-fullscreen');
const deliveryButton = document.querySelector('.js-delivery-address-button');

// REGEX
const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const numberValidation = /^[\d]+$/;
const numberWithDashValidation = /^[\d-]+$/;
const cardNumberValidation = /(\d{4}-?)(\d{4}-?)(\d{4}-?)(\d{4})/;
const wordValidation = /^(?!^\s)[a-zA-Z\s]+$/;
const postCodeValidation = /^(([A-Z][A-HJ-Y]?\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/i;
const contactNumberValidation = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
const betweenFourDigits = /(\d{4})(\d{4})(\d{4})(\d{4})/g;
const lastCharacter = /.$/;
const whiteSpaceBefore = /^\s+/; 
const whiteSpaceAfter = /\s+$/;

export const inputsArray = [
  {
    name: email, 
    condition: function() {
      return !emailValidation.test(this.name.value)
    }
  }, 
  {
    name: firstName, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  },
  {
    name: lastName, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  }, 
  {
    name: addressOne, 
    condition: function() {
      return this.name.value.length <= 0; 
    }
  }, 
  {
    name: postcode, 
    condition: function() {
      return !postCodeValidation.test(this.name.value); 
    }
  }, 
  {
    name: county, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  }, 
  {
    name: cardNumber, 
    condition: function() {
      return !cardNumberValidation.test(this.name.value) || this.name.value.length < 16; 
    }
  },
  {
    name: expiryMonth, 
    condition: function() {
      return !numberValidation.test(this.name.value) || this.name.value <= 0 || this.name.value > 12 || this.name.value === '00' || this.name.value.length < 1; 
    }
  }, 
  {
    name: expiryYear, 
    condition: function() {
      return this.name.value < currentYear || this.name.value > futureYear;
    }
  }, 
  {
    name: securityNumber, 
    condition: function() {
      return !numberValidation.test(this.name.value) || this.name.value.length < 3;
    }
  }, 
  {
    name: cardName, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  },
];

const deliveryInputsArray = [
  {
    name: deliveryFirstName, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  }, 
  {
    name: deliveryLastName, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  }, 
  {
    name: deliveryAddressOne, 
    condition: function() {
      return this.name.value.length <= 0; 
    }
  }, 
  {
    name: deliveryPostcode, 
    condition: function() {
      return !postCodeValidation.test(this.name.value); 
    }
  }, 
  {
    name: deliveryCounty, 
    condition: function() {
      return !wordValidation.test(this.name.value); 
    }
  }
];

const combinedArrays = inputsArray.concat(deliveryInputsArray);

inputList = inputsArray;

inputValidation(inputList);

// EVENT LISTENERS
deliveryButton.addEventListener('click', () => {
  changeDeliveryAddress();
  
  if (isDifferentAddress) {
    inputList = combinedArrays;
  } else {
    inputList = inputsArray; 

    deliveryInputsArray.forEach((input) => {
      input.name.classList.remove('is-invalid');
    })
  }

  inputValidation(inputList);
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let inputValidations = [];

  inputList.forEach((input) => {
    inputValidations.push(input.condition());
  }) 
  
  if (inputValidations.every(areAllValid)){

    if (isDifferentAddress) {
      addInfo(deliveryFirstName.value, referenceNumber, deliveryAddressOne.value, deliveryPostcode.value);
    } else {
      addInfo(firstName.value, referenceNumber, addressOne.value, postcode.value);
    }
    
    loaderFullScreen.style.display = 'flex';
    loaderFullScreen.addEventListener('animationend', () => {
      loaderFullScreen.style.display = 'none';
      location.href = './confirmation.html';
      this.submit();
    })

  } else {
    inputList.forEach((input) => {
      if (input.condition()){
        invalidData(input.name);
      }
    })
    alertNotification.style.display = 'block';
    location.href = '#';
  }

})


// FUNCTIONS
function invalidData(element){
  element.classList.add('is-invalid');
  element.classList.remove('is-valid');
}

function validData(element){
  element.classList.add('is-valid');   
  element.classList.remove('is-invalid');   
}

function areAllValid(result) {
  return result === false; 
}

function inputValidation(inputList) {

  inputList.forEach((input) => {
    input.name.addEventListener('focusout', () => {
      input.name.value = input.name.value.replace(whiteSpaceBefore, '');
      input.name.value = input.name.value.replace(whiteSpaceAfter, '');

      if (input.condition()) {
        invalidData(input.name);
      } else {
        validData(input.name);
  
        if (input.name === cardNumber) {
          input.name.value = input.name.value.replace(betweenFourDigits, '$1-$2-$3-$4');
        }
  
        if (input.name === expiryMonth) {
          if (expiryMonth.value.length === 1) {
            expiryMonth.value = expiryMonth.value.replace(lastCharacter,'0$&')
          }
        }
      }

    })
    
    if (input.name === cardNumber) {
      input.name.addEventListener('keypress', () => {
        // REGEX FOR INSERTING A CHARACTER AFTER FOUR CHARACTERS
        const regex = /(\d{4})$/g;
  
        if (input.name.value.length < 19) {
          if (regex.test(input.name.value)) {
            input.name.value = input.name.value + '-';
          }
        }
       
       }) 
  
       input.name.addEventListener('input', () => {
        if (!numberWithDashValidation.test(input.name.value)) {
          input.name.value = input.name.value.replace(lastCharacter, '');
        }
       })
     }
  
    input.name.addEventListener('focusin', () => {
      if (input.name.classList.contains('is-invalid')) {
        input.name.addEventListener('input', () => {
          if (input.condition()) {
            invalidData(input.name);
          } else {
            validData(input.name);
          }
        })
      }
    })
  })

}