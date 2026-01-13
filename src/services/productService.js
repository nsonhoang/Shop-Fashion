import { supabase } from "@/lib/supabase";

export const createProduct = async (newProduct) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error.message);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    throw error;
  }
};

export const getDetailProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*), product_variants(*)")
      .eq("product_id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
    throw error;
  }
};
