import { cart , deletingItems ,
   updatingItemQuantity ,updatingCheckout }
 from "../data/cart.js";
import {products} from "../data/products.js"

let checkOutCartHTML='';

cart.forEach((item)=>{

    let itemInCart='';

    products.forEach((product)=>{
        if(item.productId === product.id){
            itemInCart = product
        }

    })
   
    checkOutCartHTML += `<div class="cart-item-container
     js-cart-item-container-${itemInCart.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
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

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-2">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-2">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-2">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`




})

document.querySelector('.js-order-summary')
.innerHTML= checkOutCartHTML;
///////////////////////////
updatingCheckout()
///////////////////////////

document.querySelectorAll('.js-delete-quantity-link')
.forEach((DeleteBtn)=>{
    DeleteBtn.addEventListener('click',(()=>{

      let productId = DeleteBtn.dataset.productId
        deletingItems(productId);
        
        let container = document.querySelector
        (`.js-cart-item-container-${productId}`)

        container.remove();
        updatingCheckout();
        
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

    
    }))
})
///////////////////////////////////

