import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockCartData } from "@/constants/mockValue";
import { Car, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import CartSheetItem from "./CartSheetItem";
import { formatMoney } from "@/utils/formatMoney";

function CartSheet() {
  const [cartList, setCartList] = useState(mockCartData);
  console.log("cartList", cartList.length);

  const handleBuyNow = (product) => {
    console.log("Cập nhật số lượng:", product);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
          <ShoppingCart className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetClose className=" mb-5" />
        <SheetHeader className=" pb-4">
          <SheetTitle className="text-lg font-semibold">
            Giỏ hàng Của Tôi
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cartList.length === 0 ? (
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

              {/* Nút giả lập thêm hàng để test */}
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Tiếp tục mua sắm
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div>
                {cartList.items.map((item, index) => (
                  <CartSheetItem key={index} cartItem={item} />
                ))}
              </div>
              <div className="border-t p-4 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]  ">
                {" "}
                <div className="flex flex-row items-center justify-between mb-4">
                  <span className="font-semibold flex items-baseline gap-1">
                    {" "}
                    Tổng cộng
                    <span className="text-sm font-normal text-muted-foreground">
                      ({cartList.items.length} sản phẩm)
                    </span>
                  </span>

                  <span className="font-bold text-lg">
                    {formatMoney(
                      cartList.items.reduce(
                        (total, item) =>
                          total +
                          (item.product.base_price + item.price_adjustment) *
                            item.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
                <SheetClose asChild>
                  {/* <Link to="/checkout"> */}
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-md"
                    onClick={() => handleBuyNow(cartList.items)}
                  >
                    Thanh toán ngay
                  </Button>
                  {/* </Link> */}
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
