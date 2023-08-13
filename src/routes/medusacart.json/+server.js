// import { createCart, addToCart, updateCart } from '../../utils/shopify.js';
import { createMedusaCart, getCollections } from '$utils/medusa.js';
import { error } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";
import Medusa from "@medusajs/medusa-js";
let baseUrl = "http://192.168.1.42:9002";
const medusa = new Medusa({ baseUrl: baseUrl, maxRetries: 3 });

export async function GET() {
    throw redirect(303, '/');
}

export async function POST({ request }) {
  // SETTING CART AND GETTING COLLECTIONS TO SET MENU IN HEADER
  const cartID = await request.json();
  const cart = await createMedusaCart(cartID);
  const collections = await getCollections();
  return new Response(JSON.stringify({ cart, collections }));
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
