import { cart ,addingToCart } from "../data/cart.js";
import {products , fetchinhProducts} from "../data/products.js";


 Promise.all([
 fetchinhProducts()
 ]).then(()=>{
   renderAmazonMain()
 })

function renderAmazonMain(){

  let productHTml ='';

  products.forEach((products)=>{
  productHTml+= `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${products.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${products.getratingURl()}>
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${products.settingPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selectorr-${products.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${products.generatingExtraHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${products.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary"
            data-product-id="${products.id}";
            >
              Add to Cart
            </button>
          </div>`
          
              
  })
  document.querySelector('.js-product-container')
  .innerHTML = productHTml;

  ///////////////////////////

  function addedFunction (productId){
              
      let added = document.querySelector(`.js-added-to-cart-${productId}`)

      added.classList.add("afterAdded");

      let id =setTimeout(()=>{
        
        added.classList.remove("afterAdded")
      },2000)

  }

  function cartQuantity () {
      let quantityy = 0;

      cart.forEach((item)=>{
        Number(quantityy += item.quantity)
      })
      
      document.querySelector('.js-cart-quantity')
      .innerHTML = quantityy 

  }

  //////////////////////////
  cartQuantity ()
  document.querySelectorAll('.button-primary')
  .forEach((addButton)=>{
    
        addButton.addEventListener('click',()=>{

          let productId = addButton.dataset.productId;

          
          let selectedQuntity = document.querySelector
          (`.js-quantity-selectorr-${productId}`);

          let qquantity = Number(selectedQuntity.value);
          
               
        addingToCart(productId , qquantity);
        addedFunction(productId);
        cartQuantity ();
        
        })

  })


}  