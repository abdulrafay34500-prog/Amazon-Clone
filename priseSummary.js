import {cart} from './data/cart.js'
import {products} from './data/products.js'
import {DeliveryOptions} from './data/deliveryoptions.js'

let PriseSummaryHTML='';
export function updatingPriseSummary() {

    
    
    let matchingItem;
    let matchingOption;
    let cartPrice=0;
    let shippingFEE =0;
    let lotalBeforeTax =0;
    let TaxAmount =0;
    let TotalCost=0;

    cart.forEach((cartItems)=>{

        products.forEach((product)=>{

           if(cartItems.productId ==product.id){
            matchingItem=product
            }
           
        });

        DeliveryOptions.forEach((option)=>{

            if (option.DeliveryId ==cartItems.DeliveryOptionID){
                  matchingOption =option
            }
            
        });
  
        
         cartPrice += cartItems.quantity* matchingItem.priceCents; 
         shippingFEE+=matchingOption.priseCents;
         lotalBeforeTax+=cartPrice+shippingFEE;
         TaxAmount +=lotalBeforeTax*0.1;
         TotalCost+=lotalBeforeTax+TaxAmount

        
    })
   
             PriseSummaryHTML=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`
         
          
document.querySelector('.js-payment-summary')
.innerHTML= PriseSummaryHTML;    
    
}
