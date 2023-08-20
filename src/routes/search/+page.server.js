// import { getAllProducts } from '$utils/shopify';
import { getAllProducts } from '$utils/medusa';
import { error } from '@sveltejs/kit';

export async function load() {
  const res = await getAllProducts();

  if (res.response.status === 200) {
    const allProducts = res.products;

    if (allProducts) {
      return {
        body: { allProducts }
      };
    }

    throw error(404)
  }  else {
    throw error(res.response.status)
  }
}