/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/Profile.vue
(FILE BARU) */

<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-7xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-10 text-yellow-500">
        Profil Saya
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          class="lg:col-span-1 bg-gray-900 p-6 rounded-xl border border-gray-700 h-fit sticky top-6"
        >
          <div class="flex flex-col items-center">
            <svg
              class="w-24 h-24 text-cyan-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <h2 class="text-2xl font-bold text-white">
              {{ userProfile.name }}
            </h2>
            <p class="text-gray-400 mb-4">{{ userProfile.email }}</p>
            <button
              @click="logout"
              class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition w-full"
            >
              Logout
            </button>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-12">
          <div>
            <h2
              class="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 text-cyan-400"
            >
              Riwayat Pembelian
            </h2>

            <div
              v-if="history.length === 0"
              class="text-center text-gray-500 py-10"
            >
              Belum ada riwayat pembelian.
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="order in history"
                :key="order.id"
                class="bg-gray-900 p-4 rounded-xl border border-gray-700 hover:border-cyan-500 transition"
              >
                <div
                  class="flex justify-between items-start mb-2 border-b border-gray-800 pb-2"
                >
                  <div>
                    <span class="text-sm font-semibold text-gray-400 block"
                      >ID Transaksi: {{ order.id }}</span
                    >
                    <strong class="text-lg text-white block">{{
                      order.date
                    }}</strong>
                  </div>
                  <span
                    :class="
                      order.status === 'Selesai'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    "
                    class="font-bold text-sm"
                  >
                    {{ order.status }}
                  </span>
                </div>

                <div
                  v-for="item in order.items"
                  :key="item.name"
                  class="flex justify-between text-sm py-1"
                >
                  <p class="text-gray-300">{{ item.name }} (x{{ item.qty }})</p>
                  <span class="text-gray-300"
                    >Rp {{ item.subtotal.toLocaleString("id-ID") }}</span
                  >
                </div>

                <div
                  class="flex justify-between items-center pt-3 mt-3 border-t border-gray-700"
                >
                  <strong class="text-xl text-yellow-500">Total</strong>
                  <strong class="text-xl text-white"
                    >Rp {{ order.total.toLocaleString("id-ID") }}</strong
                  >
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              class="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 text-cyan-400"
            >
              Testimoni Anda
            </h2>

            <div class="grid grid-cols-1 gap-4">
              <div
                v-for="t in myTestimonial"
                :key="t.id"
                class="bg-gray-900 p-4 rounded-xl border border-yellow-500 shadow-md"
              >
                <p class="text-sm text-yellow-400 mb-2">
                  Tanggal: {{ t.date }}
                </p>
                <p class="text-gray-300 italic">"{{ t.testimony }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/Auth";

const router = useRouter();

// DUMMY DATA UNTUK DEMO
const userProfile = ref({
  name: "Dandi Taufiqurrahman",
  email: "dandi.t@example.com",
  role: "customer",
});

const myTestimonial = ref([
  {
    id: 101,
    date: "2025-11-20",
    testimony:
      "Liquid Blackcurrant Mint-nya mantap! Dinginnya pas, rasa blackcurrant-nya otentik. Beli lagi pasti!",
  },
  {
    id: 102,
    date: "2025-09-05",
    testimony:
      "Pelayanan cepat dan ramah, Mod yang saya beli original dan harga bersaing. Sukses terus Violet Vape Store!",
  },
]);

const history = ref([
  {
    id: "VV20251125001",
    date: "25 Nov 2025",
    status: "Selesai",
    total: 1009000,
    items: [
      { name: "Centaurus M200", qty: 1, subtotal: 899000 },
      { name: "Liquid Sop Buah", qty: 1, subtotal: 110000 },
    ],
  },
  {
    id: "VV20251010002",
    date: "10 Okt 2025",
    status: "Diproses",
    total: 240000,
    items: [{ name: "Liquid Melon Milk", qty: 2, subtotal: 240000 }],
  },
]);

// LOGIC OTENTIKASI
onMounted(async () => {
  const user = await getCurrentUser();
  if (user) {
    userProfile.value.email = user.email || "N/A";
    // Di lingkungan nyata, Anda akan fetch data profil dan riwayat dari database
  } else {
    router.push("/login"); // Redirect jika tidak login
  }
});

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Logout Gagal: " + error.message);
  } else {
    alert("Logout Berhasil!");
    router.push("/login");
  }
};
</script>
