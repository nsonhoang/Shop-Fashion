import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";

function DialogUpdateAdd({ address, isEdit, children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: address?.street || "",
      city: address?.city || "",
    },
  });

  const onSubmit = (data) => {
    if (isEdit) {
      // Call API to update address
      console.log(
        "Updating address ID:",
        address.address_id,
        "with data:",
        data
      );
    } else {
      // Call API to add new address
      console.log("Adding new address with data:", data);
    }
    // Consider closing the dialog on submit
  };

  return (
    <Dialog>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Đường
              </Label>
              <div className="col-span-3">
                <Input
                  id="street"
                  {...register("street", { required: "Đường là bắt buộc" })}
                  className="w-full"
                />
                {errors.street && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.street.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Thành phố
              </Label>
              <div className="col-span-3">
                <Input
                  id="city"
                  {...register("city", { required: "Thành phố là bắt buộc" })}
                  className="w-full"
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
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
