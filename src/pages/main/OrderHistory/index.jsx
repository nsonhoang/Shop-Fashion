import { useEffect, useState } from "react";
import ListOrderHistory from "./components/ListOrderHistory";

import { useAuth } from "@/contexts/AuthContext";
import { getOrderByUserId } from "@/services/orderService";
import { toast } from "sonner";

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Giả lập gọi API để lấy dữ liệu đơn hàng
    const fetchOrders = async () => {
      try {
        const orders = await getOrderByUserId(user.id);
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Không thể tải lịch sử đơn hàng.");
      }
    };

    fetchOrders();
  }, [user.id]);
  console.log("orders history:", orders);
  return (
    <div>
      <div className="title mt-10">
        <h1 className=" text-3xl md:text-4xl text-[#0f172a] mb-1">
          Lịch sử mua hàng
        </h1>
        <p className="font-sans text-gray-500 text-base font-normal">
          Xem lại các đơn hàng đã đặt của bạn.
        </p>
      </div>
      {/* Danh sách đơn hàng */}
      <div className="">
        <ListOrderHistory orders={orders} />
      </div>
    </div>
  );
}

export default OrderHistory;
