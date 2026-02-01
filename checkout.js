import { cart , deletingItems ,
   updatingItemQuantity ,updatingCheckout ,SelectingOption }
 from "../data/cart.js"
import {products ,GettingProductInfo , fetchinhProducts} from "../data/products.js"
import {DeliveryOptions , matchingDeliveryOPtion} from "./data/deliveryoptions.js"
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {updatingPriseSummary} from './priseSummary.js'
import './data/cart-oop.js'


fetchinhProducts().then(()=>{
      updatingPriseSummary()
    renderDeliverySummary()
})



function renderDeliverySummary() {
  


let checkOutCartHTML='';

cart.forEach((item)=>{

    let itemInCart=GettingProductInfo(item);

   

        let itemId =item.DeliveryOptionID;
        

        let matchingOptionn =matchingDeliveryOPtion(item);
 
        
    let today =dayjs().add(matchingOptionn.Days,'days').format('dddd ,MMMM DD')
   
    checkOutCartHTML += `<div class="cart-item-container
     js-cart-item-container-${itemInCart.id}">
      <div class="delivery-date">
        Delivery date: ${today}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${itemInCart.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${itemInCart.name}
          </div>
          <div class="product-price">
            $${(itemInCart.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span class="quantity-in-checkout">
              Quantity: <span class="quantity-label
               js-quantity-label-${itemInCart.id}"
              >${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary
            js-update-button"
            data-product-id = "${itemInCart.id}">
              Update
            </span>

            <input type="text" class="Input-quantity
            Input-new-quantity-${itemInCart.id}">
            <p class="link-primary saving-input-quantity
            js-saving-Button"
            data-product-id = "${itemInCart.id}"
            >Save</p>


            <span class="delete-quantity-link link-primary
            js-delete-quantity-link"
            data-product-id = "${itemInCart.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options js-delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          
          ${SelectDeliveryOption(itemInCart.id ,item)}
          
        </div>
      </div>
    </div>`




})

document.querySelector('.js-order-summary')
.innerHTML= checkOutCartHTML;
///////////////////////////
function SelectDeliveryOption(itemInCartID ,item) {
    let HTML='';
    let today =dayjs().add(0,'days').format('dddd ,MMMM DD')
    
    DeliveryOptions.forEach((option)=>{

      let today =dayjs().add(option.Days,'days').format('dddd ,MMMM DD')

      let ShippingFee =option.priseCents=== 0
      ? 'Free'
      :`$${(option.priseCents)/100} -`
      
      const isChecked = option.DeliveryId==item.DeliveryOptionID;
     

      HTML+=`<div class="delivery-option js-delivery-option"
      data-product-id="${itemInCartID}"
      data-selected-option="${option.DeliveryId}"
      >
            <input ${isChecked ?'checked':''} type="radio" 
            ${isChecked ?'checked':''}
            class="delivery-option-input"
              name="delivery-option-${itemInCartID}"
              }>
            <div>
              <div class="delivery-option-date">
                ${today}
              </div>
              <div class="delivery-option-price">
                ${ShippingFee} Shipping
              </div>
            </div>
          </div>`

    })
    
    return HTML;
    
}
//////////////////////////
document.querySelectorAll('.js-delivery-option')
.forEach((option)=>{
     
      option.addEventListener('click',(()=>{

        let {productId , selectedOption} = option.dataset;
        
        SelectingOption(productId ,selectedOption);
        renderDeliverySummary();
        updatingPriseSummary();
        
      }))
});

//////////////////////////
updatingCheckout()
///////////////////////////

document.querySelectorAll('.js-delete-quantity-link')
.forEach((DeleteBtn)=>{
    DeleteBtn.addEventListener('click',(()=>{

      let productId = DeleteBtn.dataset.productId
        deletingItems(productId);
        
        let container = document.querySelector
        (`.js-cart-item-container-${productId}`)

        
        updatingCheckout();
        renderDeliverySummary();
        updatingPriseSummary();
        
    }))
})
///////////////////////////
document.querySelectorAll('.js-update-button')
  .forEach((updateButton)=>{
    
      updateButton.addEventListener('click',(()=>{
        
        let productId = updateButton.dataset.productId

        let containor = document.querySelector
        (`.js-cart-item-container-${productId}`);

        containor.classList.add('Visible')
        

        

      }))
})
////////////////////////////
document.querySelectorAll('.js-saving-Button')
  .forEach((SaveButton)=>{
    
    SaveButton.addEventListener('click',(()=>{
      
      let productId = SaveButton.dataset.productId;

      let containor = document.querySelector
      (`.js-cart-item-container-${productId}`);

      containor.classList.remove('Visible');

      let enteredQuantity = document.querySelector
      (`.Input-new-quantity-${productId}`);

      let newQuantity =Number(enteredQuantity.value);

      updatingItemQuantity (productId , newQuantity);
      updatingCheckout();
      updatingPriseSummary();

    
    }))
})
}
///////////////////////////////////


