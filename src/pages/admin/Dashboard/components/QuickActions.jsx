import React from 'react';
import { Plus, ShoppingCart, PackageCheck, BarChart } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: Plus,
      label: 'Thêm sản phẩm',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'hover:border-blue-500'
    },
    {
      id: 2,
      icon: ShoppingCart,
      label: 'Xử lý đơn hàng',
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50',
      borderColor: 'hover:border-green-500'
    },
    {
      id: 3,
      icon: PackageCheck,
      label: 'Kiểm kho',
      color: 'text-purple-600',
      bgColor: 'hover:bg-purple-50',
      borderColor: 'hover:border-purple-500'
    },
    {
      id: 4,
      icon: BarChart,
      label: 'Xem báo cáo',
      color: 'text-orange-600',
      bgColor: 'hover:bg-orange-50',
      borderColor: 'hover:border-orange-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Thao tác nhanh</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg transition-colors ${action.bgColor} ${action.borderColor}`}
          >
            <action.icon size={24} className={`mb-2 ${action.color}`} />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;