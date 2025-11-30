<template>
  <div class="auth p-6">
    <h1 class="text-xl font-bold mb-4">Register</h1>

    <form @submit.prevent="registerUser">
      <input
        v-model="name"
        type="text"
        placeholder="Nama"
        class="border p-2 w-full mb-2"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full mb-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full mb-2"
      />

      <button class="bg-green-600 text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return { name: "", email: "", password: "" };
  },
  methods: {
    registerUser() {
      alert("Akun berhasil dibuat (dummy)");
      this.$router.push("/login");
    },
  },
};
</script>
