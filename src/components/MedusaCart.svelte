<script>
  import { lineItems, origCartStr } from '$lib/store';
  import { browser } from '$app/environment';
  import { notifications } from '$utils/notifications';

  let cartTotal = 0;
  $: {
    if ($lineItems.length > 0) {
      cartTotal = ($lineItems.reduce((accumulator, item) => accumulator + item.subtotal * item.quantity, 0)/100).toFixed(2);
    } else {
      cartTotal = 0;
    }
  }

  // let origCartStr = '';
  if (browser) {
    origCartStr.set(localStorage.getItem('lineitems'));
  }

  // THIS CART STUFF NEEDS TO BE IN ITS OWN COMPONENTS WORK ON THAT!
  // ***** SET TOAST NOTIFICATIONS FOR ALL OF THE ADDING AND CHANGING ETC...
  // ALSO FOR UPDATING CART WITH ZERO TO JUST DELETE IT BUT WARN FIRST *****
  function updateCartQuantities(updateType, index, value) {
    value = Number.parseInt(value);
    if (updateType === 'dec') {
      if ($lineItems[index].quantity !== 0) {
        lineItems.update((v) => {
          v[index].quantity -= 1;
          return v;
        });
      }
    } else if (updateType === 'inc') {
      lineItems.update((v) => {
        v[index].quantity += 1;
        return v;
      });
    } else {
      if (value === 0) {
      } else {
        lineItems.update((v) => {
          v[index].quantity = value;
          return v;
        });
      }
    }
    notifications.success('Quantity updated!', 3000)
  }

  function testies() {
    console.log("wrking");
  }

  const updateLineItems = () => {
    localStorage.setItem('lineitems', JSON.stringify($lineItems));
    origCartStr.set(JSON.stringify($lineItems));
    console.log('Cart updated!');
    // notifications.success('Cart updated!', 3000)
    notifications.confirm('Confirm working!', 1000000000, () => console.log("this is working"))
  };
</script>

{#if $lineItems.length > 0}
  <div class="btn btn-primary btn-success my-4 w-full p-0">
    <a href="/checkout" class="no-underline flex w-full h-full items-center justify-center">Checkout</a>
  </div>
  <h2 class="text-center text-xl">
    Cart Subtotal: ${cartTotal}
  </h2>
  {#each $lineItems as item, i}
    <div
      class:mb-2={i === $lineItems.length - 1}
      class="grid-rows-[2, minmax(auto, 1fr)] relative mb-1 grid border-2 border-white p-1"
    >
      <div class="grid grid-cols-2">
        <div><img class="h-[100px]" src={item.thumbnail} alt="" /></div>
        <div class="relative">
          <div class="btn btn-sm btn-warning absolute right-0 top-0 rounded-none">X</div>
          <div class="absolute bottom-0">
            <p>Price: ${(item.subtotal / 100).toFixed(2)}</p>
            <p>Subtotal: ${((item.subtotal * item.quantity) / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div class="mt-1 h-12">
        <div class="grid w-full grid-cols-2">
          <div class="flex h-12 items-center justify-center bg-gray-200">
            <h1 class="text-primary w-[80%] overflow-hidden text-ellipsis">
              {item.title}
            </h1>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <div
              on:click={() => updateCartQuantities('dec', i)}
              class:btn-disabled={item.quantity === 0}
              class="btn btn-secondary rounded-none"
            >
              -
            </div>
            <input
              type="text"
              value={item.quantity}
              on:change={(e) => updateCartQuantities('input', i, e.target.value)}
              class="text-center"
            />
            <!-- WORK ON ADDING AN INVENTORY LIMIT FOR INCREMENTING ITEM QUANTITY -->
            <div
              on:click={() => updateCartQuantities('inc', i)}
              class="btn btn-secondary rounded-none"
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
  {#if JSON.stringify($lineItems) !== $origCartStr}
    <div on:click={() => updateLineItems()} class="btn btn-sm btn-warning sticky bottom-1 w-full">
      Update
    </div>
  {/if}
{:else}
  No Cart Yet!
{/if}
