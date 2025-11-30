// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
// 1. IMPORT FUNGSI AUTENTIKASI DAN ROLE
import { isAdmin, getCurrentUser } from "../lib/Auth";

import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";

// Admin
import AdminDashboard from "../views/Admin/Dashboard.vue";
import AdminProducts from "../views/Admin/Products.vue";
import AdminAddEdit from "../views/Admin/AddEditProduct.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },

  // 2. TAMBAHKAN META FIELD UNTUK RUTE CUSTOMER (Membutuhkan Login)
  { path: "/cart", component: Cart, meta: { requiresAuth: true } },

  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // 3. TAMBAHKAN META FIELD UNTUK RUTE ADMIN (Membutuhkan Login DAN Role Admin)
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/products",
    component: AdminProducts,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/products/add",
    component: AdminAddEdit,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/products/:id/edit",
    component: AdminAddEdit,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4. IMPLEMENTASI GLOBAL NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  // Cek status pengguna saat ini
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  // Proteksi Rute Admin
  if (to.meta.requiresAdmin) {
    const isUserAdmin = await isAdmin();

    if (isUserAdmin) {
      next();
    } else if (isAuthenticated) {
      // Login, tapi bukan Admin
      alert("Akses ditolak. Anda tidak memiliki izin Admin.");
      next("/");
    } else {
      // Belum Login
      alert("Akses ditolak. Anda harus login sebagai Admin.");
      next("/login");
    }
  }

  // Proteksi Rute Customer (Membutuhkan Login)
  else if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      next();
    } else {
      // Belum Login
      alert("Anda perlu login untuk mengakses halaman ini.");
      next("/login");
    }
  }

  // Rute Publik
  else {
    next();
  }
});

export default router;
