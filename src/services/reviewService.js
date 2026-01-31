import { supabase } from "@/lib/supabase";

export const getReviewsByProductId = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, profiles(full_name, avatar_url)")
      .eq("product_id", productId)
      .order("created_at", { ascending: false }); // Sắp xếp mới nhất lên đầu
    //   .limit(5);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá sản phẩm:", error.message);
    throw error;
  }
};

export const createProductReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert(reviewData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi tạo đánh giá sản phẩm:", error.message);
    throw error;
  }
};
