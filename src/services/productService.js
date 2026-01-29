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
export const getProducts = async (page = 1, limit = 10) => {
  try {
    // 1. Tính toán vị trí bắt đầu (from) và kết thúc (to)
    // Ví dụ: Trang 1 (0-9), Trang 2 (10-19)...
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("products")
      .select("*, categories(*)", { count: "exact" }) // Thêm option count: 'exact'
      .range(from, to) // Giới hạn dữ liệu trả về
      .order("created_at", { ascending: false }); // Sắp xếp mới nhất lên đầu

    if (error) throw error;

    // Trả về cả dữ liệu và tổng số lượng
    return { data, total: count };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    throw error;
  }
};

// laasy thoong tin cuar 3 banrg
export const getDetailProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*), product_variants(*, inventory(*))")
      .eq("product_id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
    throw error;
  }
};
const getReviewsByProductId = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, profiles(full_name, avatar_url)")
      .eq("product_id", productId)
      .order("created_at", { ascending: false }) // Sắp xếp mới nhất lên đầu
      .limit(5);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá sản phẩm:", error.message);
    throw error;
  }
};

export const getDetailProductAndReViewById = async (id) => {
  try {
    const product = await getDetailProductById(id);
    const reviews = await getReviewsByProductId(id);
    return { product, reviews };
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm và đánh giá:", error.message);
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
export const getVariants = async () => {
  try {
    const { data, error } = await supabase.from("product_variants").select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách biến thể sản phẩm:", error.message);
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

export const getListProductByParams = async (params) => {
  const { category, gender, search, page = 1, limit = 30 } = params;

  // Tính toán vị trí bắt đầu và kết thúc (Supabase tính index từ 0)
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from("products")
      // { count: "exact" } giúp lấy tổng số lượng sản phẩm thỏa mãn điều kiện
      .select(
        "*, categories!inner(*), product_images(*), product_variants(*)",
        { count: "exact" },
      );

    // --- CÁC BỘ LỌC GIỮ NGUYÊN ---
    if (category && category !== "all") {
      query = query.eq("categories.slug", category);
    }
    if (gender) {
      query = query.eq("gender", gender.toUpperCase());
    }
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    // --- PHÂN TRANG (MỚI THÊM) ---
    // Sắp xếp sản phẩm mới nhất lên đầu (tùy chọn)
    query = query.order("created_at", { ascending: false }).range(from, to);

    const { data, count, error } = await query;

    if (error) throw error;

    // Trả về cả danh sách data và tổng số lượng count
    return { data, count };
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    throw error;
  }
};
export const deleteProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("product_id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error.message);
    throw error;
  }
};
//cái này để lấy sản phẩm để làm cái carolSelf bên trang chủ
export const getProductsForCarousel = async (gender) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("gender", gender)
      .limit(10);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm nam cho carousel:", error.message);
    throw error;
  }
};
