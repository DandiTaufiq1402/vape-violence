// src/lib/Auth.js

import { supabase } from "./supabase";

// Mendapatkan data user yang sedang login, termasuk role dari tabel public.users.
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Ambil data profile dari tabel users, termasuk role
  const { data: profile, error } = await supabase
    .from("users")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return { ...user, role: "customer" };
  }

  return {
    ...user,
    ...profile,
  };
}

// Mengecek apakah user yang sedang login memiliki role 'admin'.
export async function isAdmin() {
  const user = await getCurrentUser();
  return user && user.role === "admin";
}

// Fungsi tambahan untuk inisiasi user baru setelah register
export async function initializeNewUser(authUserId, fullName) {
  const { error } = await supabase.from("users").insert([
    {
      id: authUserId,
      full_name: fullName,
      role: "customer", // Role default selalu 'customer' saat registrasi
    },
  ]);

  if (error) {
    console.error("Error initializing user role:", error);
  }
}
