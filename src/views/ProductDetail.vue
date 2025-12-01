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
export default {
  name: "ProductList",
  data() {
    return {
      filter: "All",
      // Data Produk Dummy yang disesuaikan untuk tampilan Product List
      productsData: [
        {
          id: 1,
          name: "Centaurus M200",
          price: 899000,
          image: "/img/vape-centaurus.jpg",
          category: "Device",
          ratingCount: 39,
        },
        {
          id: 2,
          name: "Liquid Sop Buah",
          price: 129000,
          image: "/img/liquid-sopbuah.jpg",
          category: "Liquid",
          ratingCount: 23,
        },
        {
          id: 3,
          name: "Hexom V3",
          price: 2999000,
          image: "/img/vape-hexom.jpg",
          category: "Device",
          ratingCount: 21,
        },
        {
          id: 4,
          name: "Cotton Bacon",
          price: 59000,
          image: "/img/accessories-cotton.jpg",
          category: "Accesories",
          ratingCount: 13,
        },
        {
          id: 5,
          name: "Liquid Melon Milk",
          price: 135000,
          image: "/img/liquid-melon.jpg",
          category: "Liquid",
          ratingCount: 45,
        },
        {
          id: 6,
          name: "Pod System X1",
          price: 350000,
          image: "/img/vape-pod.jpg",
          category: "Device",
          ratingCount: 18,
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.filter === "All") {
        return this.productsData;
      }
      return this.productsData.filter((p) => p.category === this.filter);
    },
  },
};
</script>
