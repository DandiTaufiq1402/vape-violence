/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/components/navbar.vue
*/

<template>
  <nav
    class="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-gray-800"
  >
    <router-link
      to="/"
      class="font-bold text-xl text-yellow-500 hover:text-yellow-400 transition font-serif italic"
      style="font-size: 24px; font-family: 'Times New Roman', serif"
    >
      Violet<span class="text-white">Vape Store</span>
    </router-link>

    <div class="flex gap-8 items-center text-lg font-semibold">
      <router-link to="/" class="hover:text-yellow-500 transition"
        >Home</router-link
      >
      <router-link to="/product/1" class="hover:text-yellow-500 transition"
        >Product</router-link
      >
      <router-link to="/contact" class="hover:text-yellow-500 transition"
        >Contact</router-link
      >
      <router-link to="/testimonials" class="hover:text-yellow-500 transition"
        >Testimonials</router-link
      >
    </div>

    <div class="flex gap-6 items-center">
      <router-link
        v-if="isAuthenticated"
        to="/cart"
        class="hover:text-yellow-500 transition"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 7m16.6-7L18.6 5M16 16a2 2 0 11-4 0 2 2 0 014 0zM7 20a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      </router-link>

      <router-link
        v-if="isAuthenticated"
        to="/profile"
        class="hover:text-yellow-500 transition"
      >
        <svg
          class="w-6 h-6"
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
      </router-link>

      <div v-if="!isAuthenticated" class="flex gap-4">
        <router-link to="/login" class="hover:text-yellow-500 transition"
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
        class="bg-red-600 text-white px-3 py-1 rounded font-semibold text-sm hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, isAdmin } from "../lib/Auth";
import { supabase } from "../lib/supabase";

const router = useRouter();

const isAuthenticated = ref(false);
const isAdminUser = ref(false);

const updateAuthStatus = async () => {
  const user = await getCurrentUser();
  isAuthenticated.value = !!user;

  if (isAuthenticated.value) {
    isAdminUser.value = await isAdmin();
  } else {
    isAdminUser.value = false;
  }
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Logout Gagal: " + error.message);
  } else {
    alert("Logout Berhasil!");
    router.push("/login");
  }
  updateAuthStatus();
};

onMounted(() => {
  updateAuthStatus();
});

watch(
  () => router.currentRoute.value.path,
  () => {
    updateAuthStatus();
  }
);
</script>
