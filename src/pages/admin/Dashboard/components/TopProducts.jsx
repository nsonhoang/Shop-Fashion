import React from 'react';
import { Eye } from 'lucide-react';

const TopProducts = ({ products }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sản phẩm bán chạy</h3>
        <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700">
          <Eye size={16} className="mr-1" />
          Xem tất cả
        </button>
      </div>
      
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-gray-600">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">{product.sales} đã bán</p>
              <p className="text-xs text-gray-600">{formatCurrency(product.revenue)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;