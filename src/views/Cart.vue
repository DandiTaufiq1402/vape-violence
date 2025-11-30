<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Keranjang Belanja</h1>

    <div v-if="items.length">
      <div
        v-for="item in items"
        :key="item.id"
        class="border p-4 rounded mb-3 flex justify-between"
      >
        <span>{{ item.name }} (x{{ item.qty }})</span>
        <strong>Rp {{ item.price * item.qty }}</strong>
      </div>

      <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Checkout
      </button>
    </div>

    <div v-else class="text-gray-600">Keranjang kosong.</div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      items: [
        { id: 1, name: "Produk 1", qty: 2, price: 100000 },
        { id: 2, name: "Produk 2", qty: 1, price: 150000 },
      ],
    };
  },
};
</script>
