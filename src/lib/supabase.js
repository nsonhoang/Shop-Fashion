// File: src/lib/supabase.js

import { createClient } from "@supabase/supabase-js";

// Lấy thông tin từ file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem đã có key chưa (để debug cho dễ)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(" Quên chưa cấu hình file .env rồi bạn ơi!");
}

// Khởi tạo kết nối và Export ra để dùng ở nơi khác
export const supabase = createClient(supabaseUrl, supabaseKey);
