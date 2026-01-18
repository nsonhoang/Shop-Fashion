//định dạng hiển thị số sang vnd tring input
// --- 1. Hàm Format hiển thị (Helper) ---
export const formatNumber = (value) => {
  if (value === undefined || value === null || value === "") return "";
  const cleanValue = String(value).replace(/\D/g, "");
  if (cleanValue === "") return "";
  return new Intl.NumberFormat("vi-VN").format(Number(cleanValue));
};
