// src/lib/Auth.js
import { supabase } from "./supabase";

// Mendapatkan data user + role dari tabel public.users
export async function getCurrentUser() {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  console.log("Auth Error:", authError);
  console.log("Auth Data:", authData);

  const user = authData?.user;

  if (!user) {
    console.log("Tidak ada user login.");
    return null;
  }

  console.log("User ID dari Auth:", user.id);

  // Ambil profile
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("Profile Data:", profile);
  console.log("Profile Error:", profileError);

  if (profileError) return null;

  return { ...user, ...profile };
}


// Mengecek apakah user admin
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

// Membuat data user baru setelah register
export async function initializeNewUser(authUserId, fullName) {
  const { error } = await supabase.from("users").insert([
    {
      id: authUserId,
      full_name: fullName,
      role: "customer", // default role
    },
  ]);

  if (error) {
    console.error("Error initializing user role:", error);
  }
}
