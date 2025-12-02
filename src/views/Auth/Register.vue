<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
    <div
      class="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
    >
      <h1 class="text-3xl font-extrabold text-white text-center mb-6">
        Buat Akun Baru
      </h1>

      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-400 mb-1"
            >Nama Lengkap</label
          >
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 p-3"
            required
          />
        </div>

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
            placeholder="Buat password (min. 6 karakter)"
            class="input bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 p-3"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg w-full shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition duration-300 transform hover:scale-[1.01]"
        >
          Daftar
        </button>
      </form>

      <p class="text-center text-gray-400 mt-6 text-sm">
        Sudah punya akun?
        <router-link
          to="/login"
          class="text-yellow-400 font-semibold hover:text-yellow-300 transition"
        >
          Masuk di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../lib/supabase";
import { initializeNewUser } from "../../lib/Auth";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      // 1. Panggil Supabase signUp
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (error) {
        alert("Gagal mendaftar: " + error.message);
        return;
      }

      // KASUS PENTING: Jika data.user null dan data.session null, artinya Supabase meminta verifikasi email.
      if (data.user === null && data.session === null) {
        alert(
          "Pendaftaran berhasil! Silakan cek email Anda untuk memverifikasi akun Anda sebelum login."
        );
        this.$router.push("/login");
        return;
      }

      // KASUS PENTING: Jika langsung auto login (konfirmasi email dimatikan di Supabase)
      else if (data.user && data.session) {
        // Lakukan inisialisasi role di tabel public.users
        // *Ini akan gagal jika RLS INSERT belum benar*
        await initializeNewUser(data.user.id, this.name);

        alert("Pendaftaran Berhasil! Anda otomatis login.");
        this.$router.push("/"); // Redirect ke home/dashboard
        return;
      }

      // Kasus Lainnya (Fallback, biasanya akan ditangkap oleh kasus #1)
      else {
        alert("Pendaftaran selesai. Silakan cek email Anda.");
        this.$router.push("/login");
      }
    },
  },
};
</script>
