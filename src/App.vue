<template>
  <div class="min-h-screen bg-gray-800 text-white">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>
