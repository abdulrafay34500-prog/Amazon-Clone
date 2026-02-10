
import {products } from './products.js';
import {cart} from './cart.js';

export const orders =JSON.parse(localStorage.getItem('order'))||[]

export function backendOrders(orderr) {
    orders.unshift(orderr)
    savingLocalStorage()
}

function savingLocalStorage() {
    localStorage.setItem('order' ,JSON.stringify(orders))
}

 
function EmptyOrderArray() {
    let empty = [];
    orders =empty;

    savingLocalStorage()
}

