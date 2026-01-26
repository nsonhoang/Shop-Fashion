import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// 1. Tạo Context
const AuthContext = createContext({});

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User của Supabase Auth (Email, UID)
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null); // Role (admin/customer)
  const [profile, setProfile] = useState(null); // <--- THÊM: User Profile từ DB (Tên, SĐT, Avatar...)
  const [loading, setLoading] = useState(true);

  // Hàm lấy Role
  const getUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role_id")
        .eq("user_id", userId)
        .single();
      if (error) return null;
      return data.role_id;
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  };

  // Hàm lấy Profile (Tách riêng để có thể gọi lại khi update)
  const fetchProfile = async (userId) => {
    try {
      // Sửa 'profiles' thành tên bảng chứa thông tin user của bạn (vd: 'users', 'customers')
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId) // Giả sử cột id là khóa chính liên kết với auth.uid
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const handleSession = async (currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const userId = currentSession.user.id;

        // Chạy song song cả 2 API lấy Role và Profile cho nhanh
        const [roleId, userProfile] = await Promise.all([
          getUserRole(userId),
          fetchProfile(userId),
        ]);

        setRole(roleId);
        setProfile(userProfile); // <--- Lưu profile vào state
      } else {
        setRole(null);
        setProfile(null);
      }

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

  // ... (Giữ nguyên signUp, signIn, signOut) ...
  const signUp = async (email, password, fullName) => {
    // ... code cũ
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, avatar_url: "" },
        emailRedirectTo: `${window.location.origin}/email-confirmation`,
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Clear state khi logout
    setProfile(null);
    setRole(null);
  };

  // Hàm giúp component con ép Context tải lại Profile (Dùng sau khi Update Profile thành công)
  const refreshProfile = async () => {
    if (user?.id) {
      const newProfile = await fetchProfile(user.id);
      setProfile(newProfile);
    }
  };

  // 3. Truyền dữ liệu xuống dưới
  const value = {
    session,
    user, // Auth User (Email, ID)
    profile, // <--- DB User (Fullname, Phone, Address...)
    role,
    signUp,
    signIn,
    signOut,
    refreshProfile, // <--- Xuất hàm này để dùng ở ProfilePage
  };

  return (
    <AuthContext.Provider value={value}>
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
export const useAuth = () => useContext(AuthContext);
