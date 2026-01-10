import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// 1. Tạo Context
const AuthContext = createContext({});

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A. Lấy session ngay khi load trang (Check xem đã login chưa)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // B. Lắng nghe sự thay đổi (Login, Logout, Token hết hạn...)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- CÁC HÀM XỬ LÝ AUTH (Bọc lại để component gọi cho gọn) ---

  // Đăng ký (Có gửi kèm full_name cho Trigger SQL xử lý)
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Quan trọng: Trigger SQL sẽ đọc trường này
          avatar_url: "",
        },
        emailRedirectTo: `${window.location.origin}/email-confirmation`, // Link xác nhận email
      },
    });
    if (error) throw error;
    return data;
  };

  // Đăng nhập
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // Đăng xuất
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // 3. Truyền dữ liệu xuống dưới
  const value = {
    session,
    user,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Chỉ render app khi đã load xong thông tin user để tránh flick giao diện */}
      {!loading ? (
        children
      ) : (
        <div className="h-screen flex items-center justify-center">
          Đang tải...
        </div>
      )}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
