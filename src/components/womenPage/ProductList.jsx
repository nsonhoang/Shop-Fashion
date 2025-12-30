import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ 
  category = 'women',
  featured = false,
  limit = 8,
  showFilter = false,
  onProductClick
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sampleProducts = [
    {
      id: 1,
      name: "Đầm suông hoa nhí",
      price: 450000,
      originalPrice: 550000,
      image: "/products/dress1.jpg",
      category: "dress",
      description: "Đầm suông dáng dài, chất liệu vải mềm mại",
      rating: 4.5,
      reviewCount: 28,
      isNew: true,
      isSale: true,
      salePercentage: 18,
      colors: ["Pink", "White", "Beige"],
      sizes: ["S", "M", "L"]
    },
    {
      id: 2,
      name: "Áo thun cổ tròn",
      price: 250000,
      image: "/products/top1.jpg",
      category: "top",
      rating: 4.2,
      reviewCount: 15,
      colors: ["White", "Black", "Gray"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Quần jeans ống rộng",
      price: 380000,
      originalPrice: 450000,
      image: "/products/jeans1.jpg",
      category: "pants",
      rating: 4.7,
      reviewCount: 42,
      isSale: true,
      salePercentage: 15,
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"]
    },
    {
      id: 4,
      name: "Áo khoác denim",
      price: 520000,
      image: "/products/jacket1.jpg",
      category: "jacket",
      rating: 4.8,
      reviewCount: 31,
      isNew: true,
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"]
    },
    {
      id: 5,
      name: "Váy công sở",
      price: 490000,
      image: "/products/dress2.jpg",
      category: "dress",
      rating: 4.3,
      reviewCount: 19,
      colors: ["Black", "Navy", "Gray"],
      sizes: ["S", "M"]
    },
    {
      id: 6,
      name: "Áo len cổ lọ",
      price: 320000,
      image: "/products/sweater1.jpg",
      category: "sweater",
      rating: 4.6,
      reviewCount: 23,
      isNew: true,
      colors: ["Beige", "Brown", "Cream"],
      sizes: ["S", "M", "L"]
    },
    {
      id: 7,
      name: "Quần short kaki",
      price: 280000,
      image: "/products/shorts1.jpg",
      category: "shorts",
      rating: 4.0,
      reviewCount: 12,
      colors: ["Beige", "Green", "Blue"],
      sizes: ["S", "M", "L"]
    },
    {
      id: 8,
      name: "Set đồ bộ",
      price: 650000,
      originalPrice: 750000,
      image: "/products/set1.jpg",
      category: "set",
      rating: 4.9,
      reviewCount: 37,
      isSale: true,
      salePercentage: 13,
      colors: ["Pink", "White"],
      sizes: ["S", "M"]
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        let filteredProducts = category !== 'all' 
          ? sampleProducts.filter(p => p.category.includes(category === 'women' ? 'dress' : ''))
          : sampleProducts;
        
        if (featured) {
          filteredProducts = filteredProducts.filter(p => p.isNew || p.isSale);
        }
        
        filteredProducts = filteredProducts.slice(0, limit);
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError("Không thể tải sản phẩm");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured, limit]);

  const handleProductClick = (productId) => {
    if (onProductClick) {
      onProductClick(productId);
    }
    console.log(`Product clicked: ${productId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div>
      {showFilter && (
        <div className="mb-6 flex flex-wrap gap-4">
          <select className="border rounded px-3 py-2">
            <option>Sắp xếp theo</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
            <option>Mới nhất</option>
            <option>Bán chạy</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>Danh mục</option>
            <option>Đầm/Váy</option>
            <option>Áo</option>
            <option>Quần</option>
          </select>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;