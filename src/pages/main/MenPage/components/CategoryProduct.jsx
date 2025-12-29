import CategoryItem from "./CategoryItem";

function CategoryProduct() {
  return (
    // Thêm class 'sticky top-0 z-50 bg-white' nếu muốn nó dính trên cùng khi cuộn
    <div className="w-full bg-white border-b border-gray-100">
      <div
        className="
        flex items-center 
        gap-4 
        px-4 
        h-16             /* Thay h-15 (không chuẩn) thành h-16 (64px) */
        overflow-x-auto  /* Cho phép cuộn ngang trên mobile */
        no-scrollbar     /* Ẩn thanh scrollbar đi cho đẹp */
        md:justify-center /* Trên PC thì căn giữa */
      "
      >
        {/* Wrapper cho item để đảm bảo chữ không bị xuống dòng */}
        <div className="shrink-0">
          <CategoryItem link="/men/outerwear" title="Áo Khoác Ấm" />
        </div>
        <div className="shrink-0">
          <CategoryItem link="/men/tshirts" title="Áo Thun" />
        </div>
        <div className="shrink-0">
          <CategoryItem link="/men/pants" title="Quần Dài" />
        </div>
        <div className="shrink-0">
          <CategoryItem link="/men/shoes" title="Giày Dép" />
        </div>
        <div className="shrink-0">
          <CategoryItem link="/men/accessories" title="Phụ Kiện" />
        </div>
        <div className="shrink-0">
          <CategoryItem link="/men/sale" title="Khuyến Mãi" />
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
