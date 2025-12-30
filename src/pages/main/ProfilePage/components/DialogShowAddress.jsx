import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockAddresses } from "@/constants/mockValue";
import { CheckCircle2 } from "lucide-react"; // Import thêm icon check cho đẹp
import { useEffect, useState } from "react";
import DialogUpdateAdd from "./DialogUpdateAdd";

function DialogShowAddress() {
  const [addresses, setAddresses] = useState([]);
  // 1. State lưu ID của địa chỉ đang được chọn
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      // Giả lập await dữ liệu
      const response = await mockAddresses;
      setAddresses(response);

      // (Tùy chọn) Tự động chọn địa chỉ mặc định khi mở lên
      const defaultAddr = response.find((a) => a.is_default);
      if (defaultAddr) {
        setSelectedId(defaultAddr.address_id);
      }
    };
    fetchAddresses();
  }, []);

  // Hàm xử lý khi bấm nút Sửa
  // const handleEdit = () => {
  //   if (!selectedId) return;
  //   console.log("Đang sửa địa chỉ có ID:", selectedId);
  //   // Tại đây bạn sẽ mở Modal sửa hoặc chuyển trang...
  // };
  const selectAddress = addresses.find((a) => a.address_id === selectedId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Địa chỉ đặt hàng
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Địa chỉ của bạn</DialogTitle>
          <DialogDescription>
            Chọn một địa chỉ để chỉnh sửa hoặc xóa.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 max-h-[400px] overflow-y-auto">
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Bạn chưa lưu địa chỉ nào.
            </p>
          ) : (
            <ul className="space-y-3">
              {addresses
                .sort((a, b) => (b.is_default === true ? 1 : -1))
                .map((address) => {
                  // Kiểm tra xem item này có đang được chọn không
                  const isSelected = selectedId === address.address_id;

                  return (
                    <li
                      key={address.address_id}
                      // 2. Sự kiện click để chọn
                      onClick={() => setSelectedId(address.address_id)}
                      // 3. Style điều kiện: Nếu chọn thì viền đậm màu xanh/đen
                      className={`relative flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" // Style khi ĐƯỢC CHỌN
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50" // Style bình thường
                      }`}
                    >
                      <div className="space-y-1.5 pr-8">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-semibold ${
                              isSelected ? "text-blue-700" : "text-gray-900"
                            }`}
                          >
                            {address.street}
                          </p>

                          {address.is_default && (
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                              Mặc định
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500">{address.city}</p>
                      </div>

                      {/* Icon Check hiện ra khi được chọn */}
                      {isSelected && (
                        <div className="absolute right-4 top-4 text-blue-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>

        <DialogFooter className="gap-2 sm:space-x-0">
          {/* Nút Thêm */}

          <DialogUpdateAdd address={null} isEdit={false}>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
            >
              Thêm mới
            </Button>
          </DialogUpdateAdd>

          {/* Nút Sửa - Đã cập nhật logic */}
          {/* Lưu ý: Nếu muốn bấm Sửa xong mới đóng Modal thì dùng DialogClose. 
              Nếu muốn bấm Sửa -> Mở Modal khác đè lên -> Thì không dùng DialogClose ở đây */}
          <DialogUpdateAdd address={selectAddress} isEdit={true}>
            <Button
              type="button"
              disabled={!selectedId} // 4. Disable nếu chưa chọn
              // onClick={handleEdit}
              className="bg-amber-500 hover:bg-amber-600 text-white flex-1 sm:flex-none"
            >
              Sửa địa chỉ
            </Button>
          </DialogUpdateAdd>

          {/* Nút Đóng */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 sm:flex-none"
            >
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogShowAddress;
