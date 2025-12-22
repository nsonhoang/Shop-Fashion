export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long", // Ra chữ "tháng ..."
    year: "numeric",
  });
};

// Kết quả: "10 tháng 12, 2024"
