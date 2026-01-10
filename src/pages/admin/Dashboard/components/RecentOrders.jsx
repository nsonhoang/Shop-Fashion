import React from 'react';
import { Eye } from 'lucide-react';

const RecentOrders = ({ orders }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ xác nhận' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Đang xử lý' },
      shipping: { color: 'bg-purple-100 text-purple-800', label: 'Đang giao' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Đã giao' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Đã hủy' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
        <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
          <Eye size={16} className="mr-1" />
          Xem tất cả
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b">
              <th className="pb-3 font-medium">Mã đơn</th>
              <th className="pb-3 font-medium">Khách hàng</th>
              <th className="pb-3 font-medium">Ngày</th>
              <th className="pb-3 font-medium">Số tiền</th>
              <th className="pb-3 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 text-sm font-medium">{order.id}</td>
                <td className="py-3 text-sm">{order.customer}</td>
                <td className="py-3 text-sm text-gray-600">{order.date}</td>
                <td className="py-3 text-sm font-medium">{formatCurrency(order.amount)}</td>
                <td className="py-3">
                  {getStatusBadge(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;