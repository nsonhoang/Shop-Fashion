import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CartSheetItem from "./CartSheetItem";
import { formatMoney } from "@/utils/formatMoney";
import { useAuth } from "@/contexts/AuthContext";
import { getCartsByUserId } from "@/services/cartService";
import { supabase } from "@/lib/supabase";

function CartSheet() {
  const { user } = useAuth();

  const [cartData, setCartData] = useState({});
  // const cartItems = cartData?.cart_items || [];
  const [cartItems, setCartItems] = useState(cartData?.cart_items || []);

  // Helper: Lấy mảng items an toàn từ Object trả về
  // JSON của bạn là: cartData.cart_items

  // Tính tổng số lượng để hiện chấm đỏ (Badge)
  // const totalQuantity = cartItems.reduce(
  //   (acc, item) => acc + (item.quantity || 0),
  //   0,
  // );
  useEffect(() => {
    let channel = null;
    let isMounted = true; // 1. Cờ kiểm tra trạng thái component

    const setupCart = async () => {
      try {
        if (!user?.id) return;

        const data = await getCartsByUserId(user.id);

        // 2. Nếu component đã bị hủy (user chuyển trang) thì DỪNG NGAY, không làm gì nữa
        if (!isMounted) return;

        console.log("Dữ liệu giỏ hàng:", data);
        setCartData(data);
        setCartItems(data?.cart_items || []);

        // Setup Realtime
        if (data && data.cart_id) {
          const cartId = data.cart_id;

          // Logic tạo kênh giữ nguyên
          channel = supabase
            .channel(`realtime-cart-${cartId}`) // Nên thêm ID vào tên kênh cho unique
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "cart_items",
                filter: `cart_id=eq.${cartId}`,
              },
              (payload) => {
                // Chỉ fetch lại nếu component còn sống
                if (isMounted) {
                  console.log("Realtime: Có biến động!", payload);
                  reFetchData();
                }
              },
            )
            .subscribe();
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    const reFetchData = async () => {
      if (!user?.id || !isMounted) return; // Check mounted
      const data = await getCartsByUserId(user.id);
      if (isMounted && data) setCartData(data); // Check mounted
    };

    setupCart();

    // Cleanup
    return () => {
      isMounted = false; // 3. Đánh dấu là đã hủy component
      if (channel) {
        console.log("🔌 Ngắt kết nối Realtime");
        supabase.removeChannel(channel);
      }
    };
  }, [user]);
  const handleBuyNow = () => {
    console.log("Thanh toán items:", cartItems);
  };

  // SỬA 2: Hàm tính tiền dựa trên JSON bạn gửi
  // Chỉ lấy giá từ: item -> product_variants -> price_adjustment
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Truy cập vào object product_variants
      const variant = item.product_variants || {};

      // Lấy giá adjustment (10000 trong ví dụ JSON của bạn)
      const price = Number(variant.price_adjustment) || 0;

      // Nhân với số lượng
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const handleDeleteItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cart_item_id !== itemId),
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative hover:bg-gray-100 p-2 rounded-full transition-colors">
          <ShoppingCart className="h-6 w-6" />

          {/* SỬA 3: Hiển thị số lượng thực tế thay vì số 3 cứng */}
          {cartData.cart_items && cartData.cart_items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {cartData.cart_items.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetClose className="mb-5" />
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg font-semibold">
            Giỏ hàng Của Tôi
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {/* SỬA 4: Check độ dài mảng cartItems */}
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-secondary p-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Giỏ hàng trống</h3>
                <p className="text-sm text-muted-foreground">
                  Bạn chưa thêm sản phẩm nào vào giỏ.
                </p>
              </div>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Tiếp tục mua sắm
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-4">
                {/* SỬA 5: Map qua cartItems và dùng cart_item_id làm key */}
                {cartItems.map((item) => (
                  <CartSheetItem
                    key={item.cart_item_id}
                    cartItem={item}
                    handleDelete={handleDeleteItem}
                  />
                ))}
              </div>

              <div className="border-t p-4 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex flex-row items-center justify-between mb-4">
                  <span className="font-semibold flex items-baseline gap-1">
                    Tổng cộng
                    <span className="text-sm font-normal text-muted-foreground">
                      ({cartItems.length} sản phẩm)
                    </span>
                  </span>

                  <span className="font-bold text-lg">
                    {formatMoney(calculateTotal())}
                  </span>
                </div>

                <SheetClose asChild>
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-md"
                    onClick={handleBuyNow}
                  >
                    Thanh toán ngay
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
