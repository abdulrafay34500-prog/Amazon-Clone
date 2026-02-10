import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {orders} from '../data/orders.js'
import {products , fetchinhProducts} from '../data/products.js';

fetchinhProducts().then (()=>{
 settingOrderPage()
})

console.log(orders)



function settingOrderPage() {
  let pageHTML = '';

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format('MMMM DD');
    const totalPrice = (order.totalCostCents / 100).toFixed(2);

    // ORDER HEADER
    pageHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalPrice}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
    `;

    // PRODUCTS FOR THIS ORDER ONLY
    order.products.forEach((orderProduct) => {
      const product = products.find(p => p.id === orderProduct.productId);

      const deliveryDate = new Date(orderProduct.estimatedDeliveryTime)
        .toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        });

      pageHTML += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-delivery-date">
              Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${orderProduct.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });

    pageHTML += `</div>`; // close order-container
  });

  document.querySelector('.js-orders-grid').innerHTML = pageHTML;
}
