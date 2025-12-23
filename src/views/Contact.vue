<!-- src/views/Contact.vue -->
<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-5xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-10">
        Contact
      </h1>

      <!-- Contact Section -->
      <section>
        <div
          class="bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <!-- Left Image -->
          <div
            class="hidden md:flex w-1/2 bg-cover bg-center min-h-[500px] items-center justify-center"
            style="background-image: url('/img/contact-side.jpg')"
          >
            <img
              src="/vite.svg"
              alt="Logo Vape Store"
              class="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            />
          </div>

          <!-- Right Form -->
          <div class="w-full md:w-1/2 p-10">
            <h2 class="text-3xl font-bold mb-8 text-center">
              Contact
            </h2>

            <form class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-semibold text-gray-400 mb-1"
                >
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama anda"
                  class="w-full bg-white text-black p-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-400 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email anda"
                  class="w-full bg-white text-black p-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label
                  for="telp"
                  class="block text-sm font-semibold text-gray-400 mb-1"
                >
                  No. Telp
                </label>
                <input
                  id="telp"
                  type="tel"
                  placeholder="Masukkan no telepon anda"
                  class="w-full bg-white text-black p-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label
                  for="deskripsi"
                  class="block text-sm font-semibold text-gray-400 mb-1"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  rows="4"
                  placeholder="Masukkan deskripsi anda"
                  class="w-full bg-white text-black p-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition mt-6"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Footer Promo -->
      <div class="mt-12 pt-4 border-t border-gray-700 text-center bg-black p-4">
        <div class="text-lg font-bold mb-1">
          🚚 Gratis Ongkir untuk pembelian di atas Rp 1.000.000
        </div>
        <p class="text-gray-400 text-sm">
          Berlaku di seluruh daerah Jabodetabek
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
};
</script>
