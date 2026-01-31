import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// 1. IMPORT THÊM ICON PHONE
import { MapPin, CreditCard, Loader2, DollarSign, Phone } from "lucide-react";
import { formatMoney } from "@/utils/formatMoney";

function DialogConfirmOrder({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  address,
  listAddress = [],
  changeDefaultAddress,
  totalAmount,
  paymentMethod = "COD",
  onPaymentMethodChange,
  phoneNumber, // 2. ĐẢM BẢO PROPS NÀY ĐƯỢC TRUYỀN VÀO
}) {
  const paymentLabel = {
    COD: "Thanh toán khi nhận hàng (COD)",
    VN_PAY: "Ví VNPay",
    BANKING: "Chuyển khoản ngân hàng",
  };

  const handleAddressChange = (value) => {
    const selected = listAddress.find(
      (item) => item.address_id.toString() === value,
    );
    if (selected) {
      changeDefaultAddress(selected);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-700">
            Xác nhận đặt hàng
          </DialogTitle>
          <DialogDescription>
            Vui lòng kiểm tra kỹ thông tin trước khi hoàn tất đơn hàng.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 1. Địa chỉ giao hàng */}
          <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-semibold text-sm text-gray-900">
                Địa chỉ nhận hàng:
              </span>
            </div>
            <div className="w-full">
              <Select
                value={address?.address_id?.toString()}
                onValueChange={handleAddressChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-white h-auto py-2">
                  <SelectValue placeholder="Chọn địa chỉ" />
                </SelectTrigger>
                <SelectContent>
                  {listAddress && listAddress.length > 0 ? (
                    listAddress.map((addr) => (
                      <SelectItem
                        key={addr.address_id}
                        value={addr.address_id.toString()}
                      >
                        <div className="flex flex-col text-left items-start gap-0.5">
                          <span className="font-medium text-sm">
                            {addr.recipient_name}
                            {addr.is_default && (
                              <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1 rounded border border-blue-200">
                                Mặc định
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500 truncate max-w-[350px]">
                            {addr.street}, {addr.city}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500 text-center">
                      Chưa có địa chỉ nào
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 2. SỐ ĐIỆN THOẠI (MỚI THÊM) */}
          <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-sm text-gray-900">
                Số điện thoại liên hệ:
              </span>
            </div>

            <div className="w-full pl-6">
              {phoneNumber ? (
                <span className="font-bold text-gray-800 text-base tracking-wide">
                  {phoneNumber}
                </span>
              ) : (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-red-600">
                    Chưa có số điện thoại!
                  </span>
                  <span className="text-xs text-gray-500">
                    Vui lòng cập nhật số điện thoại tại trang Thông tin cá nhân
                    để tiếp tục.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Phương thức thanh toán */}
          <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-sm text-gray-900">
                Phương thức thanh toán:
              </span>
            </div>
            <div className="w-full">
              <Select
                value={paymentMethod}
                onValueChange={onPaymentMethodChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full bg-white h-auto py-2">
                  <SelectValue placeholder="Chọn phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(paymentLabel).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      <span className="font-medium text-sm">{label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 4. Tổng tiền */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 mt-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-700" />
              <span className="font-semibold text-gray-700">
                Tổng thanh toán:
              </span>
            </div>
            <span className="text-xl font-bold text-blue-700">
              {formatMoney(totalAmount)}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Quay lại
          </Button>

          {/* KHÓA NÚT NẾU KHÔNG CÓ SĐT */}
          <Button
            onClick={onConfirm}
            disabled={isLoading || !address} // Thêm điều kiện !phoneNumber
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đặt hàng ngay"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogConfirmOrder;
