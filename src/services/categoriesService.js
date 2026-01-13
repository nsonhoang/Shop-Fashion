import { supabase } from "@/lib/supabase";

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories") // Tên bảng trong Database
    .select("*")
    .order("created_at", { ascending: false }); // Sắp xếp mới nhất lên đầu

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
};

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Tách dấu ra khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/[^\w-]+/g, "") // <-- SỬA LỖI Ở ĐÂY: Xóa dấu \ trước dấu -
    .replace(/--+/g, "-") // <-- SỬA LỖI Ở ĐÂY: Xóa dấu \ trước dấu -
    .replace(/^-+/, "") // Xóa dấu gạch ngang ở đầu
    .replace(/-+$/, ""); // Xóa dấu gạch ngang ở cuối
};

export const createCategory = async ({ name, parent_id = null }) => {
  try {
    // Tự động tạo slug nếu frontend không truyền vào
    const slug = generateSlug(name);

    const { data, error } = await supabase
      .from("categories") // Lưu ý: Tên bảng thường là chữ thường
      .insert([
        {
          name: name,
          slug: slug,
          parent_id: parent_id || null, // Nếu rỗng thì là null (Cấp 1)
        },
      ])
      .select() // Quan trọng: Để lấy lại dữ liệu vừa tạo (bao gồm ID)
      .single(); // Vì chỉ tạo 1 cái nên lấy single cho gọn

    if (error) throw error;

    return data; // Trả về object category vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error.message);
    throw error;
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", categoryId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error.message);
    throw error;
  }
};
