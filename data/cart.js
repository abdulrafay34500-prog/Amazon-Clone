

export let cart =  JSON.parse(localStorage.getItem('Cart')) || [];

 SavingInLocalStorage()
  function SavingInLocalStorage() {
    localStorage.setItem('Cart',JSON.stringify(cart))
 }
/////////////////////////////////
 
 export function addingToCart (productId){

    let selectedQuntity = document.querySelector
        (`.js-quantity-selectorr-${productId}`);

        let qquantity = Number(selectedQuntity.value);
        

        let Matchingitem;
        
        cart.forEach((item)=>{

            if(productId ===item.productId){
            Matchingitem = item
            }
        })

        if(Matchingitem){
            Matchingitem.quantity+= qquantity
        }else{
            cart.push({
            productId : productId,
            quantity : qquantity,
            })
        }
      SavingInLocalStorage()   
 }
 /////////////////////////////////////

export function deletingItems (productId){
   let newCart = []

    cart.forEach((item)=>{
         if(item.productId !== productId){
            newCart.push(item)
         }
    })

    cart = newCart;
    SavingInLocalStorage()
 }