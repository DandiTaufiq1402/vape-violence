<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">
      {{ isEdit ? "Edit Produk" : "Tambah Produk" }}
    </h1>

    <form @submit.prevent="save">
      <input
        v-model="form.name"
        type="text"
        placeholder="Nama Produk"
        class="border p-2 w-full mb-2"
      />
      <input
        v-model="form.price"
        type="number"
        placeholder="Harga"
        class="border p-2 w-full mb-2"
      />

      <button class="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AdminAddEditProduct",
  data() {
    return {
      isEdit: false,
      form: {
        name: "",
        price: "",
      },
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      this.form = {
        name: "Produk " + id,
        price: 100000,
      };
    }
  },
  methods: {
    save() {
      alert(
        this.isEdit ? "Produk berhasil diupdate!" : "Produk baru ditambahkan!"
      );
      this.$router.push("/admin/products");
    },
  },
};
</script>
