import { useState } from "react"; // 1. Import useState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

function DialogUpdatePassword() {
  const [open, setOpen] = useState(false); // 2. Tạo state quản lý đóng mở

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const passwordRegex = /^.{8,}$/;

  const onSubmit = async (formData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Bạn chưa đăng nhập!");

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.currentPassword,
      });

      if (verifyError) {
        throw new Error("Mật khẩu hiện tại không đúng!");
      }

      const { data, error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) throw error;

      toast.success("Đổi mật khẩu thành công!");

      // 3. Đóng dialog và reset form khi thành công
      setOpen(false);
      reset();

      return data;
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error.message);
      toast.error(error.message || "Đổi mật khẩu thất bại!"); // Hiển thị lỗi chi tiết hơn nếu có
    }
  };

  return (
    // 4. Truyền open và onOpenChange vào Dialog
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset(); // Reset form khi đóng bằng cách click ra ngoài hoặc nút X
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white">
          Đổi mật khẩu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật mật khẩu</DialogTitle>
          <DialogDescription>
            Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentPassword" className="text-right">
              Mật khẩu hiện tại
            </Label>
            <div className="col-span-3">
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword", {
                  required: "Vui lòng nhập mật khẩu hiện tại",
                })}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              Mật khẩu mới
            </Label>
            <div className="col-span-3">
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "Vui lòng nhập mật khẩu mới",
                  pattern: {
                    value: passwordRegex,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmNewPassword" className="text-right">
              Xác nhận mật khẩu
            </Label>
            <div className="col-span-3">
              <Input
                id="confirmNewPassword"
                type="password"
                {...register("confirmNewPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (val) => {
                    if (watch("newPassword") != val) {
                      return "Mật khẩu xác nhận không khớp";
                    }
                  },
                })}
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogUpdatePassword;
