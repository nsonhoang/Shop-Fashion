import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ 
  product, 
  onClick,
  showDetails = false 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log(`Add to cart: ${product.id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    console.log(`Quick view: ${product.id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>{product.name}</span>
          </div>
        </div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Mới
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{product.salePercentage}%
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          <button 
            onClick={handleQuickView}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            👁️
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            🛒
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>
        
        {product.description && showDetails && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg text-pink-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-600 text-sm">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-600 text-sm">Màu sắc:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        <Link 
          to={`/product/${product.id}`}
          className="block text-center py-2 px-4 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors font-medium text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;