import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {orders} from '../data/orders.js'
import {products , fetchinhProducts} from '../data/products.js';

fetchinhProducts().then (()=>{
 settingOrderPage()
})
 let produc=orders[0].products
console.log(orders)
settingOrderPage()

function settingOrderPage() {
        

    let HTML='';
    let productt='';
   

    let TodayDate =dayjs().format('MMMM DD')

    produc.forEach((product)=>{

        let totalOrderPrise =0
        let orderIdd='';

        orders.forEach((order)=>{
             totalOrderPrise+=order.totalCostCents
             orderIdd=order.id
        })
        

    let orderId =product.productId
    let quantity = product.quantity

    let deliveryTime= product.estimatedDeliveryTime
    let time = new Date(deliveryTime)
    const formatted = time.toLocaleDateString('en-US', {
    month: 'long',   
    day: 'numeric',
    hour12: true     
    });




        products.forEach((Product)=>{
             if(orderId==Product.id){
                 productt=Product
             }
              
             
              
        })
      
           
    HTML+=`<div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${TodayDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(totalOrderPrise /100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderIdd}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${productt.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productt.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatted}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
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
        </div>`
    
    })

    document.querySelector('.js-order-grid')
    .innerHTML=HTML;

}
