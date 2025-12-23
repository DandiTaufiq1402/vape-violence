<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] backdrop-blur-sm transition-opacity"
  >
    <div
      class="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-green-500/50 max-w-sm w-full text-center transform transition-all scale-100 hover:scale-105"
    >
      <div
        class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-900/30 mb-6 border-2 border-green-500"
      >
        <svg
          class="h-10 w-10 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h3 class="text-2xl font-extrabold text-white mb-2 tracking-wide">
        {{ title }}
      </h3>
      <p class="text-gray-400 mb-8 text-sm leading-relaxed">
        {{ message }}
      </p>

      <button
        @click="$emit('close')"
        class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-900/50 transition duration-300"
      >
        OK, Lanjutkan
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: {
    type: String,
    default: "Berhasil!",
  },
  message: {
    type: String,
    default: "Data produk berhasil disimpan ke database.",
  },
});

defineEmits(["close"]);
</script>
