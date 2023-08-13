<script>
  // import Header from '$components/Header.svelte';
  // import ShoppingCart from '$components/ShoppingCart.svelte';
  // import { createCart } from '$utils/shopify';
  import '../app.css';
  import MedusaHeader from '$components/MedusaHeader.svelte';
  import Footer from '$components/Footer.svelte';
  import { getCartItems } from '../store';
  import { onMount } from 'svelte';
  import { createMedusaCart } from '$utils/medusa';
  import { lineItems } from '$lib/store';

  let cartId;
  let checkoutUrl;
  let cartCreatedAt;
  let cartItems = [];

  export let data;
  const collections = data.collections;

  let theme = null;

  onMount(async () => {
    theme = localStorage.getItem('theme');

    if (typeof window !== 'undefined') {
      let localLineItems = JSON.parse(localStorage.getItem('lineitems'));
      if (localLineItems) {
        lineItems.set(localLineItems);
        console.log('local lineitems found lineitems set!', $lineItems);
      } else {
        console.log('no local lineitems');
      }
    }

    // if (typeof window !== 'undefined') {
      // cartId = JSON.parse(localStorage.getItem('cartId'));
      // cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      // checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));
      // let currentDate = Date.now();
      // let difference = currentDate - cartCreatedAt;
      // let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      // let cartIdExpired = totalDays > 6;
      // if (cartId === 'undefined' || cartId === 'null' || cartIdExpired) {
      //   await callCreateCart();
      // }
      // await loadCart();
      // document.addEventListener('keydown', (e) => {
      //   let keyCode = e.keyCode;
      //   if (keyCode === 27) {
      //     showCart = false;
      //   }
      // });
    // }
  });

  async function loadCart() {
    const res = await getCartItems();
    cartItems = res?.body?.data?.cart?.lines?.edges;
  }

  let showCart = false;
  let loading = false;

  async function openCart() {
    await loadCart();
    showCart = true;
  }
  function hideCart() {
    showCart = false;
  }

  function getCheckoutUrl() {
    window.open(checkoutUrl, '_blank');
    loading = false;
  }

  async function addToCart(event) {
    await fetch('/cart.json', {
      method: 'PATCH',
      body: JSON.stringify({ cartId: cartId, variantId: event.detail.body })
    });
    // Wait for the API to finish before updating cart items
    await loadCart();
    loading = false;
  }

  async function removeProduct(event) {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
    }
    await fetch('/cart.json', {
      method: 'PUT',
      body: JSON.stringify({
        cartId,
        lineId: event.detail.body.lineId,
        quantity: event.detail.body.quantity,
        variantId: event.detail.body.variantId
      })
    });
    await loadCart();
    loading = false;
  }
</script>

<main
  data-theme={theme ?? 'dark'}
  class={`${showCart ? 'h-screen' : 'min-h-screen'} overflow-hidden text-white`}
>
  <!-- {#if showCart}
    <ShoppingCart
      items={cartItems}
      on:click={hideCart}
      on:removeProduct={removeProduct}
      on:addProduct={addToCart}
      on:getCheckoutUrl={getCheckoutUrl}
      bind:loading
    />
  {/if} -->
  <MedusaHeader menuItems={collections} bind:new_theme={theme} />
  <!-- <Header on:openCart={openCart} /> -->
  <div class="min-h-screen overflow-scroll pt-[88px]">
    <slot />
    <Footer />
  </div>
</main>
