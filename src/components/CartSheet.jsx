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

import { useNavigate } from "react-router-dom";
import { getFullAddress } from "@/services/addressService";
import { toast } from "sonner";
import DialogConfirmOrder from "./DialogComfirmOrder";

function CartSheet() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [cartData, setCartData] = useState({}); // Cái loz này để làm gì
  const [cartItems, setCartItems] = useState([]); // Khởi tạo mảng rỗng
  const [isOpen, setIsOpen] = useState(false);

  // State cho Dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [listAddress, setListAddress] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // --- LOGIC REALTIME ĐÃ TỐI ƯU ---
  useEffect(() => {
    if (!user?.id) return;

    let channel = null;

    // 1. Hàm lấy dữ liệu mới nhất
    const fetchLatestCart = async () => {
      try {
        const data = await getCartsByUserId(user.id);
        if (data) {
          console.log("Cart updated:", data);
          setCartData(data);
          setCartItems(data.cart_items || []);
          return data; // Trả về data để dùng cho việc subscribe
        }
      } catch (error) {
        console.error("Lỗi fetch cart:", error);
      }
      return null;
    };

    // 2. Hàm khởi tạo (Fetch lần đầu + Đăng ký Realtime)
    const initCartAndRealtime = async () => {
      const data = await fetchLatestCart();

      // Chỉ subscribe nếu có cart_id
      if (data && data.cart_id) {
        const cartId = data.cart_id;

        // Hủy kênh cũ nếu có (tránh duplicate)
        if (channel) supabase.removeChannel(channel);

        channel = supabase
          .channel(`realtime-cart-${cartId}`)
          .on(
            "postgres_changes",
            {
              event: "*", // Nghe tất cả: INSERT, UPDATE, DELETE
              schema: "public",
              table: "cart_items",
              filter: `cart_id=eq.${cartId}`,
            },
            (payload) => {
              console.log("⚡ Realtime Signal:", payload);

              // Tùy chọn: Hiện thông báo nhỏ khi có thay đổi từ nơi khác
              if (payload.eventType === "INSERT") {
                toast.success("Giỏ hàng vừa được cập nhật!");
              }

              // QUAN TRỌNG: Gọi lại API để lấy data đầy đủ (vì payload realtime thường thiếu thông tin product join)
              fetchLatestCart();
            },
          )
          .subscribe((status) => {
            if (status === "SUBSCRIBED") {
              console.log("✅ Đã kết nối Realtime Cart");
            }
          });
      }
    };

    initCartAndRealtime();

    // Cleanup khi unmount hoặc user đổi
    return () => {
      if (channel) {
        console.log("🔌 Ngắt kết nối Realtime");
        supabase.removeChannel(channel);
      }
    };
  }, [user]); // Chỉ chạy lại khi user thay đổi

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const variant = item.product_variants || {};
      const price = Number(variant.price_adjustment) || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const handleDeleteItem = async (itemId) => {
    // Lưu ý: Hàm này nên gọi API xóa trong DB.
    // Khi API xóa thành công -> DB thay đổi -> Realtime kích hoạt -> Tự động update list
    // Nhưng để UX nhanh hơn, ta có thể update state tạm thời ở đây (Optimistic UI)
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cart_item_id !== itemId),
    );
    // Sau đó nhớ gọi API xóa thật sự ở service (bạn cần thêm logic gọi API ở đây nếu chưa có)
  };

  const handleBuyNow = async () => {
    if (!user || cartItems.length === 0) return;

    try {
      const addresses = await getFullAddress(user.id);
      const defAddr = addresses?.find((a) => a.is_default) || addresses?.[0];
      setListAddress(addresses || []);

      if (!defAddr) {
        toast.error("Vui lòng thêm địa chỉ giao hàng!");
        // Có thể mở dialog thêm địa chỉ ở đây nếu muốn
        return;
      }

      setDefaultAddress(defAddr);
      setIsConfirmOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi lấy thông tin địa chỉ");
    }
  };

  const handleFinalConfirm = async () => {
    setIsProcessing(true);
    try {
      console.log("Place Order: ", {
        address: defaultAddress,
        items: cartItems,
        total: calculateTotal(),
        paymentMethod,
        phone: user?.phone_number,
      });

      // Giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsConfirmOpen(false);
      setIsOpen(false); // Đóng Sheet
      toast.success("Đặt hàng thành công!");
      // navigate("/order-success/DH-123456");
    } catch (error) {
      toast.error("Lỗi đặt hàng");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="relative hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {cartItems.length}
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
                  {cartItems.map((item) => (
                    <CartSheetItem
                      key={item.cart_item_id}
                      cartItem={item}
                      handleDelete={handleDeleteItem}
                    />
                  ))}
                </div>

                <div className="border-t p-4 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] bg-white">
                  <div className="flex flex-row items-center justify-between mb-4">
                    <span className="font-semibold flex items-baseline gap-1">
                      Tổng cộng
                      <span className="text-sm font-normal text-muted-foreground">
                        ({cartItems.length} sản phẩm)
                      </span>
                    </span>

                    <span className="font-bold text-lg text-blue-600">
                      {formatMoney(calculateTotal())}
                    </span>
                  </div>

                  <Button
                    className="w-full h-12 text-base font-semibold shadow-md"
                    onClick={handleBuyNow}
                  >
                    Đặt hàng
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DialogConfirmOrder
        open={isConfirmOpen}
        listAddress={listAddress}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleFinalConfirm}
        isLoading={isProcessing}
        address={defaultAddress}
        changeDefaultAddress={setDefaultAddress}
        totalAmount={calculateTotal()}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        phoneNumber={profile?.phone_number || ""}
      />
    </>
  );
}

export default CartSheet;
