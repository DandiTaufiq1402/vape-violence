// src/views/Admin/AddEditProduct.vue

<template>
  <div
    class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white max-w-2xl mx-auto"
  >
    <h1
      class="text-3xl font-extrabold mb-6 text-yellow-500 border-b border-gray-700 pb-3"
    >
      {{ isEdit ? "Edit Produk" : "Tambah Produk Baru" }}
    </h1>

    <form
      @submit.prevent="save"
      class="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 space-y-4"
    >
      <div>
        <label for="name" class="block text-sm font-medium text-gray-400 mb-1"
          >Nama Produk</label
        >
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama produk"
          required
          class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 p-3"
        />
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-400 mb-1"
          >Deskripsi Produk</label
        >
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Deskripsi singkat produk"
          class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 p-3"
        ></textarea>
      </div>

      <div>
        <label
          for="category"
          class="block text-sm font-medium text-gray-400 mb-1"
          >Kategori Produk</label
        >
        <select
          id="category"
          v-model.number="form.category_id"
          required
          class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 p-3 appearance-none"
        >
          <option :value="0" disabled>Pilih kategori</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
        <p v-if="!categories.length" class="text-sm text-red-400 mt-1">
          Tidak dapat memuat kategori. Pastikan tabel 'categories' sudah ada.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label
            for="price"
            class="block text-sm font-medium text-gray-400 mb-1"
            >Harga (Rp)</label
          >
          <input
            id="price"
            v-model.number="form.price"
            type="number"
            placeholder="Harga jual"
            required
            min="0"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 p-3"
          />
        </div>

        <div>
          <label
            for="stock"
            class="block text-sm font-medium text-gray-400 mb-1"
            >Stok</label
          >
          <input
            id="stock"
            v-model.number="form.stock"
            type="number"
            placeholder="Jumlah stok"
            required
            min="0"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 p-3"
          />
        </div>
      </div>

      <div>
        <label for="file" class="block text-sm font-medium text-gray-400 mb-1"
          >Unggah Gambar (Wajib)</label
        >
        <input
          id="file"
          type="file"
          @change="handleFileUpload"
          :required="!isEdit || !form.image_url"
          class="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 transition"
        />
        <div v-if="form.image_url" class="mt-2 text-sm text-gray-400">
          Gambar saat ini:
          <a
            :href="form.image_url"
            target="_blank"
            class="text-cyan-400 hover:underline"
            >Lihat Gambar</a
          >
        </div>
        <p v-if="!form.image_url && isEdit" class="text-sm text-red-400 mt-1">
          Harap unggah ulang gambar jika ingin diubah.
        </p>
        <p v-if="uploading" class="text-sm text-cyan-400 mt-1">
          Mengunggah gambar...
        </p>
      </div>

      <button
        type="submit"
        :disabled="uploading"
        class="bg-yellow-500 text-black font-bold py-3 rounded-lg w-full shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition duration-300 transform hover:scale-[1.01] mt-6 disabled:opacity-50"
      >
        {{ isEdit ? "Simpan Perubahan" : "Tambah Produk" }}
      </button>

      <button
        type="button"
        @click="$router.back()"
        class="w-full text-center text-gray-400 py-2 hover:text-white transition"
      >
        Batal
      </button>
    </form>
  </div>
</template>

<script setup>
import { supabase } from "../../lib/supabase";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const productId = route.params.id;
const selectedFile = ref(null);
const uploading = ref(false);

const categories = ref([]); // NEW: State for categories

const form = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: "",
  category_id: 0, // NEW: Add category_id
});

onMounted(async () => {
  await fetchCategories(); // NEW: Fetch categories on mount
  if (productId) {
    isEdit.value = true;
    await fetchProduct(productId);
  }
});

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select("id, name");
  if (error) {
    console.error("Gagal memuat kategori:", error.message);
  } else {
    categories.value = data || [];
  }
};

const fetchProduct = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("name, description, price, stock, image_url, category_id") // NEW: include category_id
    .eq("id", id)
    .single();

  if (error) {
    alert("Gagal memuat detail produk: " + error.message);
    router.push("/admin/products");
  } else if (data) {
    form.value = data;
  }
};

const save = async () => {
  uploading.value = true;
  let imageUrl = form.value.image_url;

  try {
    // 1. Proses Unggah Gambar jika ada file baru
    if (selectedFile.value) {
      const file = selectedFile.value;
      const fileName = `${Date.now()}_${file.name}`;

      // Ganti nama bucket sesuai yang Anda buat di Supabase Storage, misal 'images'
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error("Upload Gagal: " + uploadError.message);
      }

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    // 2. Siapkan Payload untuk Database
    const payload = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock,
      image_url: imageUrl,
      category_id: form.value.category_id, // NEW: Include category_id
    };

    let error;
    if (isEdit.value) {
      // Update produk
      const response = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId);
      error = response.error;
    } else {
      // Tambah produk baru
      const response = await supabase.from("products").insert(payload);
      error = response.error;
    }

    if (error) {
      throw new Error(error.message);
    }

    alert(
      isEdit.value
        ? "Produk berhasil diupdate!"
        : "Produk baru berhasil ditambahkan!"
    );
    router.push("/admin/products");
  } catch (e) {
    alert(e.message);
    console.error(e);
  } finally {
    uploading.value = false;
  }
};
</script>