import ProductItem from "../../../../components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/styles/styles.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import các modules cần dùng
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getProductsForCarousel } from "@/services/productService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ProductList() {
  const navigation = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const gender = "MEN";
      try {
        const products = await getProductsForCarousel(gender);
        setProducts(products);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nam cho carousel:", error.message);
        toast.error("Lỗi ");
      }
    };
    fetchProducts();
  }, []);
  console.log("Sản phẩm nam:", products);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Khoảng cách giữa các slide
        slidesPerView={1} // Số slide hiển thị cùng lúc (trên mobile)
        navigation // Mũi tên trái phải
        loop={true} // Lặp vô hạn
        threshold={10} // Kết hợp cái này
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4, // PC hiện 4
          },
        }}
        className="!pb-12 !px-12 h-auto"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            onClick={() => {
              navigation("/product/" + product.id);
            }}
          >
            <ProductItem
              image={
                (
                  product.product_images?.find((img) => img.is_thumbnail) ||
                  product.product_images?.[0]
                )?.image_url
              }
              name={product.name}
              price={product.base_price}
              color={
                product.product_images.find((img) =>
                  img.is_thumbnail ? img.color : null,
                )?.color || product.product_images?.[0]?.color
              }
              onClick={() => console.log("Product clicked:", product.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductList;
