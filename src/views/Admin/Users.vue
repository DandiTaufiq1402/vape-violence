// src/views/Admin/Users.vue

<template>
  <div class="p-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
    <h1
      class="text-3xl font-extrabold mb-8 text-yellow-500 border-b border-gray-700 pb-3"
    >
      Manajemen User
    </h1>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Memuat data user...
    </div>
    <div
      v-else
      class="overflow-x-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700"
    >
      <table class="w-full text-left text-gray-300">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th class="p-3 border-b border-gray-600">ID Auth</th>
            <th class="p-3 border-b border-gray-600">Nama Lengkap</th>
            <th class="p-3 border-b border-gray-600">Role</th>
            <th class="p-3 border-b border-gray-600">Terdaftar Sejak</th>
            <th class="p-3 border-b border-gray-600">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="p-3 text-xs">{{ user.id.substring(0, 8) }}...</td>
            <td class="p-3 font-medium text-white">
              {{ user.full_name || "N/A" }}
            </td>
            <td class="p-3">
              <span
                :class="roleClass(user.role)"
                class="px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ user.role.toUpperCase() }}
              </span>
            </td>
            <td class="p-3">{{ formatDate(user.created_at) }}</td>
            <td class="p-3 whitespace-nowrap">
              <button
                v-if="user.role === 'customer'"
                @click="updateRole(user.id, 'admin', user.full_name)"
                class="bg-yellow-600 text-black px-3 py-1 text-xs rounded hover:bg-yellow-700 transition"
              >
                Jadikan Admin
              </button>
              <button
                v-else
                @click="updateRole(user.id, 'customer', user.full_name)"
                class="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition"
              >
                Jadikan Customer
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0 && !loading">
            <td colspan="5" class="p-4 text-center text-gray-500">
              Tidak ada user yang ditemukan.
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
import { getCurrentUser } from "../../lib/Auth";

export default {
  name: "AdminUsers",
  setup() {
    const users = ref([]);
    const loading = ref(true);
    const currentUser = ref(null);

    const fetchUsers = async () => {
      loading.value = true;
      currentUser.value = await getCurrentUser();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat user:", error.message);
      } else {
        users.value = data.filter((u) => u.id !== currentUser.value?.id) || [];
      }
      loading.value = false;
    };

    const updateRole = async (id, newRole, name) => {
      if (
        confirm(
          `Yakin ingin mengubah role user "${name}" menjadi ${newRole.toUpperCase()}?`
        )
      ) {
        const { error } = await supabase
          .from("users")
          .update({ role: newRole })
          .eq("id", id);

        if (error) {
          alert("Gagal update role: " + error.message);
        } else {
          alert(`Role user "${name}" berhasil diubah menjadi ${newRole}.`);
          fetchUsers();
        }
      }
    };

    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    const roleClass = (role) => {
      return (
        {
          "bg-green-800 text-green-300": role === "admin",
          "bg-blue-800 text-blue-300": role === "customer",
        }[role] || "bg-gray-500 text-white"
      );
    };

    onMounted(() => {
      fetchUsers();
    });

    return { users, loading, formatDate, roleClass, updateRole };
  },
};
</script>
