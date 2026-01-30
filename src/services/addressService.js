import { supabase } from "@/lib/supabase";

export const getFullAddress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};
export const updateAddress = async (addressId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .update(updatedData)
      .eq("address_id", addressId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const createAddress = async (newData) => {
  try {
    const { data, error } = await supabase.from("addresses").insert(newData);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};
export const deleteAddress = async (addressId) => {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .delete()
      .eq("address_id", addressId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
