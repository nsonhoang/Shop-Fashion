// export const categories = [
//   { id: "t-shirts", name: "T-Shirts" },
//   { id: "jeans", name: "Jeans" },
//   { id: "outerwear", name: "Outerwear" },
//   { id: "shoes", name: "Shoes" },
//   { id: "sweaters", name: "Sweaters" },
//   { id: "hoodies", name: "Hoodies" },
//   { id: "accessories", name: "Accessories" },
// ];

export const mockProducts = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "Basic cotton t-shirt",
    base_price: 29.99,
    category: "t-shirts",
    is_active: true,
    variants: [
      {
        id: "v1",
        sku: "TS-M-W",
        size: "M",
        color: "White",
        price: 29.99,
        stock: 50,
      },
      {
        id: "v2",
        sku: "TS-L-W",
        size: "L",
        color: "White",
        price: 31.99,
        stock: 30,
      },
    ],
    images: [
      { id: "i1", url: "https://via.placeholder.com/150", is_thumbnail: true },
    ],
  },

  {
    id: "2",
    name: "Blue Denim Jeans",
    description: "Comfortable blue jeans",
    base_price: 59.99,
    category: "jeans",
    is_active: false,
    variants: [
      {
        id: "v3",
        sku: "DJ-32-B",
        size: "32",
        color: "Blue",
        price: 59.99,
        stock: 20,
      },
      {
        id: "v4",
        sku: "DJ-34-B",
        size: "34",
        color: "Blue",
        price: 61.99,
        stock: 15,
      },
    ],
    images: [
      { id: "i2", url: "https://via.placeholder.com/150", is_thumbnail: true },
    ],
  },
];
// mockData.js
export const categories = [
  { id: "cat_01", name: "Áo Thun (T-Shirt)", parent_id: null },
  { id: "cat_02", name: "Áo Khoác (Jacket)", parent_id: null },
  { id: "cat_03", name: "Quần Jeans", parent_id: null },
  { id: "cat_04", name: "Giày Sneaker", parent_id: null },
];
