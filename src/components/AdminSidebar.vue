// src/components/AdminSidebar.vue

<template>
  <div class="w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
    <div
      class="text-xl font-bold text-yellow-500 mb-6 border-b border-gray-700 pb-3"
    >
      Admin Panel
    </div>

    <nav class="space-y-3">
      <router-link
        to="/admin"
        :class="isActive('/admin')"
        class="flex items-center space-x-3 p-3 rounded-lg font-semibold transition duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 001 1h3M12 2v10"
          ></path>
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/admin/products"
        :class="isActive('/admin/products')"
        class="flex items-center space-x-3 p-3 rounded-lg font-semibold transition duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m0-4.444l7-3.5"
          ></path>
        </svg>
        <span>Produk</span>
      </router-link>

      <router-link
        to="/admin/orders"
        :class="isActive('/admin/orders')"
        class="flex items-center space-x-3 p-3 rounded-lg font-semibold transition duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
        <span>Orders</span>
      </router-link>

      <router-link
        to="/admin/users"
        :class="isActive('/admin/users')"
        class="flex items-center space-x-3 p-3 rounded-lg font-semibold transition duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 015.356-1.857M7 20h4m-4 0h4m-9-4a7 7 0 0114 0M12 4a3 3 0 100 6 3 3 0 000-6z"
          ></path>
        </svg>
        <span>Users</span>
      </router-link>

      <router-link
        to="/admin/testimonials"
        :class="isActive('/admin/testimonials')"
        class="flex items-center space-x-3 p-3 rounded-lg font-semibold transition duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
          ></path>
        </svg>
        <span>Testimoni</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (path) => {
  return route.path.startsWith(path) && path.length <= route.path.length
    ? "bg-cyan-600 text-black hover:bg-cyan-500" // Active style
    : "text-gray-300 hover:bg-gray-700"; // Default style
};
</script>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>