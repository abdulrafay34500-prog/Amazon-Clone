export function GettingProductInfo(item) {
      let itemInCart='';

    products.forEach((product)=>{
        if(item.productId === product.id){
            itemInCart = product
        }

    })
    return itemInCart;
  
}

class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails){

      this.id=productDetails.id
      this.image=productDetails.image
      this.name=productDetails.name
      this.rating=productDetails.rating
      this.priceCents=productDetails.priceCents
    }

    getratingURl(){
      return `images/ratings/rating-${this.rating.stars*10}.png`
    }

    settingPrice(){
      return `${(this.priceCents / 100).toFixed(2)}`
    }

    generatingExtraHTML(){
    return ``
   }

}

class ClothingProduct extends Product{
  
  sizeChart;

  constructor(productDetails){
    super(productDetails)
    this.sizeChart=productDetails.sizeChartLink
  }

  generatingExtraHTML(){
    return `
    <a href="${this.sizeChart}" target="_blank">
    Size Link
    </a>
    `
  }


}

export function fetchinhProducts(){
  let promise =fetch('https://supersimplebackend.dev/products').then((resolve)=>{
         return resolve.json()
  }).then((fetchedProducts)=>{
       products=fetchedProducts.map((productDetail)=>{
            if(productDetail.type==="clothing"){
            return new ClothingProduct(productDetail);
            }
            return new Product(productDetail)
          });
  })

  return promise;
}


fetchinhProducts()





export let products =[]
/*
export function GettingInfoFromBackend(funn){

    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load' ,(()=>{
      
      products =(JSON.parse(xhr.response)).map((productDetail)=>{
            if(productDetail.type==="clothing"){
            return new ClothingProduct(productDetail);
            }
            return new Product(productDetail)
          });

          if( typeof funn ==='function'){
              funn()
          }
          
          

    }))

    xhr.open('GET' ,'https://supersimplebackend.dev/products')

    xhr.send()

}

GettingInfoFromBackend()
*/