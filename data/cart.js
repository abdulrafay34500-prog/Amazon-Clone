 export const cart =[];

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