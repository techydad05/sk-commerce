{#if $lineItems.length > 0}
<div class="relative">
  {#if JSON.stringify($lineItems) !== $origCartStr}
    <div
      on:click={() => updateLineItems()}
      class="btn btn-sm btn-warning absolute left-0 top-4 w-1/2"
    >
      Update
    </div>
  {/if}
  <div
    class:rideCart={showMenu}
    on:click={() => (dumpCart = !dumpCart)}
    class="btn btn-link"
  >
    <div class:rotate={dumpCart} class:unrotate={!dumpCart}>
      <Icons type="shopping-cart" />
    </div>
  </div>
</div>
<div class:open={dumpCart} class="cartdiv h-0 overflow-hidden overflow-y-scroll">
  <div class="btn btn-primary btn-success my-4 w-full">
    <a href="/checkout" class="no-underline">Checkout</a>
  </div>
  <h2 class="text-center text-xl">
    Cart Subtotal: {cartTotal}
  </h2>
  {#each $lineItems as item, i}
    <div
      class="grid-rows-[2, minmax(auto, 1fr)] relative mb-1 grid border-2 border-white p-1"
    >
      <div class="grid grid-cols-2">
        <div><img class="h-[100px]" src={item.thumbnail} alt="" /></div>
        <div class="relative">
          <div class="btn btn-sm btn-warning absolute right-0 top-0 rounded-none">
            X
          </div>
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
</div>
{/if}