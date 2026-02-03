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
import { CheckCircle2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DialogUpdateAdd from "./DialogUpdateAdd";
import { useAuth } from "@/contexts/AuthContext";
import { deleteAddress, getFullAddress } from "@/services/addressService";
import { toast } from "sonner";

// ĐÃ XÓA IMPORT SONNER Ở ĐÂY

function DialogShowAddress() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // 1. Fetch dữ liệu
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!user?.id) return;
        const data = await getFullAddress(user.id);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [user]);

  const selectAddress = addresses.find((a) => a.address_id === selectedId);

  // 2. Logic cập nhật State khi Sửa
  const handleChangeAddress = (updatedAddress) => {
    setAddresses((prevAddresses) => {
      if (updatedAddress.is_default) {
        return prevAddresses.map((addr) => ({
          ...addr,
          ...(addr.address_id === updatedAddress.address_id
            ? updatedAddress
            : { is_default: false }),
        }));
      }
      return prevAddresses.map((addr) =>
        addr.address_id === updatedAddress.address_id ? updatedAddress : addr,
      );
    });
  };

  // 3. Logic cập nhật State khi Thêm
  const handleAddAddress = (newAddress) => {
    setAddresses((prevAddresses) => {
      if (newAddress.is_default) {
        const resetOldList = prevAddresses.map((addr) => ({
          ...addr,
          is_default: false,
        }));
        return [...resetOldList, newAddress];
      }
      return [...prevAddresses, newAddress];
    });
  };

  // 4. Logic XÓA
  const handleDelete = async () => {
    if (!selectedId) return;

    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn xóa địa chỉ này không?",
    );
    if (!isConfirm) return;

    try {
      await deleteAddress(selectedId);

      // Cập nhật State
      setAddresses((prev) =>
        prev.filter((item) => item.address_id !== selectedId),
      );
      setSelectedId(null);

      // Dùng alert thay vì toast
      toast.success("Đã xóa địa chỉ thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      toast.error("Lỗi: Không thể xóa địa chỉ này.");
    }
  };

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

        <div className="py-4 max-h-[400px] overflow-y-auto pr-1">
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Bạn chưa lưu địa chỉ nào.
            </p>
          ) : (
            <ul className="space-y-3">
              {addresses
                .sort((a, b) => (b.is_default === true ? 1 : -1))
                .map((address) => {
                  const isSelected = selectedId === address.address_id;
                  return (
                    <li
                      key={address.address_id}
                      onClick={() => setSelectedId(address.address_id)}
                      className={`relative flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="space-y-1.5 pr-8">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-semibold ${isSelected ? "text-blue-700" : "text-gray-900"}`}
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
          <DialogUpdateAdd
            address={null}
            isEdit={false}
            onSuccess={handleAddAddress}
            isDefault={addresses.length === 0}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none">
              Thêm mới
            </Button>
          </DialogUpdateAdd>

          <DialogUpdateAdd
            address={selectAddress}
            isEdit={true}
            onSuccess={handleChangeAddress}
          >
            <Button
              type="button"
              disabled={!selectedId}
              className="bg-amber-500 hover:bg-amber-600 text-white flex-1 sm:flex-none"
            >
              Sửa
            </Button>
          </DialogUpdateAdd>

          {/* Nút XÓA */}
          <Button
            type="button"
            variant="destructive"
            disabled={!selectedId}
            onClick={handleDelete}
            className="flex-1 sm:flex-none gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </Button>

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
