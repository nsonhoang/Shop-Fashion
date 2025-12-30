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

export const mockOrdersStrict = [
  {
    // --- 1. Map từ bảng ORDERS ---
    order_id: "ord-uuid-001",
    user_id: "user-uuid-123",
    status: "DELIVERED", // Enum trong ERD
    total_amount: 450000,
    created_at: "2024-03-15T08:30:00Z",

    // --- 2. Join từ bảng ADDRESSES (snapshot) ---
    // Trong ERD là address_id, nhưng API trả về full text để hiển thị
    shipping_address: {
      address_id: "addr-uuid-001",
      street: "123 Lê Lợi",
      city: "Hồ Chí Minh",
      is_default: true,
    },

    // --- 3. Join từ bảng PAYMENTS (Quan hệ 1-1) ---
    payment: {
      payment_id: "pay-uuid-001",
      method: "CREDIT_CARD",
      status: "COMPLETED", // Payment status khác Order status
      amount: 1450000,
    },

    // --- 4. Join từ bảng SHIPMENTS (Quan hệ 1-1) ---
    shipment: {
      shipment_id: "ship-uuid-001",
      tracking_number: "VNPOST-123456789",
      estimated_delivery: "2024-03-18T10:00:00Z",
    },

    // --- 5. Join từ ORDER_ITEMS + VARIANTS + PRODUCTS + IMAGES ---
    items: [
      {
        order_item_id: "item-uuid-001",
        variant_id: "var-uuid-001", // FK tới Variant
        quantity: 2,
        price_at_purchase: 250000, // Giá lúc mua (quan trọng)

        // Thông tin mở rộng (Backend join thêm để Frontend hiển thị)
        product_details: {
          product_id: "prod-uuid-001",
          name: "Áo Thun Cotton Organic",
          variant_sku: "TSHIRT-WHT-M",
          size: "M",
          color: "Trắng",
          gender: "MEN", // Enum gender trong ERD
          thumbnail:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", // Lấy từ PRODUCT_IMAGES where is_thumbnail=true
        },
      },
      {
        order_item_id: "item-uuid-002",
        variant_id: "var-uuid-002",
        quantity: 1,
        price_at_purchase: 200000,
        product_details: {
          product_id: "prod-uuid-002",
          name: "Áo Thun Cotton Organic",
          variant_sku: "TSHIRT-WHT-M",
          size: "M",
          color: "Trắng",
          gender: "MEN",
          thumbnail:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        },
      },
    ],
  },

  // Đơn hàng thứ 2
  {
    order_id: "ord-uuid-002",
    user_id: "user-uuid-123",
    status: "SHIPPING",
    total_amount: 3200000,
    created_at: "2024-03-20T14:15:00Z",

    shipping_address: {
      address_id: "addr-uuid-002",
      street: "456 Nguyễn Huệ",
      city: "Hồ Chí Minh",
      is_default: false,
    },

    payment: {
      payment_id: "pay-uuid-002",
      method: "COD",
      status: "PENDING", // Tiền chưa về vì là COD
      amount: 3200000,
    },

    shipment: {
      shipment_id: "ship-uuid-002",
      tracking_number: "GHN-987654321",
      estimated_delivery: "2024-03-22T15:00:00Z",
    },

    items: [
      {
        order_item_id: "item-uuid-002",
        variant_id: "var-uuid-005",
        quantity: 1,
        price_at_purchase: 3200000,
        product_details: {
          product_id: "prod-uuid-005",
          name: "Áo Khoác Bomber Da",
          variant_sku: "BOMBER-BLK-L",
          size: "L",
          color: "Đen",
          gender: "MEN",
          thumbnail:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3g4945m94fpa4.webp",
        },
      },
    ],
  },
];
export const mockAddresses = [
  // --- USER A (user-uuid-001) ---
  // Có 2 địa chỉ: 1 Mặc định (Nhà riêng), 1 Phụ (Công ty)
  {
    address_id: "addr-uuid-001",
    user_id: "user-uuid-001",
    street: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1", // Trong ERD bạn để 'street', nên mình gộp Số nhà + Phường + Quận vào đây
    city: "Hồ Chí Minh",
    is_default: true, // Địa chỉ mặc định
    created_at: "2023-01-15T08:00:00Z",
    updated_at: "2023-01-15T08:00:00Z",
  },
  {
    address_id: "addr-uuid-002",
    user_id: "user-uuid-001",
    street: "Tòa nhà Bitexco, 2 Hải Triều, Phường Bến Nghé, Quận 1",
    city: "Hồ Chí Minh",
    is_default: false,
    created_at: "2023-02-20T09:30:00Z",
    updated_at: "2023-02-20T09:30:00Z",
  },
];
