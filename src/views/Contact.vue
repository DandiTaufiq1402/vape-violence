/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/Contact.vue
*/

<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-5xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-10 text-white">
        Contact
      </h1>

      <section>
        <div class="bg-gray-900 rounded-xl p-0 shadow-2xl overflow-hidden flex">
          <div
            class="hidden md:block w-1/2 bg-cover bg-center h-auto min-h-[500px]"
            style="background-image: url('/img/contact-side.jpg')"
          ></div>

          <div class="w-full md:w-1/2 p-10">
            <h2 class="text-3xl font-bold mb-8 text-center text-white">
              Contact
            </h2>

            <form class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-semibold text-gray-400 mb-1"
                  >Nama</label
                >
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
                  >Email</label
                >
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
                  >No. Telp</label
                >
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
                  >Deskripsi</label
                >
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

      <div class="mt-12 pt-4 border-t border-gray-700 text-center bg-black p-4">
        <div class="text-lg font-bold text-white mb-1">
          <span class="mr-2">🚚</span> Gratis Ongkir untuk pembelian di atas Rp
          999.000
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

<style scoped>
/* Placeholder style for contact image */
.min-h-\[500px\] {
  min-height: 500px;
}
</style>
