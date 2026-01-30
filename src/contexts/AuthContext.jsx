import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// 1. Tạo Context
const AuthContext = createContext({});

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role_id")
        .eq("user_id", userId)
        .single();

      if (error) {
        return null;
      }
      return data.role_id;
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    const handleSession = async (currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        // QUAN TRỌNG: Phải await lấy role xong thì mới chạy tiếp dòng dưới
        const roleId = await getUserRole(currentSession.user.id);
        setRole(roleId);
      } else {
        setRole(null);
      }

      // QUAN TRỌNG: Chỉ tắt loading khi TẤT CẢ mọi thứ đã xong
      setLoading(false);
    };

    // A. Lấy session khởi tạo
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // B. Lắng nghe thay đổi
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    role,
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
