class Cart {
  cart;
  localStorage;

  constructor(localStorageKey) {

    

    this.localStorage = localStorageKey

    this.makingCart();
    this.SavingInLocalStorage();
    
  }

  makingCart() {
    this.cart = JSON.parse(localStorage.getItem(this.localStorage));

    if (!this.cart) {
      this.cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: 2
      }];
    }
  }

  SavingInLocalStorage() {
    localStorage.setItem(this.localStorage, JSON.stringify(this.cart));
  }

  addingToCart(productId) {
    
    let matchingItem;

    this.cart.forEach(item => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cart.push({
        productId,
        quantity : 1,
        deliveryOptionId: 2
      });
    }

    this.SavingInLocalStorage();
  }

  deletingItems(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.SavingInLocalStorage();
  }

  updatingCheckout() {
    let quantity = 0;

    this.cart.forEach(item => {
      quantity += item.quantity;
    });

    let label = quantity === 1 ? 'item' : 'items';

    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${quantity} ${label}`;
  }

  updatingItemQuantity(productId, newQuantity) {
    let matchingItem;

    this.cart.forEach(item => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (!matchingItem) return;

    matchingItem.quantity = newQuantity;

    document.querySelector(`.js-quantity-label-${productId}`)
      .innerHTML = newQuantity;

    this.SavingInLocalStorage();
  }

  SelectingOption(productId, selectedOption) {
    let matchingItem;

    this.cart.forEach(item => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (!matchingItem) return;

    matchingItem.deliveryOptionId = selectedOption;
    this.SavingInLocalStorage();
  }
  
}

const cartt = new Cart('cart-normal');
const buisnessCart = new Cart('buisness-cart');





