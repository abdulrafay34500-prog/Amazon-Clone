 export const cart =[{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
     quantity : 2,
 }];

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
        
 }