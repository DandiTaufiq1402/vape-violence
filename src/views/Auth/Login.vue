<template>
  <div class="auth p-6">
    <h1 class="text-xl font-bold mb-4">Login</h1>

    <form @submit.prevent="login">
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

      <button class="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    login() {
      alert("Login berhasil (dummy)");
      this.$router.push("/");
    },
  },
};
</script>
