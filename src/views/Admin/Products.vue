<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Manajemen Produk</h1>

    <button
      class="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      @click="$router.push('/admin/products/add')"
    >
      Tambah Produk
    </button>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Nama</th>
          <th class="p-2 border">Harga</th>
          <th class="p-2 border">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td class="border p-2">{{ p.id }}</td>
          <td class="border p-2">{{ p.name }}</td>
          <td class="border p-2">Rp {{ p.price }}</td>
          <td class="border p-2">
            <button
              class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              @click="$router.push(`/admin/products/${p.id}/edit`)"
            >
              Edit
            </button>
            <button class="bg-red-600 text-white px-2 py-1 rounded">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AdminProducts",
  data() {
    return {
      products: [
        { id: 1, name: "Produk 1", price: 100000 },
        { id: 2, name: "Produk 2", price: 200000 },
      ],
    };
  },
};
</script>
