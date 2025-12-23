// src/views/Admin/Products.vue

<template>
  <div class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
    <h1 class="text-3xl font-extrabold mb-4 text-yellow-500">
      Manajemen Produk
    </h1>

    <button
      class="mb-6 bg-cyan-600 text-black px-4 py-2 rounded-lg font-bold hover:bg-cyan-700 transition"
      @click="handleAddProduct"
    >
      <i class="fas fa-plus mr-2"></i> Tambah Produk
    </button>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Memuat produk...
    </div>
    <div
      v-else
      class="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <table class="w-full text-left text-gray-300">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th class="p-3 border-b border-gray-600">ID</th>
            <th class="p-3 border-b border-gray-600">Gambar</th>
            <th class="p-3 border-b border-gray-600">Nama Produk</th>
            <th class="p-3 border-b border-gray-600">Kategori</th> <th class="p-3 border-b border-gray-600">Harga</th>
            <th class="p-3 border-b border-gray-600">Stok</th>
            <th class="p-3 border-b border-gray-600">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in products"
            :key="p.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="p-3">{{ p.id }}</td>
            <td class="p-3">
              <img
                :src="p.image_url || '/placeholder.jpg'"
                alt="Produk"
                class="w-12 h-12 object-cover rounded"
              />
            </td>
            <td class="p-3 font-medium text-white">{{ p.name }}</td>
            <td class="p-3 text-cyan-400 font-semibold">{{ p.categories?.name || 'N/A' }}</td> <td class="p-3">Rp {{ formatCurrency(p.price) }}</td>
            <td class="p-3">{{ p.stock }}</td>
            <td class="p-3 space-x-2 whitespace-nowrap">
              <button
                class="bg-yellow-500 text-black px-3 py-1 text-sm rounded hover:bg-yellow-600 transition"
                @click="$router.push(`/admin/products/${p.id}/edit`)"
              >
                Edit
              </button>
              <button
                class="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition"
                @click="deleteProduct(p.id, p.name)"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="products.length === 0 && !loading">
            <td colspan="7" class="p-4 text-center text-gray-500">
              Tidak ada produk.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabase";
import { useRouter } from "vue-router"; //
import { getCurrentUser } from "../../lib/Auth";

export default {
  name: "AdminProducts",
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const router = useRouter();

    const handleAddProduct = async () => {
      const user = await getCurrentUser();
      
      if (!user) {
        alert("Harap login terlebih dahulu"); // Notifikasi jika belum login
      } else {
        router.push('/admin/products/add'); // Lanjut jika sudah login
      }
    };

    const fetchProducts = async () => {
      loading.value = true;
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (name)
        `) // NEW: Fetch category name
        .order("id", { ascending: true });
      if (error) {
        console.error("Gagal memuat produk:", error.message);
      } else {
        products.value = data || [];
      }
      loading.value = false;
    };

    const deleteProduct = async (id, name) => {
      if (confirm(`Anda yakin ingin menghapus produk: "${name}"?`)) {
        const { error } = await supabase.from("products").delete().eq("id", id);

        if (error) {
          alert("Gagal menghapus produk: " + error.message);
          console.error("Gagal menghapus produk:", error.message);
        } else {
          alert(`Produk "${name}" berhasil dihapus.`);
          fetchProducts();
        }
      }
    };

    const formatCurrency = (value) => {
      if (!value) return "0";
      return Number(value).toLocaleString("id-ID");
    };

    onMounted(() => {
      fetchProducts();
    });

    return { products, deleteProduct, formatCurrency, loading, handleAddProduct };
  },
};
</script>