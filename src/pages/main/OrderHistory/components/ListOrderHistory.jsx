import React from "react";
import { CheckCircle, Truck, Package, Clock } from "lucide-react";
// Bỏ import thừa (ItemOrder)
import ItemOrderHistory from "./ItemOrderHistory";
import { formatMoney } from "@/utils/formatMoney";

const getStatusConfig = (status) => {
  switch (status) {
    case "DELIVERED":
      return {
        color: "text-green-600",
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Delivered",
      };
    case "SHIPPING":
      return {
        color: "text-blue-600",
        icon: <Truck className="w-4 h-4" />,
        text: "Shipping",
      };
    default:
      return {
        color: "text-gray-600",
        icon: <Clock className="w-4 h-4" />,
        text: "Processing",
      };
  }
};

const ListOrderHistory = ({ orders }) => {
  return (
    <div className="w-full mx-auto p-6 font-sans">
      <div className="space-y-8">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);

          return (
            <div
              key={order.order_id}
              className="border border-[#e5e7eb] rounded-sm overflow-hidden bg-gray-100"
            >
              <div className="bg-gray-50 shadow-xs border-b border-[#e5e7eb] p-5 flex flex-wrap justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-gray-900 font-medium text-base mb-1">
                    {order.order_id}
                  </h3>
                  <p className="text-gray-500 text-sm font-light">
                    Placed on {order.created_at}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 font-medium text-sm ${statusConfig.color}`}
                >
                  {statusConfig.icon}
                  <span>{statusConfig.text}</span>
                </div>
              </div>

              <ItemOrderHistory items={order.items} />

              <div className="bg-gray-50 border-t border-[#e5e7eb] p-5 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="text-gray-500 mr-1">Tracking:</span>
                  <span className="font-medium">
                    {order.shipping_address.address_id}
                  </span>
                </div>
                <div className="font-serif text-xl text-gray-900">
                  Total: {formatMoney(order.total_amount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOrderHistory;
