<template>
  <nav
    class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center"
  >
    <router-link
      to="/"
      class="font-bold text-xl text-cyan-400 hover:text-cyan-300 transition"
    >
      Vape Violence
    </router-link>

    <div class="flex gap-6 items-center">
      <router-link to="/" class="hover:text-cyan-400 transition"
        >Home</router-link
      >

      <router-link
        v-if="isAuthenticated"
        to="/cart"
        class="hover:text-cyan-400 transition"
      >
        Cart
      </router-link>

      <router-link
        v-if="isAdminUser"
        to="/admin"
        class="hover:text-cyan-400 transition font-bold text-yellow-500"
      >
        Admin Dashboard
      </router-link>

      <div v-if="!isAuthenticated" class="flex gap-4">
        <router-link to="/login" class="hover:text-cyan-400 transition"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="bg-yellow-500 text-gray-900 px-3 py-1 rounded font-semibold hover:bg-yellow-400 transition"
        >
          Register
        </router-link>
      </div>

      <button
        v-else
        @click="logout"
        class="bg-red-600 text-white px-3 py-1 rounded font-semibold hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { getCurrentUser, isAdmin } from "../lib/Auth"; // Import fungsi Auth
import { supabase } from "../lib/supabase"; // Import supabase

const router = useRouter(); // Gunakan router

// State reaktif
const isAuthenticated = ref(false);
const isAdminUser = ref(false);

// Fungsi untuk memperbarui status autentikasi dan role
const updateAuthStatus = async () => {
  const user = await getCurrentUser(); // Mengambil user saat ini
  isAuthenticated.value = !!user;

  if (isAuthenticated.value) {
    isAdminUser.value = await isAdmin(); // Mengecek role Admin
  } else {
    isAdminUser.value = false;
  }
};

// Fungsi Logout
const logout = async () => {
  const { error } = await supabase.auth.signOut(); // Panggil fungsi logout Supabase
  if (error) {
    alert("Logout Gagal: " + error.message);
  } else {
    alert("Logout Berhasil!");
    router.push("/login"); // Arahkan ke halaman login
  }
  updateAuthStatus(); // Perbarui status navigasi setelah logout
};

// Panggil saat komponen dimuat
onMounted(() => {
  updateAuthStatus();
});

// Tambahkan listener untuk mendeteksi perubahan auth (login/logout)
// Ini adalah cara Vue Router dan Supabase biasanya bekerja bersama,
// meskipun dalam konteks file yang diberikan, kita juga bisa mengandalkan
// navigation guard untuk memicu pembaruan pada halaman.
watch(
  () => router.currentRoute.value.path,
  () => {
    updateAuthStatus();
  }
);
</script>
