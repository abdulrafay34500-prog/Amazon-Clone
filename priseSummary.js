import {cart , emptyingcart} from './data/cart.js'
import {products , GettingProductInfo , fetchinhProducts} from './data/products.js'
import {DeliveryOptions , matchingDeliveryOPtion} from './data/deliveryoptions.js'
import {backendOrders , orders} from './data/orders.js'
import {renderDeliverySummary} from './checkout.js'

fetchinhProducts()
.then(()=>{
      updatingPriseSummary()
    renderDeliverySummary()
})


let PriseSummaryHTML='';
export function updatingPriseSummary() {

    
    let cartQuantity=0;
    
    
    let cartPrice=0;
    let shippingFEE =0;
    let lotalBeforeTax =0;
    let TaxAmount =0;
    let TotalCost=0;

    cart.forEach((cartItems)=>{

      cartQuantity+=cartItems.quantity

        let matchingItem=GettingProductInfo(cartItems);

        let matchingOption= matchingDeliveryOPtion(cartItems);
  
        
         cartPrice += cartItems.quantity* matchingItem.priceCents; 
         shippingFEE+=matchingOption.priseCents;
         lotalBeforeTax=cartPrice+shippingFEE;
         TaxAmount =lotalBeforeTax*0.1;
         TotalCost=lotalBeforeTax+TaxAmount

        
    })
   
             PriseSummaryHTML=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${cartPrice /100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingFEE/100}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${lotalBeforeTax/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(TaxAmount)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(TotalCost /100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-button-primary">
            Place your order
          </button>`
         
          
document.querySelector('.js-payment-summary')
.innerHTML= PriseSummaryHTML;    
    

  document.querySelector('.js-button-primary')
 .addEventListener('click',async()=>{

    if(cart.length !== 0){

              let responce = await fetch('https://supersimplebackend.dev/orders' ,{
                method :'POST',
                headers :{
                  'Content-Type' : 'application/json'
                },
                body :JSON.stringify({
                  cart : cart
                })
            });

            let order = await responce.json()
            backendOrders(order)

            console.log(orders)

            window.location.href ='orders.html';
          
            emptyingcart()
            
        }
  })


}
