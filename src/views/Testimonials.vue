<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-7xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-4 text-yellow-500">
        Testimoni Pelanggan
      </h1>
      <p class="text-center text-gray-400 mb-12">
        Apa kata mereka tentang produk dan layanan Violet Vape Store
      </p>

      <section class="mb-16">
        <div class="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
            <h2 class="text-2xl font-bold text-white">Semua Ulasan</h2>
        </div>
        
        <div v-if="publicLoading" class="text-center text-gray-500 py-10">
            Memuat semua ulasan...
        </div>
        
        <div v-else-if="publicTestimonials.length === 0" class="text-center bg-gray-900 p-8 rounded-xl">
             Belum ada ulasan yang masuk.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="t in publicTestimonials" 
                :key="t.id"
                class="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition shadow-lg"
            >
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-200 font-bold mr-3">
                            {{ t.users?.full_name?.charAt(0).toUpperCase() || '?' }}
                        </div>
                        <div>
                            <h3 class="font-bold text-white text-sm">{{ t.users?.full_name || 'Anonymous' }}</h3>
                            <p class="text-xs text-gray-500">{{ formatDate(t.created_at) }}</p>
                        </div>
                    </div>
                    <div class="bg-gray-800 px-2 py-1 rounded text-yellow-400 text-xs font-bold">
                        {{ '⭐'.repeat(t.rating) }}
                    </div>
                </div>
                
                <div class="mb-3">
                    <span class="text-xs text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded">
                        Produk: {{ t.products?.name }}
                    </span>
                </div>

                <p class="text-gray-300 text-sm italic">
                    "{{ t.testimony_content }}"
                </p>
            </div>
        </div>
      </section>

      <section v-if="isLoggedIn" class="border-t border-gray-800 pt-12">
        <h2 class="text-2xl font-bold mb-8 text-cyan-400">Area Review Saya</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="font-bold text-white mb-4 border-l-4 border-yellow-500 pl-3">Menunggu Ulasan</h3>
                <div v-if="loading.orders" class="text-gray-500 text-sm">Loading...</div>
                <div v-else-if="ordersToReview.length === 0" class="bg-gray-900 p-4 rounded text-gray-500 text-sm">
                    Tidak ada transaksi selesai yang perlu diulas.
                </div>
                <div v-else class="space-y-4">
                    <div v-for="order in ordersToReview" :key="order.id" class="bg-gray-800 p-4 rounded-lg">
                        <div class="text-xs text-gray-400 mb-2">Order #{{ order.id }}</div>
                        <div v-for="item in order.order_items" :key="item.id">
                            <div v-if="!item.has_reviewed" class="flex justify-between items-center py-2 border-t border-gray-700 mt-2">
                                <span class="text-white text-sm">{{ item.products?.name }}</span>
                                <button 
                                    @click="openReviewModal(order, item)"
                                    class="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded hover:bg-yellow-400"
                                >
                                    Tulis Ulasan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                 <h3 class="font-bold text-white mb-4 border-l-4 border-green-500 pl-3">Riwayat Ulasan Anda</h3>
                 <div v-if="myHistory.length === 0" class="text-gray-500 text-sm">Belum ada ulasan yang Anda buat.</div>
                 <div v-else class="space-y-3">
                    <div v-for="h in myHistory" :key="h.id" class="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                        <span class="text-white text-sm truncate w-1/2">{{ h.products?.name }}</span>
                        <div class="flex items-center gap-2">
                            <span class="text-yellow-500 text-xs">{{ '⭐'.repeat(h.rating) }}</span>
                            <button @click="deleteTestimonial(h.id)" class="text-red-500 text-xs hover:underline">Hapus</button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      <section v-else class="text-center py-10 bg-gray-900 rounded-xl border border-dashed border-gray-700 mt-8">
          <p class="text-gray-400 mb-4">Sudah pernah berbelanja di sini?</p>
          <router-link to="/login" class="bg-cyan-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-cyan-500 transition">
              Login untuk Memberi Ulasan
          </router-link>
      </section>

    </div>

    <div v-if="showReviewModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-gray-900 p-8 rounded-xl w-full max-w-lg text-left border-2 border-yellow-500 shadow-2xl">
        <h2 class="text-2xl font-bold mb-4 text-yellow-500">Ulas Produk: {{ selectedReview.product_name }}</h2>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-1">Rating</label>
            <div class="flex space-x-2 mb-2">
                <button type="button" v-for="star in 5" :key="star" @click="reviewForm.rating = star" class="text-2xl focus:outline-none transition transform hover:scale-110" :class="star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-600'">★</button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-1">Testimoni Anda</label>
            <textarea v-model="reviewForm.content" rows="4" placeholder="Ceritakan pengalaman Anda..." required class="input w-full bg-gray-700 border-gray-600 text-white p-3 rounded-lg focus:border-cyan-500"></textarea>
          </div>
          <div class="flex justify-end space-x-4 pt-2">
            <button type="button" @click="showReviewModal = false" class="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition">Batal</button>
            <button type="submit" class="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 transition">Kirim</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/Auth";

