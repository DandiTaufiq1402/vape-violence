// src/views/Admin/Testimonials.vue
<template>
  <div class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
    <h1
      class="text-3xl font-extrabold mb-8 text-yellow-500 border-b border-gray-700 pb-3"
    >
      Manajemen Testimoni
    </h1>

    <div class="mb-6 flex gap-4 items-center">
      <label for="productFilter" class="text-gray-400 font-medium"
        >Filter Produk:</label
      >
      <select
        id="productFilter"
        v-model="selectedProduct"
        @change="fetchTestimonials"
        class="bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:border-cyan-500"
      >
        <option :value="0">Semua Produk</option>
        <option
          v-for="p in products"
          :key="p.id"
          :value="p.id"
        >
          {{ p.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Memuat data testimoni...
    </div>
    <div
      v-else
      class="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <table class="w-full text-left text-gray-300">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th class="p-3 border-b border-gray-600">ID</th>
            <th class="p-3 border-b border-gray-600">Produk</th>
            <th class="p-3 border-b border-gray-600">User</th>
            <th class="p-3 border-b border-gray-600">Rating</th>
            <th class="p-3 border-b border-gray-600">Testimoni</th>
            <th class="p-3 border-b border-gray-600">Tanggal</th>
            <th class="p-3 border-b border-gray-600">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="t in testimonials"
            :key="t.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="p-3">{{ t.id }}</td>
            <td class="p-3 font-medium text-cyan-400">
              {{ t.products?.name || "Produk Dihapus" }}
            </td>
            <td class="p-3">{{ t.users?.full_name || "N/A" }}</td>
            <td class="p-3 text-yellow-500">
              {{ '⭐'.repeat(t.rating) }}
            </td>
            <td class="p-3 max-w-xs truncate">{{ t.testimony_content }}</td>
            <td class="p-3">{{ formatDate(t.created_at) }}</td>
            <td class="p-3 whitespace-nowrap">
              <button
                @click="deleteTestimonial(t.id, t.products?.name, t.users?.full_name)"
                class="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="testimonials.length === 0 && !loading">
            <td colspan="7" class="p-4 text-center text-gray-500">
              Tidak ada testimoni yang ditemukan.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabase";

const testimonials = ref([]);
const products = ref([]);
const loading = ref(true);
const selectedProduct = ref(0); // 0 means 'All Products'

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const fetchProductsList = async () => {
  const { data, error } = await supabase.from("products").select("id, name");
  if (error) {
    console.error("Gagal memuat daftar produk:", error.message);
  } else {
    products.value = data || [];
  }
};

const fetchTestimonials = async () => {
  loading.value = true;
  let query = supabase
    .from("testimonials")
    .select(
      `
        id, created_at, rating, testimony_content,
        products (name),
        users (full_name)
      `
    )
    .order("created_at", { ascending: false });

  if (selectedProduct.value !== 0) {
    query = query.eq("product_id", selectedProduct.value);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Gagal memuat testimoni:", error.message);
  } else {
    testimonials.value = data || [];
  }
  loading.value = false;
};

const deleteTestimonial = async (id, productName, userName) => {
  if (
    confirm(
      `Anda yakin ingin menghapus testimoni dari "${userName}" untuk produk "${productName}"?`
    )
  ) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus testimoni: " + error.message);
    } else {
      alert("Testimoni berhasil dihapus.");
      fetchTestimonials();
    }
  }
};

onMounted(() => {
  fetchProductsList();
  fetchTestimonials();
});
</script>