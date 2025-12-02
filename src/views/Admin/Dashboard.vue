// src/views/Admin/Dashboard.vue

<template>
  <div class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
    <h1
      class="text-3xl font-extrabold mb-8 text-yellow-500 border-b border-gray-700 pb-3"
    >
      Admin Dashboard
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div
        class="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-cyan-500"
      >
        <p class="text-sm font-semibold text-gray-400">Total Produk</p>
        <strong class="text-3xl font-bold mt-1 block">{{
          formatNumber(metrics.totalProducts)
        }}</strong>
        <p class="text-xs text-gray-500 mt-2">
          Stok Keseluruhan: {{ formatNumber(metrics.totalStock) }}
        </p>
      </div>

      <div
        class="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-yellow-500"
      >
        <p class="text-sm font-semibold text-gray-400">
          Total Orders (Completed)
        </p>
        <strong class="text-3xl font-bold mt-1 block">{{
          formatNumber(metrics.totalOrders)
        }}</strong>
        <p class="text-xs text-gray-500 mt-2">
          Pending Orders: {{ formatNumber(metrics.pendingOrders) }}
        </p>
      </div>

      <div
        class="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-green-500"
      >
        <p class="text-sm font-semibold text-gray-400">User Terdaftar</p>
        <strong class="text-3xl font-bold mt-1 block">{{
          formatNumber(metrics.totalUsers)
        }}</strong>
        <p class="text-xs text-gray-500 mt-2">
          Admin User: {{ formatNumber(metrics.totalAdmins) }}
        </p>
      </div>

      <div
        class="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-red-500"
      >
        <p class="text-sm font-semibold text-gray-400">Pendapatan Bulan Ini</p>
        <strong class="text-3xl font-bold mt-1 block"
          >Rp {{ formatCurrency(metrics.monthlyRevenue) }}</strong
        >
        <p class="text-xs text-yellow-500 mt-2">
          AOV: Rp {{ formatCurrency(metrics.averageOrderValue) }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        class="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700"
      >
        <h2 class="text-xl font-bold mb-4 text-cyan-400">
          Rekap Pendapatan (Completed Orders)
        </h2>
        <div v-if="loading" class="text-center py-6 text-gray-500">
          Loading metrics...
        </div>
        <div v-else class="space-y-4">
          <div
            class="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <span class="text-gray-300">Pendapatan Harian (Today)</span>
            <strong class="text-xl text-yellow-500"
              >Rp {{ formatCurrency(metrics.dailyRevenue) }}</strong
            >
          </div>
          <div
            class="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <span class="text-gray-300">Pendapatan Mingguan (Last 7 Days)</span>
            <strong class="text-xl text-yellow-500"
              >Rp {{ formatCurrency(metrics.weeklyRevenue) }}</strong
            >
          </div>
          <div
            class="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <span class="text-gray-300">Pendapatan Bulanan (Last 30 Days)</span>
            <strong class="text-xl text-yellow-500"
              >Rp {{ formatCurrency(metrics.monthlyRevenue) }}</strong
            >
          </div>
        </div>
        <div
          class="h-40 bg-gray-700 rounded-lg mt-6 flex items-center justify-center text-gray-400"
        >
          [Placeholder: Grafik Penjualan Sederhana - Butuh library grafik]
        </div>
      </div>

      <div
        class="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 h-fit"
      >
        <h2 class="text-xl font-bold mb-4 text-cyan-400">Aksi Cepat</h2>
        <div class="space-y-4">
          <router-link
            to="/admin/products"
            class="block w-full text-center bg-cyan-600 text-black py-3 rounded-lg font-bold hover:bg-cyan-700 transition"
          >
            <i class="fas fa-boxes mr-2"></i> Kelola Produk
          </router-link>
          <router-link
            to="/admin/orders"
            class="block w-full text-center bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition"
          >
            <i class="fas fa-money-check-alt mr-2"></i> Lihat Orders
          </router-link>
          <router-link
            to="/admin/users"
            class="block w-full text-center bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition"
          >
            <i class="fas fa-users mr-2"></i> Kelola User
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../lib/supabase";

export default {
  name: "AdminDashboard",
  data() {
    return {
      loading: true,
      metrics: {
        totalProducts: 0,
        totalStock: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalUsers: 0,
        totalAdmins: 0,
        dailyRevenue: 0,
        weeklyRevenue: 0,
        monthlyRevenue: 0,
        averageOrderValue: 0,
      },
    };
  },
  mounted() {
    // Pastikan Anda telah menginstal Font Awesome atau menggunakan ikon Tailwind lainnya.
    this.fetchMetrics();
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "0";
      return Number(value).toLocaleString("id-ID");
    },
    formatNumber(value) {
      if (!value) return "0";
      return Number(value).toLocaleString("id-ID");
    },
    async fetchMetrics() {
      this.loading = true;

      try {
        // --- 1. Product Metrics ---
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("id, stock");

        if (!productError) {
          this.metrics.totalProducts = productData.length;
          this.metrics.totalStock = productData.reduce(
            (sum, p) => sum + p.stock,
            0
          );
        }

        // --- 2. Order/Transaction Metrics ---
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("id, total, status");

        if (!orderError) {
          this.metrics.totalOrders = orderData.filter(
            (o) => o.status === "completed"
          ).length;
          this.metrics.pendingOrders = orderData.filter(
            (o) => o.status === "pending" || o.status === "shipped"
          ).length;

          const completedOrders = orderData
            .filter((o) => o.status === "completed")
            .map((o) => o.total);
          const totalRevenue = completedOrders.reduce(
            (sum, total) => sum + Number(total),
            0
          );

          if (completedOrders.length > 0) {
            this.metrics.averageOrderValue =
              totalRevenue / completedOrders.length;
          }
        }

        // --- 3. User Metrics ---
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, role");

        if (!userError) {
          this.metrics.totalUsers = userData.length;
          this.metrics.totalAdmins = userData.filter(
            (u) => u.role === "admin"
          ).length;
        }

        // --- 4. Revenue Metrics (Requires Supabase RPC) ---
        // ASUMSI: Anda sudah membuat fungsi RPC 'get_revenue_in_range(start_date, end_date)'

        const today = new Date();
        const dateOnly = (d) =>
          new Date(d.getFullYear(), d.getMonth(), d.getDate());

        // Daily Revenue (RPC call)
        const { data: dailyRevenue } = await supabase.rpc(
          "get_revenue_in_range",
          {
            start_date: dateOnly(today).toISOString(),
            end_date: new Date().toISOString(),
          }
        );
        this.metrics.dailyRevenue = dailyRevenue || 0;

        // Weekly Revenue (RPC call - 7 days ago)
        const lastWeek = new Date(dateOnly(today).setDate(today.getDate() - 7));
        const { data: weeklyRevenue } = await supabase.rpc(
          "get_revenue_in_range",
          {
            start_date: lastWeek.toISOString(),
            end_date: new Date().toISOString(),
          }
        );
        this.metrics.weeklyRevenue = weeklyRevenue || 0;

        // Monthly Revenue (RPC call - 30 days ago)
        const lastMonth = new Date(
          dateOnly(today).setDate(today.getDate() - 30)
        );
        const { data: monthlyRevenue } = await supabase.rpc(
          "get_revenue_in_range",
          {
            start_date: lastMonth.toISOString(),
            end_date: new Date().toISOString(),
          }
        );
        this.metrics.monthlyRevenue = monthlyRevenue || 0;
      } catch (e) {
        console.error("Error fetching admin metrics:", e);
        // alert("Gagal memuat metrik admin.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
