import CategoryImageItem from "./CategoryImageItem";

// 1. IMPORT ẢNH (Để bundler xử lý được đường dẫn)
// Hoặc bạn có thể vứt ảnh vào thư mục public và dùng đường dẫn "/assets/..."
import img1 from "../../../assets/shopbyCategory1.png";
import img2 from "../../../assets/shopbyCategory2.png";
import img3 from "../../../assets/shopbyCategory3.png";
import img4 from "../../../assets/shopbyCategory4.png";
import img5 from "../../../assets/shopbyCategory5.png";
import img6 from "../../../assets/shopbyCategory6.png";

const category = [
  {
    imageSrc: img1, // Dùng biến đã import
    title: "Áo Sơ Mi",
    link: "#",
  },
  {
    imageSrc: img2,
    title: "Đồ Jeans",
    link: "#",
  },
  {
    imageSrc: img3,
    title: "Áo Thun",
    link: "#",
  },
  {
    imageSrc: img4,
    title: "Quần",
    link: "#",
  },
  {
    imageSrc: img5,
    title: "Quần",
    link: "#",
  },
  {
    imageSrc: img6,
    title: "Áo khoác",
    link: "#",
  },
];

function CategoryImage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4 px-2 container mx-auto">
      {/* 2. SỬA FOREACH THÀNH MAP */}
      {category.map((item, index) => (
        <CategoryImageItem
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          link={item.link}
        />
      ))}
    </div>
  );
}

export default CategoryImage;
