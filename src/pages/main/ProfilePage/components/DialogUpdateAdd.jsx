import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react"; // 1. Import useEffect
import { createAddress, updateAddress } from "@/services/addressService";
import { useAuth } from "@/contexts/AuthContext";

// Nhớ nhận prop isDefault ở đây
function DialogUpdateAdd({ isDefault, address, isEdit, children, onSuccess }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
    reset, // 2. Lấy hàm reset ra
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      is_default: false,
    },
  });

  // 3. Dùng useEffect để cập nhật Form khi prop thay đổi
  useEffect(() => {
    // Nếu có address (Sửa) -> Lấy từ address
    // Nếu không (Thêm) -> Lấy từ biến isDefault truyền vào (mặc định false)
    const defaultVal = address ? address.is_default : isDefault || false;

    reset({
      street: address?.street || "",
      city: address?.city || "",
      is_default: defaultVal,
    });
  }, [address, isDefault, reset]); // Chạy lại khi address hoặc isDefault đổi

  const onSubmit = (data) => {
    if (isEdit) {
      try {
        const response = updateAddress(address.address_id, data);
        console.log("Form Data:", response);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (error) {
        console.error("Error updating address:", error);
        alert("Có lỗi xảy ra khi cập nhật địa chỉ.");
      } finally {
        setOpen(false);
      }
    } else {
      try {
        const response = createAddress(data, user.id);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (error) {
        console.error("Error creating address:", error);
        alert("Có lỗi xảy ra khi thêm địa chỉ.");
      } finally {
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Thay đổi thông tin địa chỉ giao hàng của bạn."
                : "Nhập thông tin địa chỉ mới vào bên dưới."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* ... Các input Street, City giữ nguyên ... */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Đường
              </Label>
              <div className="col-span-3">
                <Input
                  id="street"
                  {...register("street", { required: true })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Thành phố
              </Label>
              <div className="col-span-3">
                <Input
                  id="city"
                  {...register("city", { required: true })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <div className="col-span-3 flex items-center space-x-2">
                <Controller
                  name="is_default"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="is_default"
                      // Quan trọng: Đảm bảo checked luôn là boolean (tránh null/undefined)
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is_default">Đặt làm địa chỉ mặc định</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{isEdit ? "Cập nhật" : "Thêm"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogUpdateAdd;
