// import { getProduct, getAllProducts } from '$utils/shopify';
import { getProductByHandle, getProductsByTag } from '$utils/medusa';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const resOne = await getProductByHandle(params.handle);
  const resTwo = await getProductsByTag("featured");
  if (resOne.response.status === 200 && resTwo.response.status === 200) {
    const product = resOne.products[0]
    const featuredProducts = resTwo.products;

    if (product) {
      return {
        pageData: {
          product,
          featuredProducts,
        }
      };
    }

    throw error(404)
  } else {
    let status = resOne.response.status !== 200 ? resOne.response.status : resTwo.response.status
    throw error(status)
  }
}
