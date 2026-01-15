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

export const createImageProduct = async (dataImage) => {
  try {
    const { data, error } = await supabase
      .from("product_images")
      .insert(dataImage)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi tạo ảnh sản phẩm:", error.message);
    throw error;
  }
};

export const deleteImageProductById = async (id) => {
  try {
    // BƯỚC 1: Xóa dữ liệu trong bảng database trước
    // Dùng .select() để lấy lại thông tin dòng vừa xóa (quan trọng là lấy image_url)
    const { data, error } = await supabase
      .from("product_images")
      .delete()
      .eq("image_id", id) // Nhớ dùng đúng tên cột id của bạn (image_id hoặc id)
      .select()
      .single();

    if (error) throw error;

    // BƯỚC 2: Xóa file vật lý trong Storage (nếu có)
    if (data && data.image_url) {
      const bucketName = "images"; // Tên bucket của bạn

      // Logic: Tách đường dẫn file ra khỏi URL đầy đủ
      // URL mẫu: https://.../storage/v1/object/public/images/product-images/1700.png
      // Cần lấy: product-images/1700.png
      const parts = data.image_url.split(`/${bucketName}/`);

      // Kiểm tra: Chỉ xóa nếu đúng là ảnh nằm trong bucket của mình
      // (Tránh trường hợp user nhập link ảnh từ web khác như Google, Imgur...)
      if (parts.length === 2) {
        const imagePath = parts[1]; // Lấy phần đuôi sau tên bucket

        const { error: storageError } = await supabase.storage
          .from(bucketName)
          .remove([imagePath]);

        if (storageError) {
          console.error("Lỗi xóa file trong Storage:", storageError.message);
          // Lưu ý: Không throw error ở đây để tránh làm crash UI,
          // vì dù sao record trong DB cũng đã xóa rồi.
        }
      }
    }

    return data;
  } catch (error) {
    console.error("Lỗi quy trình xóa ảnh:", error.message);
    throw error;
  }
};

export const createVariant = async (variant) => {
  try {
    const { data, error } = await supabase
      .from("product_variants")
      .insert(variant)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm biến thể sản phẩm:", error.message);
    throw error;
  }
};

export const updateVariantById = async (id, updatedVariant) => {
  try {
    const { data, error } = await supabase
      .from("product_variants")
      .update(updatedVariant)
      .eq("variant_id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật biến thể sản phẩm:", error.message);
    throw error;
  }
};

export const deleteVariantById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("product_variants")
      .delete()
      .eq("variant_id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa biến thể sản phẩm:", error.message);
    throw error;
  }
};
