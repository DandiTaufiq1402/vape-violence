<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="py-20 lg:py-32 text-center">
      <div class="max-w-4xl mx-auto px-4">
        <p class="text-blue-400 uppercase tracking-widest text-sm mb-3">
          #InovasiTanpaBatas
        </p>
        <h1
          class="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight"
        >
          Temukan <span class="text-blue-500">Koleksi Digital</span> Terbaik
        </h1>
        <p class="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Dari kreasi seni digital hingga teknologi mutakhir. Kami hadirkan
          produk premium yang akan menginspirasi hari Anda.
        </p>
        <a
          href="#latest-products"
          class="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Jelajahi Sekarang
        </a>
      </div>
    </header>

    <section id="latest-products" class="py-16 md:py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-12">
          Produk Terbaru Kami
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="p in products"
            :key="p.id"
            class="bg-gray-900 p-6 rounded-3xl shadow-2xl transition duration-500 hover:shadow-blue-500/30 hover:scale-[1.02]"
          >
            <div class="h-48 overflow-hidden rounded-xl mb-4">
              <img
                :src="p.image_url"
                :alt="p.name"
                class="w-full h-full object-cover transform hover:scale-110 transition duration-500"
              />
            </div>

            <h3 class="font-bold text-xl mt-2 truncate">{{ p.name }}</h3>
            <p class="text-blue-400 font-bold text-lg mb-4">Rp {{ p.price }}</p>

            <router-link
              :to="`/product/${p.id}`"
              class="block mt-4 bg-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              Lihat Detail
            </router-link>
          </div>
        </div>

        <div
          v-if="products.length === 0"
          class="text-center py-10 text-gray-400"
        >
          Memuat produk atau data tidak ditemukan...
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-10">
          Mengapa Memilih Kami?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div class="p-6 rounded-xl bg-gray-800 border border-blue-600/50">
            <svg
              class="w-12 h-12 text-blue-400 mx-auto mb-4"
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
            <h4 class="font-semibold text-xl mb-2">Kualitas Premium</h4>
            <p class="text-gray-400">
              Semua produk kami telah dikurasi dengan standar kualitas
              tertinggi.
            </p>
          </div>

          <div class="p-6 rounded-xl bg-gray-800 border border-blue-600/50">
            <svg
              class="w-12 h-12 text-blue-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.045 4.148 2.059 7.935 5.087 10.064a13.013 13.013 0 004.97 1.341c2.14 0 4.14-.523 5.923-1.468A12.001 12.001 0 0021.056 12a12.001 12.001 0 00-.814-7.972z"
              ></path>
            </svg>
            <h4 class="font-semibold text-xl mb-2">Keamanan Terjamin</h4>
            <p class="text-gray-400">
              Transaksi aman dan data pribadi Anda selalu kami jaga
              kerahasiaannya.
            </p>
          </div>

          <div class="p-6 rounded-xl bg-gray-800 border border-blue-600/50">
            <svg
              class="w-12 h-12 text-blue-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <h4 class="font-semibold text-xl mb-2">Dukungan Lokal</h4>
            <p class="text-gray-400">
              Tim dukungan pelanggan siap membantu Anda 24/7 dengan ramah.
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-800 border-t border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400 mb-2">
          &copy; 2025 Koleksi Digital. Hak Cipta Dilindungi.
        </p>
        <div class="space-x-4 text-sm">
          <router-link
            to="/about"
            class="text-gray-500 hover:text-blue-500 transition"
            >Tentang Kami</router-link
          >
          <router-link
            to="/privacy"
            class="text-gray-500 hover:text-blue-500 transition"
            >Kebijakan Privasi</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-500 hover:text-blue-500 transition"
            >Kontak</router-link
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// Pastikan path ke supabase sudah benar di proyek Anda
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
/* Misalnya, untuk efek hover yang lebih kompleks yang tidak bisa dicapai hanya dengan Tailwind */
</style>
