export function matchingDeliveryOPtion(cartItems) {
    
    let matchingOption =''
    DeliveryOptions.forEach((option)=>{

            if (option.DeliveryId ==cartItems.DeliveryOptionID){
                  matchingOption =option
            }
            
        });

        return matchingOption;
}

export const DeliveryOptions=[{
    DeliveryId : 1,
    Days : 7,
    priseCents:0,
},{
    DeliveryId : 2,
    Days : 3,
    priseCents:499,
},{
    DeliveryId : 3,
    Days : 1,
    priseCents:999,
}]