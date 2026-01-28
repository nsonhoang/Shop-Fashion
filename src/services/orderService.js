import { supabase } from "@/lib/supabase";
import { deleteCartItemByUserId } from "./cartService";
import { createPaymentIntent } from "./paymentService,js";
import { createShipment } from "./shipmentService";

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
        // updated_at: new Date().toISOString(),
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
        // updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId);

    if (paymentError) throw paymentError;

    return true;
  } catch (error) {
    console.error("Lỗi hủy đơn:", error);
    throw error;
  }
};

export const getOrderByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, profiles(*), addresses(*), shipments (*), payments (*), order_items(*, product_variants(*, products(*)))",
      )
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi lấy đơn hàng theo ID người dùng:", error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, profiles(*), addresses(*), shipments (*), payments (*), order_items(*, product_variants(*, products(*)))",
      )
      .eq("order_id", orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi lấy đơn hàng theo ID người dùng:", error);
    throw error;
  }
};

export const createOrder = async (orderData, userId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...orderData, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    throw error;
  }
};
export const createItemOrder = async (orderId, itemData) => {
  try {
    const { data, error } = await supabase
      .from("order_items")
      .insert({ ...itemData, order_id: orderId })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi tạo mục đơn hàng:", error);
    throw error;
  }
};
export const createOrdersAndItems = async (
  orderData,
  itemsData,
  userId,
  payment,
  shipments,
) => {
  let createdOrderId = null; // Lưu ID để rollback nếu lỗi

  try {
    // 1. Tạo Order
    const order = await createOrder(orderData, userId);
    createdOrderId = order.order_id; // Lưu lại ID ngay

    // 2. Tạo Order Items (Song song)
    const itemPromises = itemsData.map((item) =>
      createItemOrder(createdOrderId, item),
    );
    await Promise.all(itemPromises);

    // 3. Tạo Payment và Shipment song song (để nhanh hơn)
    // Lưu ý: Nếu logic của bạn bắt buộc Payment xong mới được Ship thì để await tuần tự như cũ.
    await Promise.all([
      createPaymentIntent(createdOrderId, payment),
      createShipment(createdOrderId, shipments),
    ]);

    // 4. QUAN TRỌNG: Chỉ xóa giỏ hàng khi TẤT CẢ các bước trên đã thành công
    await deleteCartItemByUserId(userId);

    return order;
  } catch (error) {
    console.error("Lỗi quy trình tạo đơn hàng:", error);

  
    if (createdOrderId) {
      console.log("Đang hoàn tác (xóa) đơn hàng lỗi:", createdOrderId);
      try {
        // Bạn cần viết hàm deleteOrderById để xóa order và items liên quan
        // await deleteOrderById(createdOrderId);
        // Hoặc cập nhật status thành 'FAILED' nếu không muốn xóa hẳn
      } catch (rollbackError) {
        console.error("Lỗi khi hoàn tác đơn hàng:", rollbackError);
      }
    }

    throw error; // Ném lỗi ra để UI hiển thị thông báo
  }
};
