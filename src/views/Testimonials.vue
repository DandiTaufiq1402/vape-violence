/*
danditaufiq1402/vape-violence/vape-violence-4cbd0ad96d9540541e48100e68d1308e5829ba4f/src/views/Testimonials.vue
(FILE BARU) */

<template>
  <div class="min-h-screen bg-black text-white p-6">
    <div class="max-w-7xl mx-auto py-12">
      <h1 class="text-3xl font-extrabold text-center mb-12">Testimonials</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(t, index) in testimonials"
          :key="index"
          class="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-cyan-500/10 transition duration-300"
        >
          <div class="flex items-center mb-4">
            <svg
              class="w-12 h-12 text-cyan-400 mr-4 border-2 border-cyan-500 rounded-full p-2 bg-gray-700"
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
            <div>
              <h3 class="font-bold text-lg text-white">{{ t.name }}</h3>
              <p class="text-sm text-yellow-500">{{ t.role }}</p>
            </div>
          </div>
          <p class="text-gray-300 italic">"{{ t.testimony }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Testimonials",
  data() {
    return {
      testimonials: [
        // Daftar Testimoni sudah memiliki path dynamic, tidak perlu diubah.
        {
          name: "Abdul",
          role: "Tester",
          testimony:
            "Rasa liquid Red Velvet ini *smooth* banget, cocok buat *vaping* harian. Tidak membuat coil cepat gosong. Benar-benar *premium*!",
        },
        {
          name: "Felan Ardenta Yoga Adiyatama",
          role: "Tester",
          testimony:
            "Mod Centaurus Edisi Khusus ini desainnya keren parah! Chipsetnya responsif, powernya stabil, dan baterainya awet seharian. *Highly recommended*.",
        },
        {
          name: "Evan Alpha Edison",
          role: "Tester",
          testimony:
            "Cotton Bacon-nya memang beda, kapas menyerap liquid cepat dan tidak ada rasa aneh. Uap yang dihasilkan tebal dan bersih.",
        },
        {
          name: "Vargas Cahyadi",
          role: "Tester",
          testimony:
            "Liquid Salt Nic Mint Freeze ini dinginnya pas banget! Cocok buat yang suka sensasi *fresh* dan *throat hit* yang halus. Tidak bikin eneg.",
        },
        {
          name: "Afnan Daniels",
          role: "Tester",
          testimony:
            "Pelayanan di store ini luar biasa! *Coiling* dan *wicking* rapi, konsultasi soal liquid juga sangat membantu, berasa seperti keluarga.",
        },
        {
          name: "Turtusi ",
          role: "Tester",
          testimony:
            "Saya beralih ke pod karena Hexom V3 ini! Ukurannya nyaman digenggam dan rasanya *nendang*. Benar-benar *plug and play* yang memuaskan.",
        },
        {
          name: "Beryl agatha",
          role: "Tester",
          testimony:
            "Liquid rasa Sop Buah ini unik dan kompleks, seperti meminum es buah sungguhan. Sensasi *fruity*-nya tidak tertandingi. Selalu jadi andalan!",
        },
        {
          name: "Arya Ayatra ",
          role: "Tester",
          testimony:
            "Saya pakai RTA merek ini dan *anti-leaking* parah! Tidak perlu khawatir liquid tumpah di saku. Build quality-nya memang jempolan.",
        },
        {
          name: "Reyza Achyar",
          role: "Tester",
          testimony:
            "Harga liquid di sini sangat bersaing dan produknya dijamin original. Pilihan rasanya juga paling lengkap di kota ini. Sukses terus!",
        },
        {
          name: "Dandi Taufiq",
          role: "Tester",
          testimony:
            "Meskipun harganya sedikit lebih mahal, kualitas *mesh coil* di sini sangat sepadan. Rasa yang keluar maksimal dan tahan lama.",
        },
      ],
    };
  },
};
</script>
