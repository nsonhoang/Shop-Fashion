import { supabase } from "@/lib/supabase";

export const createPaymentIntent = async (orderId, payment) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .insert({ ...payment, order_id: orderId })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi tạo payment intent:", error);
    throw error;
  }
};

// Lấy thông tin thanh toán
export const getPaymentById = async (paymentId) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select(
        `
        *,
        orders:order_id (
          total_amount,
          status,
          profiles:user_id (full_name, email)
        )
      `,
      ) // <--- JOIN để lấy thêm chi tiết đơn hàng & khách hàng
      .eq("payment_id", paymentId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi lấy thông tin thanh toán:", error);
    return null; // Trả về null để UI dễ xử lý lỗi hơn là crash app
  }
};
