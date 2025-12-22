function ProductDetail({ product }) {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>
      <p className="mt-2 text-gray-700 font-medium tracking-wider">
        {product.description}
      </p>
    </div>
  );
}

export default ProductDetail;
