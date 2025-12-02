// src/views/Auth/Register.vue (Contoh)

<script setup>
// ... (imports lainnya)
import { supabase } from "../../lib/supabase"; // Pastikan ini diimpor
import { initializeNewUser } from "../../lib/Auth"; // Import fungsi baru

const form = reactive({
  email: "",
  password: "",
  full_name: "", // Pastikan Anda juga mengumpulkan nama lengkap
});

// ...

const handleRegister = async () => {
  // ... (validasi)

  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });

  if (error) {
    alert(error.message);
  } else if (data.user) {
    // PENTING: Inisialisasi role di tabel public.users setelah sukses
    await initializeNewUser(data.user.id, form.full_name);

    alert("Registrasi berhasil! Silakan cek email Anda untuk verifikasi.");
    // ... (redirect)
  }
};
// ...
</script>
