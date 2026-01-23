import { supabase } from "@/lib/supabase";

const createInventory = async (data) => {
  // Gọi API tạo mới inventory
  try {
    const { data: inventory, error } = await supabase
      .from("inventory")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return inventory;
  } catch (error) {
    console.error("Lỗi khi tạo mới inventory:", error.message);
    throw error;
  }
};
const getInventories = async () => {
  try {
    const { data: inventories, error } = await supabase
      .from("inventory")
      .select("*, product_variants(*, products(*))");

    if (error) throw error;
    return inventories;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách inventory:", error.message);
    throw error;
  }
};

const updateInventoryById = async (id, data) => {
  try {
    const { data: inventory, error } = await supabase
      .from("inventory")
      .update(data)
      .eq("inventory_id", id)
      .select()
      .single();

    if (error) throw error;
    return inventory;
  } catch (error) {
    console.error("Lỗi khi cập nhật inventory:", error.message);
    throw error;
  }
};

export { createInventory, getInventories, updateInventoryById };
