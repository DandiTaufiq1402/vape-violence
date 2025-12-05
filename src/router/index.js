// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import { isAdmin, getCurrentUser } from "../lib/Auth";

import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Testimonials from "../views/Testimonials.vue"; // Customer Testimonials/History
import Profile from "../views/Profile.vue";
import Contact from "../views/Contact.vue";

// Admin
import AdminDashboard from "../views/Admin/Dashboard.vue";
import AdminProducts from "../views/Admin/Products.vue";
import AdminAddEdit from "../views/Admin/AddEditProduct.vue";
import AdminOrders from "../views/Admin/Orders.vue";
import AdminUsers from "../views/Admin/Users.vue";
import AdminTestimonials from "../views/Admin/Testimonials.vue"; // NEW: Import Admin Testimonials

const routes = [
  // ... (rute customer yang sudah ada)
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },
  { path: "/testimonials", component: Testimonials }, // Customer Testimonials
  { path: "/contact", component: Contact }, 

  // Rute Customer Terproteksi
  { path: "/cart", component: Cart, meta: { requiresAuth: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },

  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // Rute Admin Terproteksi
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
  // Rute Admin BARU
  {
    path: "/admin/orders", // Rute untuk manajemen order/transaksi
    component: AdminOrders,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users", // Rute untuk manajemen user
    component: AdminUsers,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/testimonials", // NEW: Rute untuk manajemen testimoni
    component: AdminTestimonials,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ... (Global Navigation Guard yang sudah ada)

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  if (to.meta.requiresAdmin) {
    const isUserAdmin = await isAdmin();

    if (isUserAdmin) {
      next();
    } else if (isAuthenticated) {
      alert("Akses ditolak. Anda tidak memiliki izin Admin.");
      next("/");
    } else {
      alert("Akses ditolak. Anda harus login sebagai Admin.");
      next("/login");
    }
  } else if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      next();
    } else {
      alert("Anda perlu login untuk mengakses halaman ini.");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;