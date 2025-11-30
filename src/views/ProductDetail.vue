<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Detail Produk</h1>

    <div v-if="product" class="mt-4 flex gap-6">
      <img :src="product.image" class="w-60 h-60 object-cover rounded" />
      <div>
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <p class="text-gray-700 mt-2">Rp {{ product.price }}</p>

        <button
          class="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          @click="addToCart"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
    };
  },
  created() {
    const id = this.$route.params.id;

    this.product = {
      id,
      name: "Produk " + id,
      price: 100000,
      image: "/img/sample.jpg",
    };
  },
  methods: {
    addToCart() {
      alert("Ditambahkan ke keranjang!");
    },
  },
};
</script>
