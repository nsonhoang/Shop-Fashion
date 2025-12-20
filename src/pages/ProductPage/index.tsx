import { Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import SelectSize from "./components/SelectSize";
import SelectColor from "./components/selectColor";

export const product = {
  // --- 1. Thông tin cơ bản (Bảng PRODUCTS) ---
  id: "prod_001",
  name: "Áo Thun Oversize Streetwear Premium",
  description:
    "Chất liệu cotton 100% định lượng 250gsm dày dặn, không xù lông. Form áo rộng rãi thoáng mát, phù hợp cho cả nam và nữ.",
  base_price: 350000, // 350k
  avg_rating: 4.8, // Tính trung bình từ bảng reviews
  total_reviews: 125, // Tổng số review

  // --- 2. Danh sách ảnh (Bảng PRODUCT_IMAGES) ---
  images: [
    {
      id: "img_01",
      url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
      display_order: 0,
    },
    {
      id: "img_02",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
      display_order: 1,
    },
    {
      id: "img_03",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      display_order: 2,
    },
    {
      id: "img_04",
      url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
      display_order: 3,
    },
  ],

  // --- 3. Biến thể (Bảng PRODUCT_VARIANTS) ---
  variants: [
    { id: "var_01", size: "S", color: "Black", stock: 10, price_adjustment: 0 },
    { id: "var_02", size: "M", color: "Black", stock: 15, price_adjustment: 0 },
    { id: "var_03", size: "L", color: "Black", stock: 0, price_adjustment: 0 }, // Hết hàng
    {
      id: "var_04",
      size: "XL",
      color: "Black",
      stock: 5,
      price_adjustment: 20000,
    }, // Size to đắt hơn 20k
    { id: "var_05", size: "M", color: "White", stock: 8, price_adjustment: 0 },
  ],

  // --- 4. Đánh giá (Bảng REVIEWS join với PROFILES) ---
  reviews: [
    {
      review_id: "rv_01",
      user: {
        id: "usr_01",
        full_name: "Nguyễn Văn A",
        avatar_url: "https://i.pravatar.cc/150?u=usr_01", // Avatar ngẫu nhiên
      },
      rating: 5, // 5 sao
      comment: "Áo đẹp, vải dày dặn đúng như mô tả. Giao hàng siêu nhanh!",
      created_at: "2024-12-10T08:30:00Z",
      variant_purchased: "Black / XL", // (Optional) Mua loại nào review loại đó
    },
    {
      review_id: "rv_02",
      user: {
        id: "usr_02",
        full_name: "Trần Thị B",
        avatar_url: "https://i.pravatar.cc/150?u=usr_02",
      },
      rating: 4, // 4 sao
      comment:
        "Form áo hơi rộng so với mình nghĩ, nhưng chất vải thì ok. Nên lùi 1 size nha mọi người.",
      created_at: "2024-12-12T14:15:00Z",
      variant_purchased: "White / M",
    },
    {
      review_id: "rv_03",
      user: {
        id: "usr_03",
        full_name: "Le Tuan C",
        avatar_url: null, // Trường hợp user không có avatar
      },
      rating: 5,
      comment: "Đóng gói cẩn thận, shop tư vấn nhiệt tình. Sẽ ủng hộ lần sau.",
      created_at: "2024-12-15T09:00:00Z",
      variant_purchased: "Black / S",
    },
  ],
};

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectColor, setSelectColor] = useState<string | null>("chưa chọn");
  const [selectSize, setSelectSize] = useState<string | null>(null);

  const colorOptions = Array.from(
    new Set(product.variants.map((variant) => variant.color))
  );

  const sizeOptions = Array.from(
    new Set(product.variants.map((variant) => variant.size))
  );

  return (
    <div className="product-page flex justify-center items-center mt-20">
      <div className="max-w-7xl w-full grid grid-cols-2 gap-4">
        <div className="list-image flex flex-col gap-2">
          {/* hình ảnh */}
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img
              src={product.images[selectedImageIndex].url}
              alt="Product"
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
          {/* ảnh thu nhỏ */}
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 aspect-[3/4] bg-gray-200 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-black opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info flex flex-col  ">
          {/* tag category */}
          <span className="text-base text-gray-600 font-thin"> Men</span>
          {/* tên sản phẩm */}
          <div className="flex flex-row ">
            <h1 className="text-2xl font-semibold w-70">{product.name}</h1>
            {/* giá */}
            <span className="text-xl font-semibold text-gray-800">
              123.000đ
            </span>
          </div>
          {/* rating */}
          {product.avg_rating > 0 && (
            <div className="flex items-center mt-2 gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < product.avg_rating
                        ? "fill-gray-700 text-gray-700"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.avg_rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.length}{" "}
                {product.reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
          {/* kẻ ngang */}
          <div className="border-t border-gray-200 my-4" />
          {/* chọn màu */}
          <SelectColor
            colorOptions={colorOptions}
            selectColor={selectColor}
            setSelectColor={setSelectColor}
          />
          {/* chọn size */}
          <div className="mt-10">
            <SelectSize
              sizeOptions={sizeOptions}
              selectSize={selectSize}
              setSelectSize={setSelectSize}
            />
          </div>
          {/* nút thêm vào giỏ hàng */}
          <div className="mt-10">
            <button className="bg-black text-xl text-white py-2 px-4 font-thin w-[70%]">
              Thêm vào giỏ hàng
            </button>
          </div>
          {/* kẻ ngang */}
          <div className="border-t border-gray-200 mt-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
