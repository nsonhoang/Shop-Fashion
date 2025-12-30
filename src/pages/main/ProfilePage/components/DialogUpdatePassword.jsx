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

function DialogUpdatePassword() {
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

  // Regex: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit = (data) => {
    // Handle successful validation (e.g., call API)
    console.log("Form submitted:", data);
    // reset(); // Optional: reset form after success
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
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
                    message:
                      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
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
