import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import DialogUpdatePassword from "./components/DialogUpdatePassword";
import DialogShowAddress from "./components/DialogShowAddress";

function ProfilePage() {
  return (
    <div className="profile-page p-4 md:p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hồ sơ của tôi
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center sticky top-8">
              <div className="relative mb-6 group cursor-pointer">
                <div className="w-32 h-32 rounded-full p-1 border-2 border-gray-100">
                  <img
                    className="w-full h-full rounded-full object-cover shadow-sm group-hover:opacity-90 transition-opacity"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzU1lTEgfNgthUJWBQ3B5IE_qGq4nXU3PRw&s"
                    alt="Profile"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Thay đổi
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">John Doe</h2>
              <p className="text-sm text-gray-500 mb-6">
                Thành viên thân thiết
              </p>

              <div className="w-full space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-lg"
                >
                  Tải ảnh mới
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Xóa ảnh
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Settings */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Personal Information Section */}
            <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thông tin cá nhân
                </h3>
                {/* <Button variant="outline" size="sm" className="text-xs">
                  Địa chỉ đặt hàng
                </Button> */}
                <DialogShowAddress />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Họ và tên
                  </label>
                  <Input
                    id="fullName"
                    defaultValue="John Doe"
                    placeholder="Nhập tên của bạn"
                    className="h-10"
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
                    placeholder="+84 (555) 000-0000"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 rounded-lg">
                  Lưu thay đổi
                </Button>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">
                Bảo mật & Tài khoản
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:border-gray-200">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
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
                        className="text-gray-600"
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
                      <p className="font-medium text-sm text-gray-900">
                        Mật khẩu
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Thay đổi lần cuối 3 tháng trước
                      </p>
                    </div>
                  </div>
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
