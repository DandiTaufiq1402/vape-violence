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
        @click="filter = 1"
        :class="
          filter === 1 ? 'bg-white text-black' : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        Device
      </button>
      <button
        @click="filter = 2"
        :class="
          filter === 2 ? 'bg-white text-black' : 'bg-gray-800 text-white'
        "
        class="px-6 py-2 rounded-lg font-semibold transition border border-gray-700 hover:bg-gray-700"
      >
        Liquid
      </button>
      <button
        @click="filter = 3"
        :class="
          filter === 3 ? 'bg-white text-black' : 'bg-gray-800 text-white'
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
            <span v-if="p.avg_rating"
              >{{ "⭐".repeat(p.avg_rating) }} ({{ p.ratingCount }})</span
            >
            <span v-else>Belum ada ulasan</span>
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
          <router-link
            :to="`/product/detail/${p.id}`"
            class="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
          >
            Lihat Detail
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 space-x-3">
      <div class="w-3 h-3 bg-white rounded-full"></div>
      <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
    </div>

    <section class="mt-12">
        <h2 class="text-3xl font-bold text-center mb-8 text-cyan-400">
            Apa Kata Pelanggan?
        </h2>
        <div
          v-if="testimonials.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <div 
                v-for="t in testimonials.slice(0, 3)" 
                :key="t.id"
                class="bg-gray-800 p-5 rounded-xl border border-gray-700"
            >
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-white">{{ t.users?.full_name || 'Anonymous' }}</span>
                    <span class="text-yellow-400 font-bold text-sm">
                        {{ '⭐'.repeat(t.rating) }}
                    </span>
                </div>
                <p class="text-sm text-gray-400 italic line-clamp-3">
                    "{{ t.testimony_content }}"
                </p>
                <p class="text-xs text-gray-500 mt-2">({{ formatDate(t.created_at) }})</p>
            </div>
        </div>
        <div v-else class="text-center text-gray-500 py-10">
          Belum ada testimoni dari pelanggan.
        </div>
        <router-link
          to="/testimonials"
          class="block text-center mt-6 text-cyan-400 hover:text-cyan-300 font-semibold"
        >
            Lihat semua ulasan dan riwayat Anda...
        </router-link>
    </section>

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
import { supabase } from "../lib/supabase"; 

export default {
  name: "ProductList",
  data() {
    return {
      filter: "All",
      productsData: [],
      testimonials: [], // NEW: for displaying generic testimonials
    };
  },

  async mounted() {
    await this.loadProducts();
    await this.loadTestimonials(); 
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    async loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
            *,
            categories (name),
            testimonials(rating)
          `
        ) // Fetch category name and ratings
        .order("id", { ascending: true });

      if (error) {
        console.error("Gagal mengambil produk:", error.message);
        return;
      }

      // Process product data to calculate average rating
      this.productsData = data.map((p) => {
        const ratings = p.testimonials.map(t => t.rating);
        const ratingCount = ratings.length;
        const totalRating = ratings.reduce((sum, r) => sum + r, 0);
        const avg_rating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;
        
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image_url,
          category_id: p.category_id, 
          category_name: p.categories?.name || "N/A",
          ratingCount: ratingCount,
          avg_rating: avg_rating,
        };
      });
    },

    async loadTestimonials() {
       const { data, error } = await supabase
        .from("testimonials")
        .select(`
          *,
          users(full_name)
        `)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Gagal mengambil testimoni:", error.message);
        return;
      }

      this.testimonials = data || [];
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
      // Filter by category_id (numeric comparison now works)
      return this.productsData.filter((p) => p.category_id === this.filter);
    },
  },
};
</script>