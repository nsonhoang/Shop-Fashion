import { useEffect, useState } from "react";
// Đảm bảo file mockData.js đã export categories

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // Icon loading nếu bạn dùng lucide-react
import { getCategories } from "@/services/categoriesService";
import { formatNumber } from "@/utils/formatNumber";

export default function ProductForm({ onClose, onSubmit }) {
  // lấy dữ liệu category
  const [categories, setCategories] = useState([]);

  // State quản lý dữ liệu form
  const [form, setForm] = useState({
    name: "",
    description: "",
    base_price: "",
    category_id: "",
    gender: "UNISEX",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Hàm validate form
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Tên sản phẩm không được để trống";
    if (!form.base_price) newErrors.base_price = "Giá không được để trống";
    if (Number(form.base_price) < 0) newErrors.base_price = "Giá không được âm";
    if (!form.category_id) newErrors.category_id = "Vui lòng chọn danh mục";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true); // Bắt đầu loading

    const newProduct = {
      ...form,
      base_price: Number(form.base_price),
      is_active: true,
    };

    onSubmit(newProduct);
    setIsLoading(false);
    onClose();
  };

  return (
    // Backdrop: Click vào vùng đen sẽ đóng form
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      {/* Card: Cần stopPropagation để click vào form không bị đóng */}
      <Card
        className="w-[600px] max-w-full shadow-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <CardTitle>Thêm Sản Phẩm Mới</CardTitle>
        </CardHeader>

        {/* CardContent: Cho phép scroll nếu nội dung dài */}
        <CardContent className="space-y-4 overflow-y-auto flex-1">
          {/* Tên sản phẩm */}
          <div className="space-y-1">
            <Label htmlFor="name">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ví dụ: Áo Thun Cotton"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>

          {/* Mô tả */}
          <div className="space-y-1">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết sản phẩm..."
              className="min-h-[100px]"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Giá cơ bản */}
            <div className="space-y-1">
              <Label htmlFor="price">
                Giá cơ bản (VND) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="text"
                placeholder="0"
                value={formatNumber(form.base_price)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, base_price: rawValue });
                }}
                className={errors.base_price ? "border-red-500" : ""}
              />
              {errors.base_price && (
                <span className="text-xs text-red-500">
                  {errors.base_price}
                </span>
              )}
            </div>

            {/* Giới tính */}
            <div className="space-y-1">
              <Label>Giới tính</Label>
              <Select
                value={form.gender}
                onValueChange={(value) => setForm({ ...form, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEN">Nam (Men)</SelectItem>
                  <SelectItem value="WOMEN">Nữ (Women)</SelectItem>
                  <SelectItem value="UNISEX">Unisex</SelectItem>
                  <SelectItem value="KIDS">Trẻ em (Kids)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Danh mục */}
          <div className="space-y-1">
            <Label>
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.category_id}
              onValueChange={(value) =>
                setForm({ ...form, category_id: value })
              }
            >
              <SelectTrigger
                className={errors.category_id ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Chọn danh mục sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                {categories?.length ? (
                  categories.map((c) => (
                    <SelectItem
                      key={c.category_id}
                      value={String(c.category_id)}
                    >
                      {c.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="null">
                    Không có danh mục
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <span className="text-xs text-red-500">{errors.category_id}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy bỏ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Đang tạo..." : "Tạo sản phẩm"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
