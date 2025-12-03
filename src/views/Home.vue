/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/Home.vue
*/

<template>
  <div class="min-h-screen bg-black text-white">
    <header class="py-20 lg:py-32 border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div class="max-w-xl">
          <h1
            class="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            style="font-family: 'Georgia', serif"
          >
            DISCOVER SMOKE <br />
            VAPE EXPERIENCE
          </h1>
          <p class="text-lg text-gray-400 mb-8 max-w-md">
            Experience the thrill of premium vaping with the widest selection of
            globally renowned brands. Guaranteed quality, best prices, and
            professional service.
          </p>
          <div class="flex space-x-4">
            <a
              href="#latest-products"
              class="inline-block px-10 py-3 bg-white text-black font-bold uppercase rounded-xl hover:bg-gray-200 transition duration-300"
            >
              Belanja Sekarang
            </a>
            <router-link
              to="/product/1"
              class="inline-block px-10 py-3 border border-white text-white font-bold uppercase rounded-xl hover:bg-white hover:text-black transition duration-300"
            >
              Lihat Produk
            </router-link>
          </div>
        </div>

        <div class="hidden md:block w-96 h-96 relative">
          <img
            src="/vite.svg"
            alt="Vape Mod Black"
            class="absolute top-0 right-0 w-64 object-contain"
          />
          <img
            src="/vite.svg"
            alt="Vape Mod Beige"
            class="absolute bottom-0 left-0 w-64 object-contain"
          />
        </div>
      </div>
    </header>

    <section id="latest-products" class="py-16 md:py-24 bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-12 text-white">
          Latest Products
        </h2>

        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        >
          <div v-for="p in products" :key="p.id" class="uiverse-card">
            <div class="uiverse-blob"></div>
            <div class="uiverse-bg">
              <div
                class="h-40 overflow-hidden rounded-lg mb-4 border border-cyan-500/20"
              >
                <img
                  :src="p.image_url"
                  :alt="p.name"
                  class="w-full h-full object-cover transform transition duration-500"
                />
              </div>

              <span class="text-xs text-yellow-400 font-semibold mb-1">{{
                p.type
              }}</span>
              <h3 class="font-extrabold text-xl truncate text-cyan-200">
                {{ p.name }}
              </h3>
              <p class="text-cyan-400 font-extrabold text-lg mb-4">
                Rp {{ p.price.toLocaleString("id-ID") }}
              </p>

              <router-link
                :to="`/product/${p.id}`"
                class="block mt-auto bg-cyan-600 text-gray-900 text-center py-2 rounded-lg font-bold hover:bg-cyan-700 transition duration-300"
              >
                Lihat Spesifikasi
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-black border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-10">Testimonials</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            v-for="t in limitedTestimonials"
            :key="t.name"
            class="bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg"
          >
            <div class="flex items-center mb-3">
              <svg
                class="w-12 h-12 text-cyan-400 mr-4 border-2 border-cyan-500 rounded-full p-2 bg-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <div>
                <h3 class="font-bold text-lg text-white">{{ t.name }}</h3>
                <p class="text-sm text-yellow-500">{{ t.role }}</p>
              </div>
            </div>
            <p class="text-gray-400 text-sm italic line-clamp-3">
              "{{ t.testimony }}"
            </p>
          </div>
        </div>

        <h2 class="text-4xl font-bold text-center mb-10">Contact</h2>

        <div class="flex flex-wrap justify-center">
          <div
            class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl"
          >
            <form @submit.prevent="submitContact">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-400 mb-1"
                  >Nama</label
                >
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama anda"
                  class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-400 mb-1"
                  >No. Telp</label
                >
                <input
                  type="tel"
                  id="phone"
                  placeholder="Masukkan no telepon anda"
                  class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-400 mb-1"
                  >Deskripsi</label
                >
                <textarea
                  id="description"
                  rows="3"
                  placeholder="Masukkan deskripsi anda"
                  class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-black border-t border-gray-800 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="text-center mb-8">
          <p class="text-white text-lg font-bold">
            <span class="mr-2">🚚</span> Gratis Ongkir untuk pembelian di atas
            Rp 1.000.000
          </p>
          <p class="text-gray-400 text-sm">
            Berlaku di seluruh daerah Jabodetabek
          </p>
        </div>

        <div class="space-x-8 text-lg mb-4">
          <router-link to="/" class="text-gray-500 hover:text-white transition"
            >Home</router-link
          >
          <router-link
            to="/product/1"
            class="text-gray-500 hover:text-white transition"
            >Products</router-link
          >
          <router-link
            to="/contact"
            class="text-gray-500 hover:text-white transition"
            >Contact</router-link
          >
          <router-link
            to="/testimonials"
            class="text-gray-500 hover:text-white transition"
            >Testimonials</router-link
          >
        </div>

        <div class="space-x-4 text-xl mb-4">
          <a href="#" class="text-gray-500 hover:text-white transition">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-500 hover:text-white transition">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="text-gray-500 hover:text-white transition">
            <i class="fab fa-github"></i>
          </a>
        </div>

        <p class="text-gray-500 text-sm mt-4">
          &copy; Copyright 2025, All Rights Reserved by Dandi Taufiq.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../lib/supabase";

// TESTIMONIALS (tetap sama)
const DUMMY_TESTIMONIALS = [
  {
    name: "Dandi Taufiq",
    role: "Tester",
    testimony:
      "Rasa liquid Red Velvet ini *smooth* banget, cocok buat *vaping* harian.",
  },
  {
    name: "Felan Ardenta Yoga Adiyatama",
    role: "Tester",
    testimony:
      "Mod Centaurus Edisi Khusus ini desainnya keren parah! Chipsetnya responsif.",
  },
  {
    name: "Evan Alpha Edison",
    role: "Tester",
    testimony:
      "Cotton Bacon-nya memang beda, kapas menyerap liquid cepat dan bersih.",
  },
  {
    name: "Vargas Cahyadi",
    role: "Tester",
    testimony:
      "Liquid Salt Nic Mint Freeze ini dinginnya pas banget! Fresh dan smooth.",
  },
];

const limitedTestimonials = computed(() => DUMMY_TESTIMONIALS.slice(0, 3));

// DATA PRODUK DARI SUPABASE
const products = ref([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from("products")                // TABEL PRODUK KAMU
    .select("*")
    .order("created_at", { ascending: false }) // SORT NEWEST FIRST
    .limit(10);                               // LIMIT 10

  if (error) {
    console.error("Gagal ambil produk:", error);
    return;
  }

  products.value = data;
});

// Fungsi dummy form
const submitContact = () => {
  alert("Pesan Anda berhasil dikirim!");
};
</script>


<style scoped>
/* Tambahan styling untuk memastikan input di Contact section terlihat benar di tema gelap */
.input {
  background-color: #000 !important; /* Latar belakang hitam untuk input di Contact */
  border-color: #4b5563 !important; /* border abu-abu */
}
</style>
