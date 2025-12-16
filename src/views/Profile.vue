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
            <h2 class="text-2xl font-bold text-white text-center">
              {{ userProfile.name }}
            </h2>
            <p class="text-gray-400 mb-4">{{ userProfile.email }}</p>
            <div class="w-full space-y-2">
              <span
                class="block text-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
                :class="
                  userProfile.role === 'admin'
                    ? 'bg-red-900 text-red-300'
                    : 'bg-blue-900 text-blue-300'
                "
              >
                {{ userProfile.role }}
              </span>
              <button
                @click="logout"
                class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-12">
          
          <div>
            <h2
              class="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 text-cyan-400"
            >
              Riwayat Pembelian
            </h2>

            <div v-if="loading.history" class="text-center text-gray-500 py-10">
              Memuat riwayat transaksi...
            </div>

            <div
              v-else-if="history.length === 0"
              class="text-center bg-gray-900 p-8 rounded-xl border border-gray-800"
            >
              <p class="text-gray-500 mb-4">Belum ada riwayat pembelian.</p>
              <router-link
                to="/"
                class="inline-block bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition"
              >
                Mulai Belanja
              </router-link>
            </div>

            <div v-else class="space-y-6">
              <div
                v-for="order in history"
                :key="order.id"
                class="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition shadow-lg"
              >
                <div
                  class="flex justify-between items-start mb-4 border-b border-gray-800 pb-3"
                >
                  <div>
                    <span class="text-xs font-mono text-gray-500 block mb-1"
                      >Order ID: {{ order.id }}</span
                    >
                    <strong class="text-lg text-white block">{{
                      formatDate(order.created_at)
                    }}</strong>
                  </div>
                  <span
                    :class="statusClass(order.status)"
                    class="px-3 py-1 rounded text-xs font-bold uppercase"
                  >
                    {{ order.status }}
                  </span>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="item in order.order_items"
                    :key="item.id"
                    class="flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-3 rounded-lg"
                  >
                    <div class="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                      <div class="ml-2">
                        <p class="text-cyan-200 font-bold text-md">
                          {{ item.products?.name || "Produk Dihapus" }}
                        </p>
                        <p class="text-gray-500 text-xs">
                          Qty: {{ item.quantity }} x Rp {{ item.price.toLocaleString("id-ID") }}
                        </p>
                      </div>
                    </div>
                    
                    <div v-if="order.status === 'completed'" class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                       <span class="text-white font-semibold block sm:hidden">
                          Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}
                       </span>
                       <button 
                          @click="goToReview(order.id, item.product_id, item.products?.name)"
                          class="text-xs bg-yellow-500 text-black px-3 py-2 rounded font-bold hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20"
                       >
                          Beri Ulasan
                       </button>
                    </div>
                    <span v-else class="text-white font-semibold hidden sm:block">
                        Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}
                    </span>
                  </div>
                </div>

                <div
                  class="flex justify-end items-center pt-4 mt-2 border-t border-gray-700"
                >
                  <div class="text-right">
                    <span class="text-xs text-gray-400 block mb-1">Total Tagihan</span>
                    <strong class="text-2xl text-yellow-500"
                      >Rp {{ order.total.toLocaleString("id-ID") }}</strong
                    >
                  </div>
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

            <div v-if="loading.testimonials" class="text-center text-gray-500 py-4">
               Memuat testimoni...
            </div>

            <div v-else-if="myTestimonials.length === 0" class="text-center text-gray-500 py-4">
               Anda belum memberikan testimoni apapun.
            </div>

            <div v-else class="grid grid-cols-1 gap-4">
              <div
                v-for="t in myTestimonials"
                :key="t.id"
                class="bg-gray-900 p-4 rounded-xl border border-yellow-500/50 shadow-md relative overflow-hidden"
              >
                 <div class="flex justify-between items-center mb-2 relative z-10">
                    <span class="font-bold text-white">{{ t.products?.name }}</span>
                    <span class="text-yellow-400 text-sm tracking-widest">{{ '⭐'.repeat(t.rating) }}</span>
                 </div>
                 <p class="text-sm text-gray-400 mb-2 relative z-10">
                   {{ formatDate(t.created_at) }}
                 </p>
                 <p class="text-gray-300 italic border-l-2 border-yellow-500 pl-3 relative z-10">"{{ t.testimony_content }}"</p>
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

// State
const userProfile = ref({ name: "", email: "", role: "" });
const history = ref([]);
const myTestimonials = ref([]);
const loading = ref({ history: true, testimonials: true });

// Format Tanggal
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
};

// Styling Status
const statusClass = (status) => {
  switch (status) {
    case "completed": return "bg-green-900 text-green-300 border border-green-700";
    case "shipped": return "bg-blue-900 text-blue-300 border border-blue-700";
    case "pending": return "bg-yellow-900 text-yellow-300 border border-yellow-700";
    default: return "bg-gray-700 text-gray-300";
  }
};

// Navigasi ke Halaman Testimoni dengan Data
const goToReview = (orderId, productId, productName) => {
    router.push({
        path: '/testimonials',
        query: { 
            review: 'true', 
            order_id: orderId, 
            product_id: productId,
            product_name: productName
        }
    });
};

// Load Data
onMounted(async () => {
  const user = await getCurrentUser();
  if (!user) {
    router.push("/login");
    return;
  }

  userProfile.value = {
    name: user.full_name || "Pengguna",
    email: user.email,
    role: user.role || "customer",
  };

  const userId = user.id;

  // 1. Fetch Orders (Pastikan mengambil product_id)
  try {
    loading.value.history = true;
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select(`
        id, created_at, status, total,
        order_items (
          id, price, quantity, product_id,
          products (name)
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (ordersError) throw ordersError;
    history.value = ordersData || [];
  } catch (err) {
    console.error("Error fetch orders:", err);
  } finally {
    loading.value.history = false;
  }

  // 2. Fetch Testimonials
  try {
    loading.value.testimonials = true;
    const { data: testiData, error: testiError } = await supabase
      .from("testimonials")
      .select(`
        id, created_at, rating, testimony_content,
        products (name)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (testiError) throw testiError;
    myTestimonials.value = testiData || [];
  } catch (err) {
    console.error("Error fetch testimonials:", err);
  } finally {
    loading.value.testimonials = false;
  }
});

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};
</script>