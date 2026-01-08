<template>
  <div class="min-h-screen bg-gray-800 text-white flex flex-col relative">
    <Navbar />

    <div class="flex flex-grow">
      <AdminSidebar v-if="isAdminRoute" />

      <main class="flex-grow">
        <router-view />
      </main>
    </div>

    <div
      v-if="showAgeGate"
      class="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] backdrop-blur-md p-4"
    >
      <div
        class="bg-gray-900 border-2 border-yellow-600 p-8 rounded-2xl max-w-lg w-full text-center shadow-2xl shadow-yellow-900/50"
      >
        <div class="mb-6 flex justify-center">
          <div class="w-20 h-20 rounded-full border-4 border-red-600 flex items-center justify-center bg-black">
             <span class="text-3xl font-black text-red-600">18+</span>
          </div>
        </div>

        <h2 class="text-3xl font-extrabold text-white mb-4 uppercase tracking-wider">
          Verifikasi Umur
        </h2>
        
        <p class="text-gray-300 mb-8 leading-relaxed">
          Produk yang dijual di situs ini mengandung nikotin dan hanya ditujukan untuk orang dewasa yang berusia <strong>18 tahun ke atas</strong>.
          <br><br>
          Apakah Anda berusia 18 tahun atau lebih?
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="denyAge"
            class="px-6 py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white transition font-bold"
          >
            TIDAK (KELUAR)
          </button>
          
          <button
            @click="confirmAge"
            class="px-8 py-3 rounded-lg bg-yellow-600 text-black font-extrabold hover:bg-yellow-500 transition shadow-lg shadow-yellow-600/20 transform hover:scale-105"
          >
            YA, SAYA 18+
          </button>
        </div>
        
        <p class="mt-6 text-xs text-gray-600">
          Dengan masuk ke situs ini, Anda menyetujui Syarat & Ketentuan kami.
        </p>
      </div>
    </div>
  </div>
</template>

// src/App.vue

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/navbar.vue";
import AdminSidebar from "./components/AdminSidebar.vue";
import { getCurrentUser } from "./lib/Auth"; // Pastikan import ini ada

const route = useRoute();
const showAgeGate = ref(false);

const isAdminRoute = computed(() => {
  return route.path.startsWith("/admin");
});

// LOGIKA POPUP 18+
onMounted(async () => {
  // 1. Cek apakah user sudah login
  const user = await getCurrentUser();

  // 2. Jika SUDAH login, jangan tampilkan popup (return)
  if (user) {
    showAgeGate.value = false;
    return;
  }

  // 3. Jika BELUM login, cek sessionStorage (bukan localStorage)
  // sessionStorage akan hilang jika browser ditutup, jadi popup muncul lagi saat masuk web baru
  const isVerified = sessionStorage.getItem("age_verified");

  if (!isVerified) {
    showAgeGate.value = true;
    document.body.style.overflow = 'hidden';
  }
});

const confirmAge = () => {
  // Simpan ke sessionStorage (Hanya untuk sesi ini)
  sessionStorage.setItem("age_verified", "true");
  
  showAgeGate.value = false;
  document.body.style.overflow = 'auto';
};

const denyAge = () => {
  window.location.href = "https://www.google.com";
};
</script>