export const mockCartData = {
  // Bảng CARTS
  cart_id: "cart_uuid_abc123",
  user_id: "user_uuid_1",

  // Dữ liệu tổng hợp (Frontend tự tính hoặc Backend trả về)
  // total_items: 3,
  // estimated_total: 1900000, // (350k * 2) + 1tr2

  // Bảng CART_ITEMS (đã join với Product & Variant)
  items: [
    {
      // --- Dữ liệu từ bảng CART_ITEMS ---
      cart_item_id: "item_uuid_001",
      quantity: 2,

      // --- Dữ liệu từ bảng PRODUCT_VARIANTS (Join) ---
      variant_id: "variant_uuid_101",
      sku: "TSHIRT-BLK-L",
      size: "L",
      color: "Black",
      price_adjustment: 0, // Giá không đổi so với giá gốc
      variant_image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=200",

      // --- Dữ liệu từ bảng PRODUCTS (Join) ---
      product: {
        product_id: "prod_uuid_999",
        name: "Áo Thun Basic Signature",
        base_price: 350000,
        slug: "ao-thun-basic-signature",
        description: "Áo thun cotton 100% co giãn 4 chiều.",
      },
    },
    {
      // --- Dữ liệu từ bảng CART_ITEMS ---
      cart_item_id: "item_uuid_002",
      quantity: 1,

      // --- Dữ liệu từ bảng PRODUCT_VARIANTS (Join) ---
      variant_id: "variant_uuid_202",
      sku: "JEANS-BLU-32",
      size: "32",
      color: "Navy Blue",
      price_adjustment: 50000, // Size lớn hoặc màu hiếm đắt hơn 50k
      variant_image:
        "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=200",

      // --- Dữ liệu từ bảng PRODUCTS (Join) ---
      product: {
        product_id: "prod_uuid_888",
        name: "Quần Jeans Slim Fit",
        base_price: 1150000,
        slug: "quan-jeans-slim-fit",
        description: "Quần Jeans form ôm thời thượng.",
      },
    },
  ],
};
