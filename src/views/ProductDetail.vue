/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/ProductDetail.vue
*/

<template>
  <div class="p-6 max-w-7xl mx-auto bg-black text-white min-h-screen">
    <h1 class="text-3xl font-extrabold text-center mb-8 text-yellow-500">
      Our Products
    </h1>

    <div class="flex justify-center space-x-4 mb-10">
      <button
        @click="filter = 'All'"
        :class="
          filter === 'All' ? 'bg-white text-black' : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        All
      </button>
      <button
        @click="filter = 'Device'"
        :class="
          filter === 'Device' ? 'bg-white text-black' : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        Device
      </button>
      <button
        @click="filter = 'Liquid'"
        :class="
          filter === 'Liquid' ? 'bg-white text-black' : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        Liquid
      </button>
      <button
        @click="filter = 'Accesories'"
        :class="
          filter === 'Accesories'
            ? 'bg-white text-black'
            : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        Accesories
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="p in filteredProducts"
        :key="p.id"
        class="uiverse-card mx-auto"
      >
        <div class="uiverse-blob"></div>
        <div class="uiverse-bg p-4 flex flex-col">
          <img
            :src="p.image"
            :alt="p.name"
            class="w-full h-32 object-cover rounded-md border-b border-gray-700 mb-3"
          />

          <h2 class="text-xl font-bold mb-1 text-cyan-400 truncate">
            {{ p.name }}
          </h2>
          <div class="flex items-center text-sm text-yellow-500 mb-2">
            <span>⭐⭐⭐⭐⭐ ({{ p.ratingCount }})</span>
          </div>
          <p class="text-2xl font-extrabold text-yellow-500 mb-4">
            Rp {{ p.price.toLocaleString("id-ID") }}
          </p>

          <button
            @click="addToCart(p)"
            class="w-full bg-gray-800 text-white border border-gray-700 py-2 rounded-lg font-semibold mb-2 hover:bg-gray-700 transition"
          >
            Tambah Produk
          </button>
          <button
            class="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 space-x-3">
      <div class="w-3 h-3 bg-white rounded-full"></div>
      <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
    </div>

    <div
      class="mt-12 pt-4 border-t border-gray-700 text-center bg-gray-900 p-4 rounded-lg"
    >
      <div class="text-lg font-bold text-white mb-1">
        <span class="mr-2">🚚</span> Gratis Ongkir untuk pembelian di atas Rp
        999.000
      </div>
      <p class="text-gray-400 text-sm">Berlaku di seluruh daerah Jabodetabek</p>
    </div>
  </div>
</template>

<script>
import { supabase } from "../lib/supabase"; // sesuaikan path kalau beda

export default {
  name: "ProductList",
  data() {
    return {
      filter: "All",
      productsData: [], // dari supabase
    };
  },

  async mounted() {
    await this.loadProducts();
  },

  methods: {
    async loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Gagal mengambil produk:", error.message);
        return;
      }

      // Sesuaikan field agar cocok dengan UI kamu
      this.productsData = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image_url, // ← Ambil dari Supabase Storage
        category: p.category || "Device", // pastikan punya kolom category
        ratingCount: p.rating || 0, // kalau mau
      }));
    },

    addToCart(product) {
      const cartString = localStorage.getItem("user_cart");
      let cart = cartString ? JSON.parse(cartString) : [];

      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        });
      }

      localStorage.setItem("user_cart", JSON.stringify(cart));
      alert(`${product.name} telah ditambahkan ke keranjang!`);
    },
  },

  computed: {
    filteredProducts() {
      if (this.filter === "All") return this.productsData;
      return this.productsData.filter((p) => p.category === this.filter);
    },
  },
};
</script>
