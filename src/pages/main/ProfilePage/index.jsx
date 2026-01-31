import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext"; // 1. Import Context đã sửa
import { updateUserById } from "@/services/customerService";
import { toast } from "sonner";
import { Loader2, Camera, Trash2, User, Shield } from "lucide-react";

// Import các Dialog con
import DialogUpdatePassword from "./components/DialogUpdatePassword";
import DialogShowAddress from "./components/DialogShowAddress";

function ProfilePage() {
  // 1. Lấy dữ liệu và hàm refresh từ Context
  const { user, profile, refreshProfile } = useAuth();

  // --- STATE QUẢN LÝ FORM ---
  // Dùng nullish coalescing (??) để tránh lỗi nếu profile chưa load kịp
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number ?? "");

  // State loading khi bấm nút Lưu
  const [isSaving, setIsSaving] = useState(false);

  // 2. Đồng bộ State với Profile trong Context
  // (Chạy khi mới vào trang hoặc khi Profile thay đổi)
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhoneNumber(profile.phone_number || "");
    }
  }, [profile]);

  // --- HÀM XỬ LÝ LƯU THÔNG TIN ---
  const handleUpdateUser = async () => {
    // Validation
    if (!fullName.trim()) {
      toast.warning("Họ và tên không được để trống!");
      return;
    }

    setIsSaving(true);
    try {
      const updatedData = {
        full_name: fullName,
        phone_number: phoneNumber,
      };

      // 1. Gọi API cập nhật xuống Database
      await updateUserById(user.id, updatedData);

      // 2. QUAN TRỌNG: Báo cho Context biết để tải lại dữ liệu mới nhất
      // (Giúp Header/Sidebar cập nhật tên ngay lập tức)
      await refreshProfile();

      toast.success("Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Lỗi update:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  // Hàm xử lý Avatar (Placeholder)
  const handleAvatarClick = () => {
    toast.info("Tính năng tải ảnh đang được phát triển!");
  };

  return (
    <div className="profile-page p-4 md:p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hồ sơ của tôi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- CỘT TRÁI: THẺ THÔNG TIN (AVATAR) --- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center sticky top-8">
              {/* Avatar với hiệu ứng Hover */}
              <div
                className="relative mb-6 group cursor-pointer"
                onClick={handleAvatarClick}
              >
                <div className="w-32 h-32 rounded-full p-1 border-2 border-gray-100 relative overflow-hidden bg-gray-100">
                  <img
                    className="w-full h-full rounded-full object-cover shadow-sm group-hover:opacity-90 transition-opacity"
                    src={profile?.avatar_url || "https://github.com/shadcn.png"} // Fallback ảnh
                    alt="Profile"
                  />
                </div>
                {/* Overlay Icon Camera khi hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-black/60 text-white p-2 rounded-full backdrop-blur-sm">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Tên & Hạng thành viên */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {profile?.full_name || "Khách hàng"}
              </h2>
              <p className="text-sm text-gray-500 mb-6 bg-gray-100 px-3 py-1 rounded-full inline-block">
                Thành viên thân thiết
              </p>

              {/* Các nút thao tác ảnh */}
              <div className="w-full space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-lg gap-2"
                  onClick={handleAvatarClick}
                >
                  <Camera className="w-4 h-4" />
                  Tải ảnh mới
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg gap-2"
                  onClick={handleAvatarClick}
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa ảnh
                </Button>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: FORM CHỈNH SỬA --- */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* 1. SECTION: THÔNG TIN CÁ NHÂN */}
            <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Thông tin cá nhân
                  </h3>
                </div>

                {/* Nút quản lý địa chỉ */}
                <DialogShowAddress />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ tên của bạn"
                    className="h-11 focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="h-11 focus-visible:ring-blue-500"
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email đăng nhập
                  </label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="h-11 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Footer Button */}
              <div className="mt-8 flex justify-end pt-4">
                <Button
                  className="bg-black hover:bg-gray-800 text-white px-8 h-11 rounded-lg min-w-[150px] font-medium shadow-sm transition-all active:scale-95"
                  onClick={handleUpdateUser}
                  disabled={isSaving} // Disable khi đang lưu
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </div>
            </div>

            {/* 2. SECTION: BẢO MẬT */}
            <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Bảo mật & Tài khoản
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
                  <div className="flex gap-4 items-start sm:items-center mb-4 sm:mb-0">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm text-gray-600">
                      {/* Icon Password */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mật khẩu</p>
                      <p className="text-xs text-gray-500 mt-0.5 max-w-[250px] sm:max-w-none">
                        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu
                        cho người khác.
                      </p>
                    </div>
                  </div>

                  {/* Nút đổi mật khẩu (Component con) */}
                  <DialogUpdatePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
