

export let cart;

function assemblingCart() {
    cart = JSON.parse(localStorage.getItem('Cart'))||[]
   
   return cart
}
 assemblingCart()


  SavingInLocalStorage()
  export function SavingInLocalStorage() {
    localStorage.setItem('Cart',JSON.stringify(cart))
 }
/////////////////////////////////
 
 export function addingToCart (productId ,qquantity){

    

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
            DeliveryOptionID : 1,
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
 //////////////////////////////////////
export function updatingCheckout() {
    let Quantity =0;

    cart.forEach((item)=>{
       Quantity+=item.quantity
    })
    let itemORitems='';

    if(Quantity === 0 ){
      itemORitems=''
    }else if(Quantity === 1){
       itemORitems ='item'
    }else if(Quantity >= 1 ){
       itemORitems= 'items'
    }

    document.querySelector('.js-return-to-home-link')
    .innerHTML=`${Quantity} ${itemORitems} `
    
 }
 /////////////////////////////////////

 export function updatingItemQuantity (productId , newQuantity){
    let matchingITems;

    cart.forEach((item)=>{
 
        if(productId===item.productId){
          matchingITems =item
        }
    })
    matchingITems.quantity=newQuantity

    document.querySelector(`.js-quantity-label-${productId}`)
    .innerHTML=newQuantity

    
     SavingInLocalStorage()
 }
 /////////////////////////////////////
 export function  SelectingOption(productId ,selectedOption){
   let matchingItems='';
      
      cart.forEach((item)=>{
         if(item.productId ===productId){
            matchingItems = item;
         }
         
      })
      matchingItems.DeliveryOptionID = selectedOption;
      
      
      SavingInLocalStorage();
 }

 /////////////////////////////////////////

 export function emptyingcart() {
    let emptyCart =[]
       cart =emptyCart

       SavingInLocalStorage()
 }