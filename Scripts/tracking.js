import {products , fetchinhProducts} from '../data/products.js';



fetchinhProducts().then(()=>{
generatingHtml()
})


function generatingHtml() {
 
    let url =new URL(window.location.href)
     let orderId =url.searchParams.get('orderId')

     let urll =new URL(window.location.href)
     let deliveryday =urll.searchParams.get('deliveryDay')
    let item;

    products.forEach((product)=>{
       if(orderId ==product.id){
         item=product;
       }
    })

    console.log(deliveryday)
    
let Html =` <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryday}
        </div>

        <div class="product-info">
          ${item.name}
        </div>

        <div class="product-info">
          Quantity: 1
        </div>

        <img class="product-image" src="${item.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;




document.querySelector('.js-order-tracking')
.innerHTML=Html

}