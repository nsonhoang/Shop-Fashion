import { Star, Check } from "lucide-react"; // Thêm icon Check
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

// import SelectSize from "./components/SelectSize"; // XÓA
// import SelectColor from "./components/selectColor"; // XÓA
import { formatMoney } from "../../../utils/formatMoney";
import ServiceHighlights from "./components/ServiceHighlights";
import ProductDetail from "./components/ProductDetail";
import ProductItem from "../../../components/ProductItem";
import RatingOverview from "./components/RatingOverview";
import ListReviewDetail from "./components/ListReviewDetail";
import TransparentPricing from "./components/TransparentPricing";
import CustomAlert from "../../../components/customAlert";
import { Button } from "@/components/ui/button";
import { getDetailProductAndReViewById } from "@/services/productService";
import { useAuth } from "@/contexts/AuthContext";
import { addCartItemToCart, getCartsByUserId } from "@/services/cartService";

// Dữ liệu giả lập relatedProducts
export const relatedProducts = [
  {
    id: "prod_002",
    name: "Quần Jeans Rách Gối Phong Cách Hàn Quốc",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-khoac-jean-nam-tinh-chinh-hang-hiddle-8.jpg?v=1741754139623",
    price: 450000,
    color: "Blue",
  },
  {
    id: "prod_003",
    name: "Áo Sơ Mi Tay Ngắn Casual",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    price: 300000,
    color: "Light Blue",
  },
  {
    id: "prod_004",
    name: "Giày Thể Thao Năng Động Unisex",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    price: 600000,
    color: "White/Black",
  },
  {
    id: "prod_005",
    name: "Mũ Lưỡi Trai Thời Trang Phong Cách Đường Phố",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
    price: 150000,
    color: "Black",
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // THAY ĐỔI LỚN: Chỉ dùng 1 state cho variant được chọn
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { product, reviews } = await getDetailProductAndReViewById(id);
        setSelectedProduct(product);
        setReviews(reviews || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error.message);
      }
    };
    if (id) fetchData();
  }, [id]);

  // 1. Lấy danh sách ảnh (Lọc trùng lặp) - Giữ nguyên logic này
  const sortedImages = useMemo(() => {
    if (!selectedProduct?.product_variants) return [];

    const allImages = selectedProduct.product_variants.map((variant) => ({
      image_id: variant.variant_id,
      image_url: variant.image_url,
      color: variant.color,
    }));

    const uniqueImages = [];
    const seenUrls = new Set();

    for (const img of allImages) {
      if (img.image_url && !seenUrls.has(img.image_url)) {
        seenUrls.add(img.image_url);
        uniqueImages.push(img);
      }
    }
    return uniqueImages;
  }, [selectedProduct]);

  // (Đã xóa colorOptions và sizeOptions vì không dùng nữa)

  // 4. Tính điểm đánh giá
  const avgRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // --- LOGIC GIÁ ---

  // A. Giá GỐC (Base Price) -> Gạch ngang
  const originalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.base_price;
  }, [selectedProduct]);

  // B. Giá HIỂN THỊ (Variant Price) -> Màu đỏ, đậm
  const variantPrice = useMemo(() => {
    if (!selectedProduct) return 0;

    // Nếu ĐÃ chọn variant -> Tính giá cụ thể (Base + Adjustment)
    if (selectedVariant) {
      return selectedVariant.price_adjustment || 0;
    }

    return selectedProduct.base_price;
  }, [selectedProduct, selectedVariant]);

  // Xử lý khi người dùng chọn một variant
  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);

    // Logic phụ: Tự động chuyển ảnh nếu variant đó có ảnh riêng và ảnh đó có trong list
    if (variant.image_url) {
      const imageIndex = sortedImages.findIndex(
        (img) => img.image_url === variant.image_url,
      );
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  // thêm vào giỏ hàng
  const handleAddToCart = async () => {
    // Kiểm tra đã chọn variant chưa

    if (!selectedVariant) {
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);
      return;
    }

    const cartItem = {
      quantity: 1,
      variantId: selectedVariant.variant_id,
    };
    try {
      await addCartItemToCart(cartItem, user.id);
      setShowAlertSuccess(true);
      setTimeout(() => setShowAlertSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Lỗi mạng hoặc sản phẩm đã có trong giỏ hàng");
    }
  };

  if (!selectedProduct) {
    return (
      <div className="mt-20 text-center">Đang tải dữ liệu sản phẩm...</div>
    );
  }

  return (
    <div className="product-page flex flex-col justify-center items-center mt-20 relative">
      {/* Alert Component */}
      {showAlertError && (
        <div className="fixed top-20 right-5 z-50 w-80 animate-in slide-in-from-right fade-in duration-300">
          <CustomAlert
            type="error"
            title="Chưa chọn phân loại"
            onClose={() => setShowAlertError(false)}
          >
            Vui lòng chọn <strong>loại sản phẩm</strong> (Màu sắc/Kích thước)
            bạn muốn mua.
          </CustomAlert>
        </div>
      )}
      {showAlertSuccess && (
        <div className="fixed top-20 right-5 z-50 w-80 animate-in slide-in-from-right fade-in duration-300">
          <CustomAlert
            type="success"
            title="Thành công"
            onClose={() => setShowAlertSuccess(false)}
          >
            Đã thêm vào giỏ hàng.
          </CustomAlert>
        </div>
      )}

      <div className="max-w-7xl w-full grid grid-cols-2 gap-4">
        {/* --- CỘT TRÁI: ẢNH --- */}
        <div className="list-image flex flex-col gap-2">
          <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-md">
            <img
              src={
                sortedImages[selectedImageIndex]?.image_url ||
                "https://placehold.co/600x800"
              }
              alt={selectedProduct.name}
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
          {sortedImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {sortedImages.map((image, index) => (
                <button
                  key={image.image_id || index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 aspect-[3/4] bg-gray-200 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-black opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`thumb ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- CỘT PHẢI: INFO --- */}
        <div className="product-info flex flex-col">
          <span className="text-base text-gray-600 font-thin uppercase">
            {selectedProduct.gender === "UNISEX"
              ? "Unisex"
              : selectedProduct.gender}
          </span>

          <div className="flex flex-col items-start mt-2 gap-2">
            <h1 className="text-2xl font-semibold w-70">
              {selectedProduct.name}
            </h1>

            {/* GIÁ CẢ */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-red-600">
                {formatMoney(variantPrice)}
              </span>
              <span className="text-lg text-gray-400 line-through mb-1">
                {formatMoney(originalPrice)}
              </span>
              {variantPrice < originalPrice && (
                <span className="mb-1 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                  -
                  {Math.round(
                    ((originalPrice - variantPrice) / originalPrice) * 100,
                  )}
                  %
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center mt-2 gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-gray-900 text-gray-900" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {avgRating}
            </span>
            <span className="text-sm text-gray-400">
              ({reviews.length} đánh giá)
            </span>
          </div>

          <div className="border-t border-gray-200 my-6" />

          {/* --- KHU VỰC CHỌN BIẾN THỂ (PRODUCT VARIANTS) --- */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-gray-900">Chọn loại hàng:</span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedProduct.product_variants.map((variant) => {
                const isSelected =
                  selectedVariant?.variant_id === variant.variant_id;
                return (
                  <button
                    key={variant.variant_id}
                    onClick={() => handleSelectVariant(variant)}
                    className={`
                                relative flex flex-col items-start p-3 border rounded-lg text-sm transition-all
                                ${
                                  isSelected
                                    ? "border-black bg-gray-50 ring-1 ring-black"
                                    : "border-gray-200 hover:border-gray-400 bg-white"
                                }
                            `}
                  >
                    <span className="font-bold text-gray-900">
                      {variant.color} - Size {variant.size}
                    </span>
                    <span className="text-gray-500 text-xs mt-1">
                      SKU: {variant.sku?.split("-")[1]}
                    </span>

                    {/* Icon check nếu được chọn */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-black">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedVariant && (
              <div className="text-sm text-gray-500 mt-2">
                Đã chọn:{" "}
                <span className="font-medium text-black">
                  {selectedVariant.color} / {selectedVariant.size}
                </span>
              </div>
            )}
          </div>

          {/* Nút thêm vào giỏ */}
          <div className="mt-8">
            <button
              className={`
                text-xl py-3 px-4 w-[70%] rounded-sm transition-colors
                ${
                  selectedVariant
                    ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              onClick={handleAddToCart}
              // disabled={!selectedVariant} // Có thể disable hoặc để active nhưng hiện alert
            >
              {selectedVariant ? "Thêm vào giỏ hàng" : "Chọn phân loại hàng"}
            </button>
          </div>

          <div className="border-t border-gray-200 mt-10" />
          <ServiceHighlights />
          <div className="border-t border-gray-200" />
          <div className="mt-5">
            <ProductDetail product={selectedProduct} />
          </div>
        </div>
      </div>

      {/* ... (Các phần relatedProducts, reviews, pricing giữ nguyên) ... */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">
          Hình ảnh khác của sản phẩm
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {selectedProduct.product_images.map((image, index) => (
            <div key={image.image_id} className="aspect-w-1 aspect-h-1">
              <img
                src={image.image_url}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- PHẦN DƯỚI --- */}
      <div className="w-full mt-20">
        <div className="text-lg font-semibold mb-4">
          Đề xuất sản phẩm cùng loại
        </div>
        <div className="grid grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductItem
              key={item.id}
              color={item.color}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Đánh giá từ khách hàng
        </h2>
        <RatingOverview agvRating={Number(avgRating)} reviews={reviews} />
        <div className="mt-8">
          <ListReviewDetail reviews={reviews} />
        </div>
        <div className="flex flex-col items-center gap-3 mt-8 pb-10">
          <Button className="w-[300px] bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
            Viết đánh giá
          </Button>
          <Button className="w-[300px] bg-black hover:bg-gray-800 text-white">
            Xem thêm đánh giá
          </Button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <TransparentPricing />
      </div>
    </div>
  );
};

export default ProductPage;
