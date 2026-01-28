import { supabase } from "@/lib/supabase";

export const getCartsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select("*, cart_items(*, product_variants(*, products(*)))")
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export const addCartItemToCart = async (item, userId) => {
  try {
    const carts = await getCartsByUserId(userId);

    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: carts.cart_id,
        variant_id: item.variantId, // Lấy đúng ID biến thể
        quantity: item.quantity || 1, // Mặc định là 1 nếu không truyền
      })
      .eq("cart_id", carts.cart_id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
export const deleteCartItem = async (itemId, userId) => {
  try {
    const carts = await getCartsByUserId(userId);

    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId)
      .eq("cart_id", carts.cart_id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    throw error;
  }
};
export const deleteCartItemByUserId = async (userId) => {
  try {
    const carts = await getCartsByUserId(userId);

    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", carts.cart_id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};
