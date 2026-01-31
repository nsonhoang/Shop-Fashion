import { supabase } from "@/lib/supabase";

export const createShipment = async (orderId, shipmentData) => {
  try {
    const { data, error } = await supabase
      .from("shipments")
      .insert({ ...shipmentData, order_id: orderId })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi tạo vận chuyển:", error);
    throw error;
  }
};
