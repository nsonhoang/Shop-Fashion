import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../styles/styles.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import các modules cần dùng
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 100000,
    color: "Màu đen",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-khoac-jean-nam-tinh-chinh-hang-hiddle-8.jpg?v=1741754139623",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 200000,
    color: "Màu đỏ",
    image: "https://thoitrangbigsize.vn/wp-content/uploads/2024/07/1-2.jpg",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 300000,
    color: "Màu xanh",
    image:
      "https://cdn.hstatic.net/products/1000026602/csh_0263_1ecf6e66afa5419faa2d614ed37957af_master.jpg",
  },

  {
    id: 4,
    name: "Sản phẩm 4",
    price: 400000,
    color: "Màu vàng",
    image: "https://thoitrangbigsize.vn/wp-content/uploads/2024/07/6-2.jpg",
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    price: 500000,
    color: "Màu trắng",
    image: "https://vulcano.vn/media/wysiwyg/home-categories/B_Qu_n_o.jpg",
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    price: 600000,
    color: "Màu tím",
    image:
      "https://cdn.hstatic.net/products/200000690725/_o_web__1__80f17c47b88741a5934c9cf35d6b35e7_master.png",
  },
];

function ProductList() {
  const navigation = useNavigate();
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
              image={product.image}
              name={product.name}
              price={product.price}
              color={product.color}
              onClick={() => console.log("Product clicked:", product.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductList;
