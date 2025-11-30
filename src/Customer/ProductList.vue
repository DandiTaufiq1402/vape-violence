<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
    <div v-for="p in products" :key="p.id" class="border rounded p-2">
      <img :src="p.image_url" class="h-40 w-full object-cover rounded" />
      <h2 class="font-bold mt-2">{{ p.name }}</h2>
      <p class="text-gray-600">Rp {{ p.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";

const products = ref([]);

onMounted(async () => {
  const { data } = await supabase.from("products").select("*");
  products.value = data;
});
</script>
