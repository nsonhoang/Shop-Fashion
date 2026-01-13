import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function VariantForm({
  onClose,
  onSubmit,
  baseProductPrice = 0,
}) {
  // State form
  const [form, setForm] = useState({
    sku: "",
    size: "",
    color: "",
    price: baseProductPrice,
    stock: 0,
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  // --- HÀM XỬ LÝ NHẬP LIỆU CHUNG (QUAN TRỌNG) ---
  // Hàm này thay thế cho việc setForm lẻ tẻ và thay thế luôn useEffect
  const handleInputChange = (field, value) => {
    // 1. Tạo ra object form mới dựa trên giá trị người dùng vừa nhập
    const nextForm = { ...form, [field]: value };

    // 2. Logic Tự động tạo SKU
    // Chỉ chạy khi người dùng sửa Color hoặc Size VÀ chưa nhập SKU
    if ((field === "color" || field === "size") && !form.sku) {
      // Lấy giá trị mới nhất của color và size
      const currentColor = field === "color" ? value : form.color;
      const currentSize = field === "size" ? value : form.size;

      if (currentColor && currentSize) {
        // Tạo SKU: 3 ký tự đầu của màu + Size (VD: RED-L)
        const suggestedSku = `${currentColor
          .toUpperCase()
          .substring(0, 3)}-${currentSize.toUpperCase()}`;
        nextForm.sku = suggestedSku;
      }
    }

    // 3. Cập nhật state 1 lần duy nhất (React chỉ render lại 1 lần)
    setForm(nextForm);

    // Xóa lỗi của trường đó nếu người dùng đang nhập
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.sku.trim()) newErrors.sku = "SKU là bắt buộc";
    if (!form.size.trim()) newErrors.size = "Size là bắt buộc";
    if (!form.color.trim()) newErrors.color = "Màu sắc là bắt buộc";
    if (Number(form.price) < 0) newErrors.price = "Giá không được âm";
    if (Number(form.stock) < 0) newErrors.stock = "Tồn kho không được âm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newVariant = {
      variant_id: Date.now().toString(),
      sku: form.sku.toUpperCase(),
      size: form.size.toUpperCase(),
      color: form.color,
      price: Number(form.price),
      image_url: form.image_url || "https://placehold.co/400",
      quantity_available: Number(form.stock),
      quantity_reserved: 0,
    };

    onSubmit(newVariant);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-[500px] max-w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <CardTitle>Thêm Biến Thể (Variant)</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Hàng 1: Size và Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>
                Màu sắc <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="VD: Red, Blue..."
                value={form.color}
                // SỬ DỤNG HÀM MỚI TẠI ĐÂY
                onChange={(e) => handleInputChange("color", e.target.value)}
                className={errors.color ? "border-red-500" : ""}
              />
              {errors.color && (
                <span className="text-[10px] text-red-500">{errors.color}</span>
              )}
            </div>

            <div className="space-y-1">
              <Label>
                Kích thước (Size) <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="VD: S, M, 42..."
                value={form.size}
                // SỬ DỤNG HÀM MỚI TẠI ĐÂY
                onChange={(e) => handleInputChange("size", e.target.value)}
                className={errors.size ? "border-red-500" : ""}
              />
              {errors.size && (
                <span className="text-[10px] text-red-500">{errors.size}</span>
              )}
            </div>
          </div>

          {/* Hàng 2: SKU */}
          <div className="space-y-1">
            <Label>
              Mã SKU <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="VD: AO-THUN-RED-S"
              value={form.sku}
              // Riêng SKU nếu user tự sửa thì vẫn cho phép override
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              className={errors.sku ? "border-red-500" : ""}
            />
            <p className="text-[10px] text-muted-foreground">
              Mã định danh duy nhất cho biến thể này.
            </p>
            {errors.sku && (
              <span className="text-[10px] text-red-500">{errors.sku}</span>
            )}
          </div>

          {/* Hàng 3: Giá và Tồn kho */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Giá bán biến thể</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <span className="text-[10px] text-red-500">{errors.price}</span>
              )}
            </div>

            <div className="space-y-1">
              <Label>Tồn kho ban đầu (Stock)</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && (
                <span className="text-[10px] text-red-500">{errors.stock}</span>
              )}
            </div>
          </div>

          {/* Hàng 4: Image URL */}
          <div className="space-y-1">
            <Label>Link ảnh (Thumbnail)</Label>
            <Input
              placeholder="https://..."
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button onClick={handleSubmit}>Thêm biến thể</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
