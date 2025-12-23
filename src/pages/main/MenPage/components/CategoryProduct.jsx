import CategoryItem from "./CategoryItem";

function CategoryProduct() {
  return (
    <div className="category-product h-15 w-full flex items-center justify-center gap-4 ">
      <CategoryItem link="/men/outerwear" title="Áo Khoác Ấm" />
      <CategoryItem link="/men/tshirts" title="Áo Thun" />
      <CategoryItem link="/men/pants" title="Quần Dài" />
      <CategoryItem link="/men/shoes" title="Giày Dép" />
      <CategoryItem link="/men/accessories" title="Phụ Kiện" />
      <CategoryItem link="/men/sale" title="Khuyến Mãi" />
    </div>
  );
}

export default CategoryProduct;
