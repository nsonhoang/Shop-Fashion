import CategoryImageItem from "@/components/CategoryImageItem";
const category = [
  {
    imageSrc:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/403/511/products/o1cn01qbw72e1qncngfnoat9003520.jpg", // Online image URL
    title: "Váy Đầm",
    link: "#",
  },
  {
    imageSrc:
      "https://product.hstatic.net/1000402464/product/fwws25ss02c__1__b1dc794c26584bf99864bfe4aee50bf3_master.jpg",
    title: "Áo Sơ Mi",
    link: "#",
  },
  {
    imageSrc:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/119/564/products/ao-thun-nu-han-quoc-s5952.jpg?v=1686128637410",
    title: "Áo Thun",
    link: "#",
  },
  {
    imageSrc: "https://germe.vn/wp-content/uploads/2024/05/7.png",
    title: "Quần Dài",
    link: "#",
  },
  {
    imageSrc:
      "https://product.hstatic.net/1000341902/product/maybi_x_martinishoot_78_a1e9b64633b142aa91ad063e987065a4.jpg",
    title: "Chân Váy",
    link: "#",
  },
  {
    imageSrc:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/119/564/products/ao-khoac-nu-cong-so67.jpg?v=1692607643270",
    title: "Áo Khoác",
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
