import { formatCurrency } from "./utilities.js";

export function displayProducts(productList, htmlDisplay, buttonName, productName){
  let htmlProduct = '';
  productList.forEach((product) => {
    htmlProduct  += `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
          <div class="card border-1">
            <div class="card-body text-center product-container">
              <h1 class="card-title h4 product-name d-flex justify-content-center align-items-center">${product.brand} ${product.name}</h1>
              <img src="${product.image}" alt="" class="img-fluid product-image">
              <p class="card-text text-muted product-description">${product.description}</p>
              <div class="d-flex justify-content-between align-items-center px-1 px-lg-4">
                <p class="fw-bold m-0">£${formatCurrency(product.price)}</p>
                <a class="btn btn-sm btn-style ${buttonName}" data-${productName}-id="${product.id}">BUY</a>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  htmlDisplay.innerHTML = htmlProduct;
}
