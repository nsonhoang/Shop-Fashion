import React, { useState } from "react";

const CategoryProduct = ({
  title = "Danh Mục Sản Phẩm",
  filterOptions = [
    { id: 'all', label: 'Tất cả', value: 'all' },
    { id: 'new', label: 'Mới nhất', value: 'new' },
    { id: 'sale', label: 'Đang giảm giá', value: 'sale' },
    { id: 'popular', label: 'Phổ biến', value: 'popular' },
  ],
  onFilterChange
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
    if (onFilterChange) {
      onFilterChange(filterValue);
    }
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {title}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFilterClick(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === option.value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;