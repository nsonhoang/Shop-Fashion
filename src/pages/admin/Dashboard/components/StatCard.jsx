import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive', isCurrency = false }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {isCurrency ? formatCurrency(value) : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${changeType === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          <Icon size={24} />
        </div>
      </div>
      {change && (
        <div className={`mt-4 text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          <span className="font-medium">{change}</span> so với tháng trước
        </div>
      )}
    </div>
  );
};

export default StatCard;