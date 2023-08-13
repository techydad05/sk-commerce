// import { lineItems } from '$lib/store.js';
import { browser } from '$app/environment';
import { getCollections } from '$utils/medusa.js';
export async function load({ fetch }) {
    if (browser) {
        const cartID = localStorage.getItem('cartID');
        const response = await fetch('/medusacart.json', { method: 'POST', body: JSON.stringify(cartID) });
        const responseData = await response.json();
        console.log("response:", responseData);
        localStorage.setItem('cartID', responseData.cart.id);
        return responseData;
    } 
}