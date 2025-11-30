import { createRouter, createWebHistory } from "vue-router";

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
  { path: "/cart", component: Cart },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // Admin
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/products", component: AdminProducts },
  { path: "/admin/products/add", component: AdminAddEdit },
  { path: "/admin/products/:id/edit", component: AdminAddEdit },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
