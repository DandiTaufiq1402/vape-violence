// src/lib/Auth.js

import { supabase } from "./supabase";

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getProfile() {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return null;
  const { data: profile } = await supabase
    // PERBAIKAN: Ganti "profiles" menjadi "users"
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  return profile;
}

export async function isAdmin() {
  const profile = await getProfile();
  return profile?.role === "admin";
}
