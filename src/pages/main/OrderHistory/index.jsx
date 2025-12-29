import { useEffect, useState } from "react";
import ListOrderHistory from "./components/ListOrderHistory";
import { mockOrdersStrict } from "@/constants/mockValue";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Giả lập gọi API để lấy dữ liệu đơn hàng
    const fetchOrders = async () => {
      // Thay thế bằng API thực tế
      const response = await new Promise((resolve) => {
        const orders = mockOrdersStrict;
        setTimeout(() => resolve(orders), 1000);
      });
      setOrders(response);
    };

    fetchOrders();
  }, []);
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
