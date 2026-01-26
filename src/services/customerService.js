import { supabase } from "@/lib/supabase";

export const getCustomers = async () => {
  try {
    const { data: customers, error } = await supabase
      .from("profiles")
      // 1. Bỏ .eq() để lấy cả khách hàng chưa có địa chỉ
      .select("*, addresses(*), user_roles(*), orders(total_amount, status)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedCustomers = customers.map((user) => {
      const totalSpent = (user.orders || []).reduce((sum, order) => {
        // Chỉ cộng đơn thành công
        if (order.status !== "cancelled" && order.status !== "refunded") {
          return sum + (order.total_amount || 0);
        }
        return sum;
      }, 0);

      // Tìm trong mảng addresses xem cái nào là default
      const defaultAddr = (user.addresses || []).find(
        (addr) => addr.is_default,
      );
      // Nếu không có default thì lấy cái đầu tiên, hoặc null
      const finalAddress = defaultAddr || user.addresses?.[0] || null;

      // --- LOGIC 3: TRẢ VỀ OBJECT GỌN GÀNG ---
      return {
        ...user,
        total_spent: totalSpent, // Frontend dùng: user.total_spent
        address: finalAddress, // Frontend dùng: user.address.street (không cần array[0])
        orders_count: user.orders?.length || 0, // Tiện thể đếm số đơn

        // Xóa bớt dữ liệu thừa cho nhẹ
        addresses: undefined,
        orders: undefined,
      };
    });

    return formattedCustomers;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error.message);
    throw error;
  }
};

export const updateRoleById = async (userId, newRole) => {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .update({ role_id: newRole })
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật vai trò người dùng:", error.message);
    throw error;
  }
};
export const getUserById = async (userId) => {
  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return user;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error.message);
    throw error;
  }
};
export const updateUserById = async (userId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedData)
      .eq("id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error.message);
    throw error;
  }
};
