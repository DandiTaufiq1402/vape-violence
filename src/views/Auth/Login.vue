<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
    <div
      class="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
    >
      <h1 class="text-3xl font-extrabold text-white text-center mb-6">
        Masuk ke Akun Anda
      </h1>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-400 mb-1"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Masukkan email Anda"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 p-3"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-sm font-medium text-gray-400 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Masukkan password Anda"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 p-3"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg w-full shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition duration-300 transform hover:scale-[1.01]"
        >
          Login
        </button>
      </form>

      <p class="text-center text-gray-400 mt-6 text-sm">
        Belum punya akun?
        <router-link
          to="/register"
          class="text-yellow-400 font-semibold hover:text-yellow-300 transition"
        >
          Daftar Sekarang
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../lib/supabase"; // Perbaikan path dan impor Supabase

export default {
  name: "Login",

  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) {
        alert("Login Gagal: " + error.message);
        return;
      }

      const user = data.user;

      // Ambil role dari tabel public.users
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        alert("Gagal mengambil data role user!");
        console.error(profileError);
        return;
      }

      // Redirect berdasarkan role
      if (profile.role === "admin") {
        this.$router.push("/admin");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
