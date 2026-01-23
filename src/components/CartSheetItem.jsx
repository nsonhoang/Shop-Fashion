import { formatMoney } from "@/utils/formatMoney";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

function CartSheetItem({ cartItem, handleDelete }) {
  // Trạng thái loading để tránh spam nút bấm
  const [isUpdating, setIsUpdating] = useState(false);

  // Dựa trên cấu trúc JSON bạn gửi
  const variant = cartItem.product_variants || {};
  const product = variant.products || {}; // Lấy tên sản phẩm từ bảng products (nếu có join)

  // Các thông tin hiển thị
  const productName = product.name || "Sản phẩm chưa đặt tên";
  const imageUrl = variant.image_url || "https://placehold.co/100";
  const size = variant.size || "-";
  const color = variant.color || "-";

  // Giá: Theo yêu cầu của bạn, chỉ lấy price_adjustment
  const unitPrice = Number(variant.price_adjustment) || 0;

  // --- 2. HÀM CẬP NHẬT SỐ LƯỢNG LÊN SUPABASE ---
  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1 || isUpdating) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("cart_item_id", cartItem.cart_item_id);

      if (error) throw error;
      // Không cần setQuantity local, Realtime bên CartSheet sẽ tự update lại UI
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- 3. HÀM XÓA SẢN PHẨM ---
  const handleRemoveItem = async () => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_item_id", cartItem.cart_item_id);
      // Gọi hàm handleDelete từ props để cập nhật UI bên ngoài
      handleDelete(cartItem.cart_item_id);
      if (error) throw error;
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="flex flex-col mb-4 border-b pb-4 last:border-b-0">
      <div className="flex flex-row w-full h-24 px-1 gap-3">
        {/* HÌNH ẢNH SẢN PHẨM */}
        <div className="w-20 h-24 flex-shrink-0 border rounded-md overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* THÔNG TIN CHI TIẾT */}
        <div className="flex flex-col justify-between w-full py-1">
          {/* Tên và Nút xóa */}
          <div className="flex flex-row justify-between w-full items-start">
            <div className="flex flex-col pr-2">
              <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                {productName}
              </h3>
              <span className="text-xs text-muted-foreground mt-1">
                Size: {size} | Màu: {color}
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 -mt-1 -mr-1"
              onClick={handleRemoveItem}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Giá và Bộ chọn số lượng */}
          <div className="flex flex-row w-full justify-between items-end mt-2">
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {formatMoney(unitPrice)}
              </span>
            </div>

            <div className="transform scale-90 origin-bottom-right">
              <QuantitySelector
                value={cartItem.quantity} // Dùng trực tiếp props
                onDecrease={() => updateQuantity(cartItem.quantity - 1)}
                onIncrease={() => updateQuantity(cartItem.quantity + 1)}
                disabled={isUpdating} // Khóa nút khi đang gửi request
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSheetItem;
