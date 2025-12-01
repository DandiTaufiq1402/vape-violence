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
            <img
              :src="t.avatar"
              alt="Avatar"
              class="w-12 h-12 rounded-full object-cover mr-4 border-2 border-cyan-500"
            />
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
          name: "Dandi Jenyong",
          role: "Gold Lane",
          avatar: "/img/avatar1.jpg",
          testimony:
            "Rasa liquid Red Velvet ini *smooth* banget, cocok buat *vaping* harian. Tidak membuat coil cepat gosong. Benar-benar *premium*!",
        },
        {
          name: "Felan Ardenta Yoga Adiyatama",
          role: "EXP Lane",
          avatar: "/img/avatar2.jpg",
          testimony:
            "Mod Centaurus Edisi Khusus ini desainnya keren parah! Chipsetnya responsif, powernya stabil, dan baterainya awet seharian. *Highly recommended*.",
        },
        {
          name: "Evan Alpha Edison",
          role: "Mid Lane",
          avatar: "/img/avatar3.jpg",
          testimony:
            "Cotton Bacon-nya memang beda, kapas menyerap liquid cepat dan tidak ada rasa aneh. Uap yang dihasilkan tebal dan bersih.",
        },
        {
          name: "Vargas Kopling",
          role: "Gold Lane",
          avatar: "/img/avatar4.jpg",
          testimony:
            "Liquid Salt Nic Mint Freeze ini dinginnya pas banget! Cocok buat yang suka sensasi *fresh* dan *throat hit* yang halus. Tidak bikin eneg.",
        },
        {
          name: "Afnan Daniels",
          role: "Roamer Lane",
          avatar: "/img/avatar5.jpg",
          testimony:
            "Pelayanan di store ini luar biasa! *Coiling* dan *wicking* rapi, konsultasi soal liquid juga sangat membantu, berasa seperti keluarga.",
        },
        {
          name: "Turtusi Starboy",
          role: "Mid Lane",
          avatar: "/img/avatar6.jpg",
          testimony:
            "Saya beralih ke pod karena Hexom V3 ini! Ukurannya nyaman digenggam dan rasanya *nendang*. Benar-benar *plug and play* yang memuaskan.",
        },
        {
          name: "Beryl Tamarag",
          role: "Jungle Lane",
          avatar: "/img/avatar7.jpg",
          testimony:
            "Liquid rasa Sop Buah ini unik dan kompleks, seperti meminum es buah sungguhan. Sensasi *fruity*-nya tidak tertandingi. Selalu jadi andalan!",
        },
        {
          name: "Arya Ayatra Futsal Club",
          role: "Mid Lane",
          avatar: "/img/avatar8.jpg",
          testimony:
            "Saya pakai RTA merek ini dan *anti-leaking* parah! Tidak perlu khawatir liquid tumpah di saku. Build quality-nya memang jempolan.",
        },
        {
          name: "Reyza Achyar",
          role: "Mid Lane",
          avatar: "/img/avatar9.jpg",
          testimony:
            "Harga liquid di sini sangat bersaing dan produknya dijamin original. Pilihan rasanya juga paling lengkap di kota ini. Sukses terus!",
        },
        {
          name: "Dandy Jenong Hama",
          role: "Gold Lane",
          avatar: "/img/avatar10.jpg",
          testimony:
            "Meskipun harganya sedikit lebih mahal, kualitas *mesh coil* di sini sangat sepadan. Rasa yang keluar maksimal dan tahan lama.",
        },
      ],
    };
  },
};
</script>
