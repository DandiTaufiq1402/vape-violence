<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="py-20 lg:py-32 text-center border-b border-cyan-800/50">
      <div class="max-w-4xl mx-auto px-4">
        <p
          class="text-cyan-400 uppercase tracking-[.4em] text-sm mb-3 font-mono"
        >
          #FUTUREVAPOR
        </p>
        <h1
          class="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight"
        >
          Temukan <span class="text-cyan-500">Vaping Gear</span> Generasi Baru
        </h1>
        <p class="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Eksplorasi koleksi Mod, Liquid, & Aksesori dengan teknologi V-Core
          terkini. Tingkatkan pengalaman vaping Anda ke level maksimal.
        </p>
        <a
          href="#latest-products"
          class="inline-block px-10 py-3 bg-cyan-500 text-gray-900 font-bold uppercase rounded-full shadow-xl shadow-cyan-500/30 hover:bg-cyan-400 transition duration-300 transform hover:scale-105"
        >
          Lihat Koleksi
        </a>
      </div>
    </header>

    <section id="latest-products" class="py-16 md:py-24 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-12 text-cyan-400">
          Drop Terbaru (New Arrivals)
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="p in products"
            :key="p.id"
            class="bg-gray-800 p-6 rounded-2xl shadow-xl transition duration-500 hover:shadow-cyan-500/40 hover:scale-[1.02] border border-gray-700/50"
          >
            <div
              class="h-48 overflow-hidden rounded-xl mb-4 border border-cyan-500/20"
            >
              <img
                :src="p.image_url"
                :alt="p.name"
                class="w-full h-full object-cover transform hover:scale-110 transition duration-500"
              />
            </div>

            <h3 class="font-bold text-xl mt-2 truncate text-white">
              {{ p.name }}
            </h3>
            <p class="text-cyan-400 font-extrabold text-lg mb-4">
              Rp {{ p.price }}
            </p>

            <router-link
              :to="`/product/${p.id}`"
              class="block mt-4 bg-cyan-600 text-gray-900 text-center py-3 rounded-xl font-semibold hover:bg-cyan-700 transition duration-300"
            >
              Lihat Spesifikasi
            </router-link>
          </div>
        </div>

        <div
          v-if="products.length === 0"
          class="text-center py-10 text-gray-400"
        >
          Mengakses database produk...
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-900 border-t border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-10 text-white">
          Teknologi Inti Kami
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div
            class="p-8 rounded-xl bg-gray-800 border-b-4 border-cyan-500/70 hover:bg-gray-700/50 transition"
          >
            <svg
              class="w-12 h-12 text-cyan-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            <h4 class="font-semibold text-xl mb-2 text-cyan-200">
              Chipset V-Core A.I.
            </h4>
            <p class="text-gray-400">
              Performa stabil, respons cepat 0.001 detik, dan manajemen daya
              yang cerdas.
            </p>
          </div>

          <div
            class="p-8 rounded-xl bg-gray-800 border-b-4 border-cyan-500/70 hover:bg-gray-700/50 transition"
          >
            <svg
              class="w-12 h-12 text-cyan-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h4 class="font-semibold text-xl mb-2 text-cyan-200">
              Liquid Zero Leak
            </h4>
            <p class="text-gray-400">
              Struktur cartridge revolusioner mencegah kebocoran, menjaga
              kebersihan dan rasa liquid.
            </p>
          </div>

          <div
            class="p-8 rounded-xl bg-gray-800 border-b-4 border-cyan-500/70 hover:bg-gray-700/50 transition"
          >
            <svg
              class="w-12 h-12 text-cyan-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <h4 class="font-semibold text-xl mb-2 text-cyan-200">
              Ultra-Charge 3.0
            </h4>
            <p class="text-gray-400">
              Isi daya penuh hanya dalam 30 menit. Lebih banyak *vaping*, lebih
              sedikit menunggu.
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-800 border-t border-cyan-800/50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400 mb-2 font-mono">
          VAPE VIOLENCE &copy; 2077 | The Future of Flavor.
        </p>
        <div class="space-x-4 text-sm">
          <router-link
            to="/about"
            class="text-gray-500 hover:text-cyan-500 transition"
            >Tentang Kami</router-link
          >
          <router-link
            to="/privacy"
            class="text-gray-500 hover:text-cyan-500 transition"
            >Kebijakan Garansi</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-500 hover:text-cyan-500 transition"
            >Hubungi Kami</router-link
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";

const products = ref([]);

onMounted(async () => {
  console.log("Fetching products...");
  // Menambahkan limit atau sorting untuk kesan "Terbaru"
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false }) // Urutkan dari yang terbaru
    .limit(6); // Tampilkan hanya 6 produk terbaru

  if (error) {
    console.error("Error fetching products:", error);
  } else {
    products.value = data;
    console.log("Products loaded:", data.length);
  }
});
</script>

<style scoped>
/* Anda bisa menambahkan CSS khusus di sini jika diperlukan */
/* Misalnya, untuk efek neon glow yang lebih kuat */
</style>
