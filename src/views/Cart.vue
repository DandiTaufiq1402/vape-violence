/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/Cart.vue
*/

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-extrabold text-white text-center mb-8">
      {{ step === "cart" ? "CART" : "SUMMARY" }}
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
                "Saya sangat suka berantem dengan pemain Gold Lane yaitu si
                Dandi..." (Detail Produk).
              </p>
              <button
                v-if="step === 'cart'"
                @click="removeItem(index)"
                class="text-red-500 text-xs hover:text-red-400 transition"
              >
                Remove Item
              </button>
            </div>

            <div class="text-right">
              <strong class="text-lg text-white block mb-2">
                Rp {{ (item.price * item.qty).toLocaleString("id-ID") }}
              </strong>

              <div
                v-if="step === 'cart'"
                class="flex items-center border border-cyan-500 rounded-lg overflow-hidden"
              >
                <button
                  @click="changeQuantity(index, -1)"
                  :disabled="item.qty <= 1"
                  class="bg-cyan-700 text-white px-3 py-1 hover:bg-cyan-600 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="text"
                  :value="item.qty"
                  readonly
                  class="w-10 text-center bg-gray-800 text-white border-x border-cyan-700 p-0"
                />
                <button
                  @click="changeQuantity(index, 1)"
                  class="bg-cyan-700 text-white px-3 py-1 hover:bg-cyan-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!items.length" class="text-center py-10 text-gray-400">
          Keranjang belanja Anda kosong.
        </div>
      </div>

      <div v-if="items.length" class="lg:col-span-1">
        <div
          v-if="step === 'summary'"
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
              <span>Shipping :</span>
              <span :class="{ 'text-green-400': shippingFee === 0 }">
                Rp {{ shippingFee.toLocaleString("id-ID") }}
                <span v-if="shippingFee === 0" class="text-xs ml-1"
                  >(Gratis)</span
                >
              </span>
            </div>
            <div class="flex justify-between items-center text-gray-400">
              <span>Voucher :</span>
              <div class="flex items-center gap-2">
                <span class="text-red-500"
                  >- Rp {{ voucherDiscount.toLocaleString("id-ID") }}</span
                >
                <button
                  class="bg-yellow-500 text-gray-900 px-2 py-1 text-xs rounded-lg font-bold hover:bg-yellow-400 transition"
                >
                  ADD NOW
                </button>
              </div>
            </div>
            <div class="border-t border-gray-700 pt-3 flex justify-between">
              <strong class="text-xl text-yellow-500">Total</strong>
              <strong class="text-xl text-white"
                >Rp {{ total.toLocaleString("id-ID") }}</strong
              >
            </div>
          </div>

          <h3 class="text-lg font-bold mt-6 mb-3 text-white">
            Pilih Metode Pembayaran
          </h3>
          <div class="space-y-2">
            <button
              class="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              @click="
                showPaymentPopup = true;
                paymentMethod = 'qris';
              "
            >
              QRIS
            </button>
            <button
              class="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              @click="
                showPaymentPopup = true;
                paymentMethod = 'mandiri';
              "
            >
              Mandiri
            </button>
            <button
              class="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              @click="
                showPaymentPopup = true;
                paymentMethod = 'bca';
              "
            >
              BCA
            </button>
          </div>
        </div>

        <button
          v-if="step === 'cart'"
          @click="step = 'summary'"
          class="w-full mt-4 bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition duration-300 transform hover:scale-[1.01]"
        >
          Beli Sekarang
        </button>

        <button
          v-if="step === 'summary' && !showPaymentPopup"
          @click="showPaymentPopup = true"
          class="w-full mt-4 bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition duration-300 transform hover:scale-[1.01]"
        >
          Bayar Sekarang
        </button>
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
      v-if="showPaymentPopup"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-900 p-8 rounded-xl w-full max-w-sm text-center border-2 border-cyan-500 shadow-2xl"
      >
        <h2 class="text-2xl font-bold mb-4 text-cyan-400">
          Silahkan lakukan pembayaran
        </h2>
        <p class="text-gray-400 mb-6">
          Scan Barcode diatas untuk membayar pesananmu
        </p>

        <div class="mx-auto w-40 h-40 bg-white p-2 rounded-lg mb-6">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <rect width="100" height="100" fill="white" />
            <path
              d="M10 10H40V40H10z M60 10H90V40H60z M10 60H40V90H10z M25 75h5v5h-5z M75 25h5v5h-5z M75 75h5v5h-5z M45 45h10v10h-10z M5 5H95V95H5z"
              fill="black"
            />
            <rect x="15" y="15" width="20" height="20" fill="black" />
            <rect x="65" y="15" width="20" height="20" fill="black" />
            <rect x="15" y="65" width="20" height="20" fill="black" />
          </svg>
        </div>

        <button
          @click="handlePaymentSuccess"
          class="bg-yellow-500 text-black font-bold py-2 px-8 rounded-lg hover:bg-yellow-400 transition mr-4"
        >
          Bayar Sekarang
        </button>
        <button
          @click="showPaymentPopup = false"
          class="bg-gray-700 text-white font-bold py-2 px-8 rounded-lg hover:bg-gray-600 transition"
        >
          Batal Bayar
        </button>
      </div>
    </div>

    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-900 p-8 rounded-xl w-full max-w-sm text-center border-2 border-green-500 shadow-2xl"
      >
        <svg
          class="w-16 h-16 text-green-500 mx-auto mb-4"
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
        <h2 class="text-2xl font-bold mb-4 text-green-400">
          Pembayaran Berhasil!
        </h2>
        <p class="text-gray-400 mb-6">
          Terima kasih. Pesanan Anda akan segera diproses.
        </p>
        <button
          @click="resetCart"
          class="bg-cyan-600 text-black font-bold py-2 px-8 rounded-lg hover:bg-cyan-500 transition"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      step: "cart", // 'cart' atau 'summary'
      showPaymentPopup: false,
      showSuccessPopup: false,
      paymentMethod: "",
      // Data Dummy untuk Cart
      items: [
        {
          id: 1,
          name: "Centaurus M200",
          qty: 1,
          price: 899000,
          image: "/img/centaurus_mod.jpg", // Placeholder
        },
        {
          id: 2,
          name: "Blueberry Salt Nic",
          qty: 1,
          price: 129000,
          image: "/img/blueberry_liquid.jpg", // Placeholder
        },
      ],
      voucherDiscount: 0, // Simulasi diskon voucher
      freeShippingThreshold: 999000,
      baseShippingFee: 18900,
    };
  },
  computed: {
    subtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    shippingFee() {
      // Gratis Ongkir jika subtotal melebihi threshold
      return this.subtotal > this.freeShippingThreshold
        ? 0
        : this.baseShippingFee;
    },
    total() {
      return this.subtotal + this.shippingFee - this.voucherDiscount;
    },
  },
  methods: {
    // Fungsi untuk menambah/mengurangi kuantitas
    changeQuantity(index, delta) {
      const item = this.items[index];
      const newQty = item.qty + delta;
      if (newQty >= 1) {
        this.items[index].qty = newQty;
      }
    },
    // Fungsi untuk menghapus item
    removeItem(index) {
      if (
        confirm(
          `Yakin ingin menghapus ${this.items[index].name} dari keranjang?`
        )
      ) {
        this.items.splice(index, 1);
        // Jika menghapus item membuat keranjang kosong dan sedang di langkah summary, kembali ke cart
        if (!this.items.length && this.step === "summary") {
          this.step = "cart";
        }
      }
    },
    // Fungsi simulasi pembayaran berhasil
    handlePaymentSuccess() {
      this.showPaymentPopup = false;
      // Simulasi jeda pembayaran 1 detik
      setTimeout(() => {
        this.showSuccessPopup = true;
      }, 1000);
    },
    // Fungsi untuk mereset cart dan kembali ke home
    resetCart() {
      this.showSuccessPopup = false;
      this.step = "cart";
      this.items = []; // Kosongkan keranjang
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.input-qty {
  /* Menyesuaikan input agar terlihat bagus di dark mode */
  @apply appearance-none text-center bg-gray-700 text-white p-0 border-none;
}
</style>
