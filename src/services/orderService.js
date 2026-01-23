import { supabase } from "@/lib/supabase";

export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, profiles(*), addresses(*), shipments (*), payments (*), order_items(*, product_variants(*, products(*)))",
      );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("lỗi lấy dữ liệu đơn hàng thất bại:", error);
    throw error;
  }
};
// 1. Hàm cập nhật trạng thái chung (Dùng cho Processing, Delivered...)
export const updateOrderStatus = async (orderId, newStatus) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: newStatus }) // newStatus phải là: PENDING, PROCESSING, SHIPPED...
    .eq("order_id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 2. Hàm XÁC NHẬN GIAO HÀNG THÀNH CÔNG (Chốt đơn & Chốt tiền)
export const confirmDelivery = async (orderId) => {
  try {
    // A. Cập nhật Order -> DELIVERED (Theo hình 1)
    const { error: orderError } = await supabase
      .from("orders")
      .update({ status: "DELIVERED" })
      .eq("order_id", orderId);

    if (orderError) throw orderError;

    // B. Cập nhật Payment -> COMPLETED (Theo hình 2 - Thay cho chữ PAID)
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        status: "COMPLETED",
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId);

    if (paymentError) throw paymentError;

    return true;
  } catch (error) {
    console.error("Lỗi xác nhận giao hàng:", error);
    throw error;
  }
};

// 3. Hàm HỦY ĐƠN
export const cancelOrder = async (orderId) => {
  try {
    // A. Order -> CANCELLED (Theo hình 1)
    const { error: orderError } = await supabase
      .from("orders")
      .update({ status: "CANCELLED" })
      .eq("order_id", orderId);

    if (orderError) throw orderError;

    // B. Payment -> FAILED (Theo hình 2)
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        status: "FAILED",
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId);

    if (paymentError) throw paymentError;

    return true;
  } catch (error) {
    console.error("Lỗi hủy đơn:", error);
    throw error;
  }
};
