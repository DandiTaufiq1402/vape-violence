<template>
  <div class="border rounded p-2">
    <img :src="product.image_url" class="w-full h-40 object-cover rounded" />
    <h2 class="font-semibold mt-2">{{ product.name }}</h2>
    <div class="mt-1">Rp {{ product.price }}</div>
    <div class="mt-2 flex gap-2">
      <router-link :to="`/product/${product.id}`" class="btn"
        >Lihat</router-link
      >
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object });
</script>
