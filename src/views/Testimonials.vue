// src/views/Testimonials.vue
// Customer Testimonials & Review Submission

<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-7xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-12 text-yellow-500">
        Riwayat & Testimoni Saya
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <h2
            class="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-cyan-400"
          >
            Testimoni Saya
          </h2>
          <div v-if="loading.testimonials" class="text-center text-gray-500 py-4">
            Memuat testimoni...
          </div>
          <div
            v-else-if="myTestimonials.length === 0"
            class="bg-gray-900 p-4 rounded-xl text-center text-gray-500"
          >
            Anda belum pernah memberikan testimoni.
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="t in myTestimonials"
              :key="t.id"
              class="bg-gray-900 p-4 rounded-xl border border-yellow-500 shadow-md"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-white truncate">{{ t.products?.name || 'Produk Dihapus' }}</h3>
                <span class="text-yellow-400 font-bold text-sm">
                  {{ '⭐'.repeat(t.rating) }}
                </span>
              </div>
              <p class="text-sm text-gray-400 mb-2">
                Order #{{ t.order_id }} | {{ formatDate(t.created_at) }}
              </p>
              <p class="text-gray-300 italic line-clamp-3">
                "{{ t.testimony_content }}"
              </p>
              </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h2
            class="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-cyan-400"
          >
            Pesanan Siap Diulas
          </h2>

          <div v-if="loading.orders" class="text-center text-gray-500 py-4">
            Memuat riwayat order...
          </div>
          <div
            v-else-if="ordersToReview.length === 0"
            class="bg-gray-900 p-4 rounded-xl text-center text-gray-500"
          >
            Tidak ada order yang sudah Selesai/Belum Diulas.
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="order in ordersToReview"
              :key="order.id"
              class="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-cyan-500 transition"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold text-yellow-500"
                  >Order #{{ order.id }}</span
                >
                <span class="text-sm text-gray-400"
                  >{{ formatDate(order.created_at) }} -
                  {{ order.status.toUpperCase() }}</span
                >
              </div>

              <div
                v-for="item in order.order_items"
                :key="item.id"
                class="flex justify-between items-center py-2 border-t border-gray-700"
              >
                <div class="flex items-center">
                  <span class="font-medium text-white">{{
                    item.products.name
                  }}</span>
                  <span class="text-sm text-gray-400 ml-2"
                    >(x{{ item.quantity }})</span
                  >
                </div>

                <div v-if="item.has_reviewed" class="text-green-500 text-sm font-semibold">
                    Sudah Diulas <span class="text-yellow-400 ml-1">({{ item.user_rating }} ⭐)</span>
                </div>
                <button
                  v-else
                  @click="
                    selectedReview = {
                      order_id: order.id,
                      product_id: item.product_id,
                      product_name: item.products.name,
                    };
                    reviewForm.product_name = item.products.name;
                    reviewForm.rating = 5;
                    reviewForm.content = '';
                    showReviewModal = true;
                  "
                  class="bg-cyan-600 text-black px-3 py-1 text-xs rounded-lg font-bold hover:bg-cyan-700 transition"
                >
                  Beri Ulasan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showReviewModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 p-8 rounded-xl w-full max-w-lg text-left border-2 border-yellow-500 shadow-2xl"
      >
        <h2 class="text-2xl font-bold mb-4 text-yellow-500">
          Ulas Produk: {{ selectedReview.product_name }}
        </h2>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-1"
              >Rating</label
            >
            <select
              v-model.number="reviewForm.rating"
              required
              class="input w-full bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:border-cyan-500"
            >
              <option :value="5">⭐⭐⭐⭐⭐ Sangat Baik</option>
              <option :value="4">⭐⭐⭐⭐ Baik</option>
              <option :value="3">⭐⭐⭐ Cukup</option>
              <option :value="2">⭐⭐ Kurang</option>
              <option :value="1">⭐ Buruk</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-1"
              >Testimoni Anda</label
            >
            <textarea
              v-model="reviewForm.content"
              rows="4"
              placeholder="Tulis testimoni Anda tentang produk ini..."
              required
              class="input w-full bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:border-cyan-500"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              @click="showReviewModal = false"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 transition"
            >
              Kirim Ulasan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/Auth";

const currentUser = ref(null);
const ordersToReview = ref([]);
const myTestimonials = ref([]);
const showReviewModal = ref(false);
const selectedReview = ref({});
const loading = ref({ orders: true, testimonials: true });

const reviewForm = ref({
  product_name: "",
  rating: 5,
  content: "",
});

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const fetchOrdersAndTestimonials = async () => {
  currentUser.value = await getCurrentUser();
  if (!currentUser.value) return; 

  const userId = currentUser.value.id;

  // 1. Fetch Existing Testimonials
  loading.value.testimonials = true;
  const { data: testimonialsData, error: tError } = await supabase
    .from("testimonials")
    .select(
      `
      id, created_at, rating, testimony_content, order_id,
      products (name) // Join to get product name
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!tError) {
    myTestimonials.value = testimonialsData || [];
  } else {
    console.error("Gagal memuat testimoni saya:", tError);
  }
  loading.value.testimonials = false;

  // 2. Fetch Completed Orders with Items
  loading.value.orders = true;
  const { data: ordersData, error: oError } = await supabase
    .from("orders")
    .select(
      `
      id, total, created_at, status,
      order_items (
        id, product_id, quantity, price,
        products (name) // Join to get product name
      )
    `
    )
    .eq("user_id", userId)
    .eq("status", "completed") // Only completed orders can be reviewed
    .order("created_at", { ascending: false });

  if (oError) {
    console.error("Gagal memuat order:", oError);
    loading.value.orders = false;
    return;
  }

  // 3. Process Orders to check review status
  // Build a map of existing reviews for quick lookup: Key: order_id-product_name
  const existingReviewsMap = new Map();
  myTestimonials.value.forEach((t) => {
    existingReviewsMap.set(`${t.order_id}-${t.products.name}`, t.rating);
  });

  ordersToReview.value = (ordersData || []).map((order) => {
    order.order_items = order.order_items.map((item) => {
      const reviewKey = `${order.id}-${item.products.name}`;
      const userRating = existingReviewsMap.get(reviewKey);
      
      return {
        ...item,
        has_reviewed: !!userRating,
        user_rating: userRating,
      };
    });
    return order;
  });

  loading.value.orders = false;
};

const submitReview = async () => {
  if (!currentUser.value) return;

  const payload = {
    user_id: currentUser.value.id,
    product_id: selectedReview.value.product_id,
    order_id: selectedReview.value.order_id,
    rating: reviewForm.value.rating,
    testimony_content: reviewForm.value.content,
  };

  // Pastikan user tidak bisa double review (unique constraint akan mencegah ini di DB)
  const { error } = await supabase.from("testimonials").insert([payload]);

  if (error) {
    // Error code '23505' adalah kode Postgres untuk Unique Violation
    if (error.code === '23505') { 
        alert("Anda sudah memberikan ulasan untuk produk ini pada transaksi yang sama.");
    } else {
        alert("Gagal mengirim ulasan: " + error.message);
    }
    console.error("Review submit error:", error);
  } else {
    alert("Ulasan berhasil dikirim! Terima kasih.");
    showReviewModal.value = false;
    // Refresh data
    await fetchOrdersAndTestimonials();
  }
};

onMounted(() => {
  fetchOrdersAndTestimonials();
});
</script>