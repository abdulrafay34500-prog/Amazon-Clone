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
              src="images/ratings/rating-${products.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${products.priceCents / 10}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-name="${products.name}";
          >
            Add to Cart
          </button>
        </div>`
        
             
})
document.querySelector('.js-product-container')
.innerHTML = productHTml;

document.querySelectorAll('.button-primary')
.forEach((addButton)=>{
  addButton.addEventListener('click',()=>{

    let productName = addButton.dataset.productName;
   let Matchingitem;
    
   cart.forEach((item)=>{

      if(productName ===item.productName){
         Matchingitem = item
       }
   })

    if(Matchingitem){
      Matchingitem.quantity+=1
    }else{
      cart.push({
        productName : productName,
        quantity : 1,
      })
    }

    let quantityy = 0;

    cart.forEach((item)=>{
      Number(quantityy += item.quantity)
    })
    
    document.querySelector('.js-cart-quantity')
    .innerHTML = quantityy 

  console.log(cart)

  })
})
