import React from "react";
import { Link } from "react-router-dom";

const CategoryImage = ({ 
  categories = [],
  title = "Danh mục",
  columns = 5
}) => {
  const gridClass = `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4`;
  
  const displayCategories = categories.length > 0 ? categories : [
    { id: 1, name: "Đầm/Váy", image: "/categories/dresses.jpg", count: "45 sản phẩm", slug: "dresses" },
    { id: 2, name: "Áo", image: "/categories/tops.jpg", count: "32 sản phẩm", slug: "tops" },
    { id: 3, name: "Quần", image: "/categories/pants.jpg", count: "28 sản phẩm", slug: "pants" },
    { id: 4, name: "Áo khoác", image: "/categories/jackets.jpg", count: "24 sản phẩm", slug: "jackets" },
    { id: 5, name: "Phụ kiện", image: "/categories/accessories.jpg", count: "56 sản phẩm", slug: "accessories" },
  ];

  return (
    <div className="category-section">
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
      )}
      
      <div className={gridClass}>
        {displayCategories.map((category) => (
          <Link 
            key={category.id} 
            to={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 group-hover:scale-105 transition-transform duration-500">
              {category.image && (
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-lg mb-1">{category.name}</h4>
              <p className="text-white/80 text-sm">{category.count}</p>
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">
                Xem ngay →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryImage;