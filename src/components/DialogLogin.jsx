import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

function DialogLogin() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State cho mắt ẩn/hiện pass xác nhận
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State lưu lỗi validation

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Thêm field này
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Xóa lỗi khi người dùng gõ lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- VALIDATION CƠ BẢN ---
    // Nếu đang Đăng ký thì mới kiểm tra khớp mật khẩu
    if (!isLoginView) {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp!");
        return;
      }
      if (formData.password.length < 6) {
        setError("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
      }
    }

    setIsLoading(true);

    // Giả lập call API
    console.log(
      isLoginView ? "Đang Đăng nhập..." : "Đang Đăng ký...",
      formData
    );

    setTimeout(() => {
      setIsLoading(false);
      // alert("Thành công!");
    }, 1000);
  };

  // Hàm reset form khi chuyển đổi Login <-> Register
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError("");
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-800 transition-colors w-full md:w-auto">
          Log In
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-center">
            {isLoginView ? "Chào mừng trở lại" : "Tạo tài khoản"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLoginView
              ? "Nhập email và mật khẩu để đăng nhập."
              : "Đăng ký để nhận những ưu đãi mới nhất."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              {isLoginView && (
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-black hover:underline"
                >
                  Quên mật khẩu?
                </a>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password (CHỈ HIỆN KHI ĐĂNG KÝ) */}
          {!isLoginView && (
            <div className="grid gap-2 animate-in fade-in zoom-in-95 duration-200">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoginView ? "Đăng nhập" : "Đăng ký miễn phí"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>

        {/* Social Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log("Google Login")}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>

        {/* Toggle Login/Register */}
        <div className="mt-2 text-center text-sm">
          {isLoginView ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button
            onClick={toggleView}
            className="font-bold underline underline-offset-4 hover:text-primary"
          >
            {isLoginView ? "Đăng ký" : "Đăng nhập"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogLogin;
