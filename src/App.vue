<template>
  <div class="min-h-screen bg-gray-800 text-white flex flex-col">
    <Navbar />

    <div class="flex flex-grow">
      <AdminSidebar v-if="isAdminRoute" />

      <main class="flex-grow">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import AdminSidebar from "./components/AdminSidebar.vue"; // <--- IMPORT SIDEBAR BARU

const route = useRoute();

// Tambahkan computed property untuk mengecek apakah rute saat ini adalah rute admin
const isAdminRoute = computed(() => {
  return route.path.startsWith("/admin");
});
</script>
