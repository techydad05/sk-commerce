// import { lineItems } from '$lib/store.js';
import { browser } from '$app/environment';
import { getCollections } from '$utils/medusa.js';
export async function load({ fetch }) {
    if (browser) {
        const lineItems = localStorage.getItem('lineitems') || [];
        const response = await fetch('/medusacart.json', { method: 'POST', body: JSON.stringify(lineItems) });
        const responseData = await response.json();
        console.log("response:", responseData);
        await getCollections().then(res => {
            responseData.collections = res.collections;
        });
        return responseData;
    } 
}