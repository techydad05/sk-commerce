// import { createCart, addToCart, updateCart } from '../../utils/shopify.js';
import { createMedusaCart } from '$utils/medusa.js';
import { error } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";


import Medusa from "@medusajs/medusa-js";
let baseUrl = "http://192.168.1.42:9002";
const medusa = new Medusa({ baseUrl: baseUrl, maxRetries: 3 });

// export async function GET() {
//     throw redirect(303, '/');
// }

export async function POST({ request }) {
  const req = await request.json();
  const cart = await createMedusaCart();
  console.log("cart:", cart);
  console.log("request:", req);
  return new Response(JSON.stringify({ cart }));
}

export async function PUT({ request }) {
  // const body = await request.json();
  // const response = await updateCart(body);

  // if(response.status === 200) {
  //   return new Response({data: response.body.data});
  // } else {
  //   throw error(response.status)
  // }

}

export async function PATCH({ request }) {
  // const body = await request.json();
  // const response = await addToCart(body);
  // if(response.status === 200) {
  //   return new Response({data: response.body.data});
  // } else {
  //   throw error(response.status)
  // }

}
