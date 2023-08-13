import { browser } from '$app/environment';
// import { lineItems } from '$lib/store.js';
export async function load({ fetch } ) {
    if(browser) {
      const lineItems = localStorage.getItem('lineitems') || [];
      const response = await fetch('/medusacart.json', { method: 'POST', body: JSON.stringify(lineItems)});
      const responseData = await response.json();
      console.log("response:", responseData);      
      return responseData;
    }

    return {};
}