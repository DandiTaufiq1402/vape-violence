<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-extrabold text-white text-center mb-8">
      {{ step === "cart" ? "KERANJANG" : "RINGKASAN PESANAN" }}
    </h1>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div v-for="(item, index) in items" :key="item.id" class="mb-4">
          <div
            class="bg-gray-900 p-4 rounded-xl shadow-xl flex items-center border border-cyan-800/50"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-24 h-24 object-cover rounded-lg mr-4 border border-yellow-500/50"
            />
            <div class="flex-grow">
              <h2 class="text-xl font-bold text-yellow-500">
                {{ item.name }}
              </h2>
              <p class="text-sm text-gray-400 max-w-lg mb-2 truncate">
                {{ item.category_name || "Produk Berkualitas" }}
              </p>
              <button
                v-if="step === 'cart'"
                @click="removeItem(index)"
                class="text-red-500 text-xs hover:text-red-400 transition"
              >
                Hapus Item
              </button>
            </div>

            <div class="text-right">
              <strong class="text-lg text-white block mb-2">
                Rp {{ (item.price * item.qty).toLocaleString("id-ID") }}
              </strong>

              <div
                v-if="step === 'cart'"
                class="flex items-center justify-end border border-cyan-500 rounded-lg overflow-hidden w-fit ml-auto"
              >
                <button
                  @click="changeQuantity(index, -1)"
                  :disabled="item.qty <= 1"
                  class="bg-cyan-700 text-white px-3 py-1 hover:bg-cyan-600 disabled:opacity-50"
                >
                  -
                </button>
                <span class="w-10 text-center bg-gray-800 text-white p-1">{{
                  item.qty
                }}</span>
                <button
                  @click="changeQuantity(index, 1)"
                  class="bg-cyan-700 text-white px-3 py-1 hover:bg-cyan-600"
                >
                  +
                </button>
              </div>
              <span v-else class="text-gray-400 text-sm">x{{ item.qty }}</span>
            </div>
          </div>
        </div>

        <div v-if="!items.length" class="text-center py-10 text-gray-400">
          Keranjang belanja Anda kosong.
          <br />
          <router-link to="/" class="text-yellow-500 hover:underline mt-2 inline-block">
            Mulai Belanja
          </router-link>
        </div>
      </div>

      <div v-if="items.length" class="lg:col-span-1">
        <div
          class="bg-gray-900 p-6 rounded-xl shadow-xl border border-cyan-700 sticky top-6"
        >
          <h2 class="text-2xl font-bold mb-4 text-yellow-500">
            Rincian Belanja
          </h2>

          <div class="space-y-3">
            <div class="flex justify-between text-gray-400">
              <span>Subtotal :</span>
              <span>Rp {{ subtotal.toLocaleString("id-ID") }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Ongkos Kirim :</span>
              <span :class="{ 'text-green-400': shippingFee === 0 }">
                Rp {{ shippingFee.toLocaleString("id-ID") }}
                <span v-if="shippingFee === 0" class="text-xs ml-1"
                  >(Gratis)</span
                >
              </span>
            </div>
            <div class="border-t border-gray-700 pt-3 flex justify-between">
              <strong class="text-xl text-yellow-500">Total Tagihan</strong>
              <strong class="text-xl text-white"
                >Rp {{ total.toLocaleString("id-ID") }}</strong
              >
            </div>
          </div>

          <div v-if="step === 'summary'" class="mt-6">
            <h3 class="text-lg font-bold mb-3 text-white">
              Pilih Metode Pembayaran
            </h3>
            <div class="space-y-2">
              <button
                v-for="method in ['qris', 'mandiri', 'bca']"
                :key="method"
                @click="selectPayment(method)"
                :class="
                  paymentMethod === method
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                "
                class="w-full py-3 rounded-lg transition border border-gray-600 uppercase"
              >
                {{ method }}
              </button>
            </div>
          </div>

          <button
            v-if="step === 'cart'"
            @click="step = 'summary'"
            class="w-full mt-6 bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-[1.01]"
          >
            Lanjut ke Pembayaran
          </button>

          <button
            v-if="step === 'summary'"
            @click="processPayment"
            :disabled="isProcessing || !paymentMethod"
            class="w-full mt-6 bg-cyan-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isProcessing ? "Memproses..." : "Bayar Sekarang" }}
          </button>

          <button
            v-if="step === 'summary'"
            @click="step = 'cart'"
            class="w-full mt-2 text-gray-400 hover:text-white py-2 transition text-sm"
          >
            Kembali ke Keranjang
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8 pt-4 border-t border-gray-700 text-center">
      <div class="text-2xl font-bold text-gray-300 mb-2">
        <span class="text-yellow-500">Gratis Ongkir</span> untuk pembelian di
        atas Rp 999.000
      </div>
      <p class="text-gray-500">Berlaku di seluruh daerah Jabodetabek</p>
    </div>

    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 p-8 rounded-xl w-full max-w-md text-center border-2 border-green-500 shadow-2xl"
      >
        <svg
          class="w-20 h-20 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 class="text-2xl font-bold mb-2 text-green-400">
          Pembayaran Berhasil!
        </h2>
        <p class="text-gray-300 mb-6">
          Terima kasih. Pesanan Anda telah tersimpan dan sedang diproses.
        </p>
        <button
          @click="finishOrder"
          class="bg-cyan-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-cyan-500 transition w-full"
        >
          Lihat Profil & Riwayat
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../lib/supabase"; // Pastikan path ini benar
import { getCurrentUser } from "../lib/Auth"; // Pastikan path ini benar

export default {
  name: "Cart",
  data() {
    return {
      step: "cart", // 'cart' | 'summary'
      items: [],
      paymentMethod: "",
      isProcessing: false,
      showSuccessPopup: false,
      freeShippingThreshold: 999000,
      baseShippingFee: 18900,
      currentUser: null,
    };
  },
  computed: {
    subtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    shippingFee() {
      return this.subtotal > this.freeShippingThreshold
        ? 0
        : this.baseShippingFee;
    },
    total() {
      return this.subtotal + this.shippingFee;
    },
  },
  async mounted() {
    this.loadCartFromStorage();
    window.addEventListener("storage", this.handleStorageChange);

    // Cek User Login
    this.currentUser = await getCurrentUser();
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.handleStorageChange);
  },
  methods: {
    loadCartFromStorage() {
      const cartString = localStorage.getItem("user_cart");
      this.items = cartString ? JSON.parse(cartString) : [];
      if (!this.items.length && this.step === "summary") {
        this.step = "cart";
      }
    },
    saveCartToStorage() {
      localStorage.setItem("user_cart", JSON.stringify(this.items));
    },
    handleStorageChange(event) {
      if (event.key === "user_cart") {
        this.loadCartFromStorage();
      }
    },
    changeQuantity(index, delta) {
      const newQty = this.items[index].qty + delta;
      if (newQty >= 1) {
        this.items[index].qty = newQty;
        this.saveCartToStorage();
      }
    },
    removeItem(index) {
      if (confirm(`Hapus ${this.items[index].name} dari keranjang?`)) {
        this.items.splice(index, 1);
        this.saveCartToStorage();
        if (!this.items.length) this.step = "cart";
      }
    },
    selectPayment(method) {
      this.paymentMethod = method;
    },
    
    // --- LOGIC UTAMA: MENYIMPAN KE SUPABASE ---
    async processPayment() {
      if (!this.currentUser) {
        alert("Silakan login terlebih dahulu untuk menyelesaikan pesanan.");
        this.$router.push("/login");
        return;
      }

      if (!this.paymentMethod) {
        alert("Pilih metode pembayaran terlebih dahulu.");
        return;
      }

      this.isProcessing = true;

      try {
        // 1. Simpan Data ke Tabel 'orders'
        // Status awal bisa 'pending' atau 'completed' (tergantung alur bisnis Anda).
        // Untuk demo agar langsung bisa direview di profile, kita set 'completed'.
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert([
            {
              user_id: this.currentUser.id,
              total: this.total,
              status: "completed", // Langsung completed agar muncul di history
            },
          ])
          .select()
          .single();

        if (orderError) throw new Error("Gagal membuat order: " + orderError.message);

        const orderId = orderData.id;

        // 2. Siapkan Data Item untuk Tabel 'order_items'
        const orderItemsPayload = this.items.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          quantity: item.qty,
          price: item.price,
        }));

        // 3. Simpan Data ke Tabel 'order_items'
        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) throw new Error("Gagal menyimpan item: " + itemsError.message);

        // 4. Jika Sukses
        this.showSuccessPopup = true;
        
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        this.isProcessing = false;
      }
    },

    finishOrder() {
      this.showSuccessPopup = false;
      this.step = "cart";
      this.items = [];
      localStorage.removeItem("user_cart");
      // Redirect ke Profile untuk melihat history
      this.$router.push("/profile");
    },
  },
};
</script>