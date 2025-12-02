// src/views/Admin/Orders.vue

<template>
  <div class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
    <h1
      class="text-3xl font-extrabold mb-8 text-yellow-500 border-b border-gray-700 pb-3"
    >
      Manajemen Orders
    </h1>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Memuat data order...
    </div>
    <div
      v-else
      class="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <table class="w-full text-left text-gray-300">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th class="p-3 border-b border-gray-600">ID Order</th>
            <th class="p-3 border-b border-gray-600">Pelanggan</th>
            <th class="p-3 border-b border-gray-600">Total</th>
            <th class="p-3 border-b border-gray-600">Status</th>
            <th class="p-3 border-b border-gray-600">Tanggal</th>
            <th class="p-3 border-b border-gray-600">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="p-3">{{ order.id }}</td>
            <td class="p-3 font-medium text-white">
              {{ order.users?.full_name || "N/A" }}
            </td>
            <td class="p-3">Rp {{ formatCurrency(order.total) }}</td>
            <td class="p-3">
              <span
                :class="statusClass(order.status)"
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="p-3">{{ formatDate(order.created_at) }}</td>
            <td class="p-3 space-x-2 whitespace-nowrap">
              <button
                @click="updateStatus(order.id, 'shipped', order.status)"
                :disabled="order.status !== 'pending'"
                class="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                Set Kirim
              </button>
              <button
                @click="updateStatus(order.id, 'completed', order.status)"
                :disabled="order.status === 'completed'"
                class="bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                Set Selesai
              </button>
              <button
                @click="viewOrderDetails(order)"
                class="bg-gray-600 text-white px-3 py-1 text-xs rounded hover:bg-gray-700 transition"
              >
                Detail
              </button>
            </td>
          </tr>
          <tr v-if="orders.length === 0 && !loading">
            <td colspan="6" class="p-4 text-center text-gray-500">
              Tidak ada order yang ditemukan.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabase";

export default {
  name: "AdminOrders",
  setup() {
    const orders = ref([]);
    const loading = ref(true);

    const fetchOrders = async () => {
      loading.value = true;
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
            *,
            users (full_name)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat order:", error.message);
      } else {
        orders.value = data || [];
      }
      loading.value = false;
    };

    const updateStatus = async (id, newStatus, currentStatus) => {
      if (newStatus === "shipped" && currentStatus !== "pending") {
        alert("Order harus berstatus 'pending' untuk dikirim.");
        return;
      }
      if (
        confirm(`Ubah status Order #${id} menjadi ${newStatus.toUpperCase()}?`)
      ) {
        const { error } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", id);

        if (error) {
          alert("Gagal update status: " + error.message);
        } else {
          alert(`Status Order #${id} berhasil diubah menjadi ${newStatus}.`);
          fetchOrders();
        }
      }
    };

    const formatCurrency = (value) => Number(value).toLocaleString("id-ID");
    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    const statusClass = (status) => {
      return (
        {
          "bg-yellow-800 text-yellow-300": status === "pending",
          "bg-blue-800 text-blue-300": status === "shipped",
          "bg-green-800 text-green-300": status === "completed",
        }[status] || "bg-gray-500 text-white"
      );
    };

    const viewOrderDetails = (order) => {
      alert(
        `Fungsi Detail Order #${order.id} belum diimplementasikan. Anda akan menggunakan order_items untuk menampilkan detail produk.`
      );
    };

    onMounted(() => {
      fetchOrders();
    });

    return {
      orders,
      loading,
      formatCurrency,
      formatDate,
      statusClass,
      updateStatus,
      viewOrderDetails,
    };
  },
};
</script>
