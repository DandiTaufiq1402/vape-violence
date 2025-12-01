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
              <img
                :src="t.avatar"
                alt="Avatar"
                class="w-12 h-12 rounded-full object-cover mr-4 border-2 border-cyan-500"
              />
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
            Rp 999.000
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
          &copy; Copyright 2025, All Rights Reserved by Felan Ardenta Yoga A.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../lib/supabase";

// Data Dummy produk (dibiarkan seperti sebelumnya untuk demo)
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Alpha Mod Pro 2.0",
    price: 650000,
    image_url: "/img/vape1.jpg",
    type: "Vape Mod",
  },
  {
    id: 2,
    name: "Cosmic Citrus Liquid",
    price: 120000,
    image_url: "/img/liquid1.jpg",
    type: "Liquid Freebase",
  },
  {
    id: 3,
    name: "Vaporizer Max Pod Kit",
    price: 300000,
    image_url: "/img/vape2.jpg",
    type: "Vape Pod",
  },
  {
    id: 4,
    name: "Mint Freeze Saltnic",
    price: 110000,
    image_url: "/img/liquid2.jpg",
    type: "Liquid Saltnic",
  },
  {
    id: 5,
    name: "Revolver Tank RTA",
    price: 250000,
    image_url: "/img/tank1.jpg",
    type: "Atomizer",
  },
  {
    id: 6,
    name: "Strawberry Jam Freebase",
    price: 135000,
    image_url: "/img/liquid3.jpg",
    type: "Liquid Freebase",
  },
  {
    id: 7,
    name: "Cyberpunk 2077 Mod",
    price: 880000,
    image_url: "/img/vape3.jpg",
    type: "Vape Mod",
  },
  {
    id: 8,
    name: "Grape Bubblegum Salt",
    price: 125000,
    image_url: "/img/liquid4.jpg",
    type: "Liquid Saltnic",
  },
  {
    id: 9,
    name: "Nano Mini Kit",
    price: 350000,
    image_url: "/img/vape4.jpg",
    type: "Vape Pod",
  },
  {
    id: 10,
    name: "Vanilla Custard Freebase",
    price: 140000,
    image_url: "/img/liquid5.jpg",
    type: "Liquid Freebase",
  },
];

const DUMMY_TESTIMONIALS = [
  {
    name: "Dandi Jenyong Hama",
    role: "Gold Lane",
    avatar: "/img/avatar1.jpg",
    testimony:
      "Rasa liquid Red Velvet ini *smooth* banget, cocok buat *vaping* harian. Tidak membuat coil cepat gosong. Benar-benar *premium*!",
  },
  {
    name: "Felan Ardenta Yoga Adiyatama",
    role: "EXP Lane",
    avatar: "/img/avatar2.jpg",
    testimony:
      "Mod Centaurus Edisi Khusus ini desainnya keren parah! Chipsetnya responsif, powernya stabil, dan baterainya awet seharian. *Highly recommended*.",
  },
  {
    name: "Evan Alpha Edison",
    role: "Mid Lane",
    avatar: "/img/avatar3.jpg",
    testimony:
      "Cotton Bacon-nya memang beda, kapas menyerap liquid cepat dan tidak ada rasa aneh. Uap yang dihasilkan tebal dan bersih.",
  },
  {
    name: "Vargas Kopling",
    role: "Gold Lane",
    avatar: "/img/avatar4.jpg",
    testimony:
      "Liquid Salt Nic Mint Freeze ini dinginnya pas banget! Cocok buat yang suka sensasi *fresh* dan *throat hit* yang halus. Tidak bikin eneg.",
  },
];

const limitedTestimonials = computed(() => DUMMY_TESTIMONIALS.slice(0, 3));

const products = ref(DUMMY_PRODUCTS);

onMounted(async () => {
  // Logic Supabase dipertahankan, namun menggunakan data dummy untuk demo styling
  products.value = DUMMY_PRODUCTS;
});

// Fungsi dummy untuk form kontak
const submitContact = () => {
  alert("Pesan Anda berhasil dikirim!");
  // Di sini Anda akan menambahkan logika untuk mengirim data ke Supabase atau API lainnya.
};
</script>

<style scoped>
/* Tambahan styling untuk memastikan input di Contact section terlihat benar di tema gelap */
.input {
  background-color: #000 !important; /* Latar belakang hitam untuk input di Contact */
  border-color: #4b5563 !important; /* border abu-abu */
}
</style>
