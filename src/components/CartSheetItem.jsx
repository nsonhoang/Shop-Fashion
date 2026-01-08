import { formatMoney } from "@/utils/formatMoney";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { useState } from "react";

function CartSheetItem({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleDecrease = (quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleIncrease = (quantity) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  return (
    <div className="flex flex-col mb-4 ">
      {/* item riêng trc đã  */}
      <div className="flex flex-row w-full h-25 px-2  ">
        {/* hình ảnh sản phẩm */}
        <div className="">
          <img
            src={cartItem.variant_image}
            alt={cartItem.name}
            className="h-full w-18 object-cover"
          />
        </div>
        {/*thông tin chi tiết  */}
        <div className="flex flex-col justify-between w-full px-2 py-1">
          {/* Thê tên và nút thùng rác */}
          <div className="flex flex-row justify-between w-full  ">
            {/* tên */}
            <div className="flex flex-col ">
              <h3 className="font-semibold">{cartItem.product.name}</h3>
              <span className="text-sm text-gray-500">
                {cartItem.size} | {cartItem.color}
              </span>
            </div>
            {/* nút thùng rác */}
            <div className="flex items-center">
              <Button className="p-1 bg-white text-muted-foreground hover:text-red-500 hover:bg-white">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* bảng giá và chọn số lượng */}
          <div className="flex flex-row w-full justify-between items-center">
            {/* giá */}
            <div className="">
              <span className="">
                {formatMoney(
                  cartItem.product.base_price + cartItem.price_adjustment
                )}
              </span>
            </div>
            <div className="">
              <QuantitySelector
                value={quantity}
                onDecrease={() => handleDecrease(quantity)}
                onIncrease={() => handleIncrease(quantity)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSheetItem;