const route = useRoute();
const router = useRouter();

// State Public
const publicTestimonials = ref([]);
const publicLoading = ref(true);

// State Private
const isLoggedIn = ref(false);
const currentUser = ref(null);
const ordersToReview = ref([]);
const myHistory = ref([]);
const loading = ref({ orders: false, history: false });

// Modal State
const showReviewModal = ref(false);
const selectedReview = ref({});
const reviewForm = ref({ rating: 5, content: "" });

const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });

// 1. Fetch Data Public (Semua Testimoni)
const fetchPublicTestimonials = async () => {
    publicLoading.value = true;
    const { data, error } = await supabase
        .from("testimonials")
        .select(`id, rating, testimony_content, created_at, users(full_name), products(name)`)
        .order("created_at", { ascending: false });
    
    if (data) publicTestimonials.value = data;
    publicLoading.value = false;
};

// 2. Fetch Data Private (Jika Login)
const fetchPrivateData = async () => {
    const user = await getCurrentUser();
    if (!user) {
        isLoggedIn.value = false;
        return;
    }
    
    isLoggedIn.value = true;
    currentUser.value = user;
    loading.value.history = true;
    loading.value.orders = true;

    // Ambil History Ulasan Saya
    const { data: myData } = await supabase
        .from("testimonials")
        .select(`id, rating, order_id, created_at, products(name)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
    
    if (myData) myHistory.value = myData;

    // Ambil Orders untuk Diulas
    const { data: orders } = await supabase
        .from("orders")
        .select(`id, status, order_items(id, product_id, quantity, products(name))`)
        .eq("user_id", user.id)
        .eq("status", "completed");

    if (orders) {
        // Map mana yang sudah diulas
        const reviewedProductIds = new Set();
        // Cek berdasarkan kombinasi order_id + product_name (karena keterbatasan skema DB testimonial di awal)
        // Atau idealnya cek order_id di tabel testimonial jika ada.
        myData.forEach(t => {
            if(t.order_id) reviewedProductIds.add(`${t.order_id}-${t.products.name}`);
        });

        ordersToReview.value = orders.map(o => {
            o.order_items = o.order_items.map(item => ({
                ...item,
                has_reviewed: reviewedProductIds.has(`${o.id}-${item.products.name}`)
            }));
            return o;
        });
    }

    // Auto open modal dari query params
    if (route.query.review === 'true' && route.query.order_id) {
         const qOrderId = parseInt(route.query.order_id);
         const qProdId = parseInt(route.query.product_id);
         const targetOrder = ordersToReview.value.find(o => o.id === qOrderId);
         if(targetOrder) {
             const targetItem = targetOrder.order_items.find(i => i.product_id === qProdId);
             if(targetItem && !targetItem.has_reviewed) openReviewModal(targetOrder, targetItem);
         }
    }

    loading.value.orders = false;
    loading.value.history = false;
};

const openReviewModal = (order, item) => {
    selectedReview.value = { order_id: order.id, product_id: item.product_id, product_name: item.products.name };
    reviewForm.value.rating = 5;
    reviewForm.value.content = "";
    showReviewModal.value = true;
};

const submitReview = async () => {
    const payload = {
        user_id: currentUser.value.id,
        product_id: selectedReview.value.product_id,
        order_id: selectedReview.value.order_id,
        rating: reviewForm.value.rating,
        testimony_content: reviewForm.value.content
    };

    const { error } = await supabase.from("testimonials").insert([payload]);
    if (!error) {
        alert("Terima kasih atas ulasan Anda!");
        showReviewModal.value = false;
        router.replace({ query: null });
        fetchPublicTestimonials(); // Refresh public list
        fetchPrivateData(); // Refresh private list
    } else {
        alert("Gagal: " + error.message);
    }
};

const deleteTestimonial = async (id) => {
    if(!confirm("Hapus ulasan ini?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchPublicTestimonials();
    fetchPrivateData();
};

onMounted(() => {
    fetchPublicTestimonials();
    fetchPrivateData();
});
</script>