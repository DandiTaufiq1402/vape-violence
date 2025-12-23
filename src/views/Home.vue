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

        <div v-if="loading" class="text-center text-gray-500">Memuat produk...</div>
        
        <div
          v-else
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
                p.categories?.name || 'Vape'
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
                Lihat Detail
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-black border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-10">Apa Kata Mereka?</h2>

        <div v-if="testimonials.length === 0" class="text-center text-gray-500 mb-16">
           Belum ada testimoni. Jadilah yang pertama mereview!
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            v-for="t in testimonials"
            :key="t.id"
            class="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg hover:border-cyan-500 transition"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-xl mr-4">
                 {{ t.users?.full_name?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <div>
                <h3 class="font-bold text-lg text-white">{{ t.users?.full_name || 'Customer' }}</h3>
                <p class="text-sm text-cyan-400 font-semibold">{{ t.products?.name }}</p>
                <div class="text-yellow-500 text-xs mt-1">{{ '⭐'.repeat(t.rating) }}</div>
              </div>
            </div>
            <p class="text-gray-300 text-sm italic line-clamp-4 leading-relaxed">
              "{{ t.testimony_content }}"
            </p>
          </div>
        </div>

        <div class="text-center mb-16">
           <router-link to="/testimonials" class="text-yellow-500 hover:text-yellow-400 font-bold border-b-2 border-yellow-500 pb-1">
              Lihat Semua Testimoni
           </router-link>
        </div>

        <h2 class="text-4xl font-bold text-center mb-10">Contact</h2>
        <div class="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          
          <div class="w-full md:w-1/3 flex justify-center">
             <img 
               src="/vite.svg" 
               alt="Logo Vape Store" 
               class="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
             />
          </div>

          <div
            class="w-full md:w-1/2 bg-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl"
          >
            <form @submit.prevent="submitContact">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-400 mb-1">Nama</label>
                <input type="text" class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500" required />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="tel" class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500" required />
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-400 mb-1">No. Telp</label>
                <textarea rows="3" class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500"></textarea>
              </div> 
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-400 mb-1">Deskripsi</label>
                <textarea rows="3" class="input w-full bg-black text-white p-3 rounded-lg border border-gray-600 focus:border-cyan-500"></textarea>
              </div>
              
              <button type="submit" class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                Kirim
              </button>
            </form>
          </div>
        </div>
        </div>
    </section>

    <footer class="bg-black border-t border-gray-800 py-8 text-center">
        <p class="text-gray-500 text-sm">&copy; 2025 Violet Vape Store. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";

const products = ref([]);
const testimonials = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  // 1. Load Produk Terbaru (Limit 5)
  const { data: prodData } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  if (prodData) products.value = prodData;

  // 2. Load Testimoni Terbaru (Limit 3) - Untuk Public
  const { data: testiData, error } = await supabase
    .from("testimonials")
    .select(`
      id, rating, testimony_content,
      users (full_name),
      products (name)
    `)
    .order("created_at", { ascending: false })
    .limit(3);

  if (testiData) {
     testimonials.value = testiData;
  } else if (error) {
     console.error("Gagal load testimoni home:", error);
  }

  loading.value = false;
});

const submitContact = () => {
  alert("Pesan Anda berhasil dikirim!");
};
</script>