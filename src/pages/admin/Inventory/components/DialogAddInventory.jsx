import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function DialogAddInventory({
  open,
  onOpenChange,
  onSubmit,
  variants = [],
  initialData = null,
}) {
  const [isLoading, setIsLoading] = useState(false);

  // State form: Chỉ còn quản lý Variant và Available
  const [formData, setFormData] = useState({
    variant_id: "",
    quantity_available: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Edit: Load dữ liệu cũ
        setFormData({
          variant_id: initialData.variant_id,
          quantity_available: initialData.quantity_available || 0,
        });
      } else {
        // Add: Reset form
        setFormData({
          variant_id: "",
          quantity_available: 0,
        });
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.variant_id) newErrors.variant_id = "Vui lòng chọn biến thể";
    if (Number(formData.quantity_available) < 0)
      newErrors.quantity_available = "Số lượng không được âm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);

      const payload = {
        ...(initialData?.inventory_id && {
          inventory_id: initialData.inventory_id,
        }),
        variant_id: formData.variant_id,
        quantity_available: Number(formData.quantity_available),

        // --- LOGIC QUAN TRỌNG Ở ĐÂY ---
        // Nếu là Sửa: Lấy lại giá trị cũ của initialData để không bị mất
        // Nếu là Mới: Mặc định là 0
        quantity_reserved: initialData ? initialData.quantity_reserved : 0,
      };

      await onSubmit(payload);
      onOpenChange(false);
    } catch (error) {
      console.error("Lỗi submit form kho:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tính toán số lượng đang giữ (để hiển thị cho User biết, chứ không cho sửa)
  const currentReserved = initialData?.quantity_reserved || 0;
  const currentTotal = Number(formData.quantity_available) + currentReserved;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật Tồn Kho" : "Nhập Kho Mới"}
          </DialogTitle>
          <DialogDescription>
            Cập nhật số lượng có thể bán (Available) cho biến thể sản phẩm.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 1. Chọn Biến Thể */}
          <div className="space-y-2">
            <Label>
              Biến thể sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.variant_id}
              onValueChange={(value) =>
                setFormData({ ...formData, variant_id: value })
              }
              disabled={!!initialData}
            >
              <SelectTrigger
                className={errors.variant_id ? "border-red-500" : ""}
              >
                <SelectValue placeholder="-- Chọn biến thể --" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((v) => (
                  <SelectItem key={v.variant_id} value={v.variant_id}>
                    <span className="font-medium">{v.sku}</span> - {v.color} /{" "}
                    {v.size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.variant_id && (
              <p className="text-xs text-red-500">{errors.variant_id}</p>
            )}
          </div>

          {/* 2. Nhập số lượng Available (Chỉ còn 1 ô nhập) */}
          <div className="space-y-2">
            <Label>
              Số lượng khả dụng (Bán trên Web){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min="0"
              value={formData.quantity_available}
              onChange={(e) =>
                setFormData({ ...formData, quantity_available: e.target.value })
              }
              className={errors.quantity_available ? "border-red-500" : ""}
            />
            {errors.quantity_available && (
              <p className="text-xs text-red-500">
                {errors.quantity_available}
              </p>
            )}
          </div>

          {/* 3. Phần thông tin tổng hợp (Chỉ hiển thị để đối chiếu) */}
          <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Khả dụng (Available):</span>
              <span className="font-medium">{formData.quantity_available}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Đang giữ (Reserved - Khách đặt):</span>
              <span>{currentReserved}</span>
            </div>
            <div className="border-t border-slate-200 my-1"></div>
            <div className="flex justify-between items-center text-primary font-bold">
              <span>Tổng thực tế trong kho:</span>
              <span className="text-lg">{currentTotal}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Hủy bỏ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
