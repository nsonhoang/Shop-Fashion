import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { useState } from "react";
import DialogAddImage from "./DialogAddImage";
import { supabase } from "@/lib/supabase";
import {
  createImageProduct,
  deleteImageProductById,
} from "@/services/productService";

export default function ImageGrid({ productId, images }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [ListImages, setListImages] = useState(images || []);

  const deleteImage = async (id) => {
    console.log("Xóa ảnh với ID:", id);
    try {
      await deleteImageProductById(id);
      setListImages(ListImages.filter((img) => img.image_id !== id));
    } catch (error) {
      alert("Lỗi xóa ảnh. Vui lòng thử lại.");
      console.error("Lỗi xóa ảnh:", error);
    }
  };
  const handleAddImage = async (formData) => {
    // formData bây giờ có: { mode, file, image_url, display_order, is_thumbnail }
    console.log("Thêm ảnh với dữ liệu:", formData);
    try {
      let finalImageUrl = "";

      // TRƯỜNG HỢP 1: Người dùng chọn Upload File
      if (formData.mode === "upload" && formData.file) {
        const fileExt = formData.file.name.split(".").pop();
        const fileName = `${productId}/${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, formData.file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("images").getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }
      // TRƯỜNG HỢP 2: Người dùng nhập Link trực tiếp
      else if (formData.mode === "url" && formData.image_url) {
        finalImageUrl = formData.image_url;
      }

      // Sau khi có link (dù từ nguồn nào), lưu vào DB
      const newImageRecord = {
        product_id: productId,
        image_url: finalImageUrl, // Lưu URL cuối cùng
        color: formData.color,
        // display_order: formData.display_order,
        is_thumbnail: formData.is_thumbnail,
      };

      // Gọi API Insert vào DB...
      const newData = await createImageProduct(newImageRecord);

      // Update UI
      setListImages((prev) => [...prev, newData]);
    } catch (error) {
      alert("Lỗi thêm ảnh. Vui lòng thử lại.");
      console.error("Lỗi thêm ảnh:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Images</h3>

        <Button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 cursor-pointer text-sm "
        >
          {/* này phải là nút dialog hiện form nhìn ảnh */}
          <Upload className="w-4 h-4" />
          Upload Image
        </Button>
      </div>
      {/* Component Dialog */}
      <DialogAddImage
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSubmit={handleAddImage}
      />
      <div className="space-y-3">
        {" "}
        {/* Container: Dếp xếp dọc (Stack) thay vì Grid */}
        {ListImages?.map((img, index) => (
          <div
            key={img.product_image_id || index}
            // Flex row để ảnh và thông tin nằm ngang
            className={`group flex items-start gap-4 p-3 border rounded-lg bg-white shadow-sm transition-all hover:shadow-md ${
              img.is_thumbnail
                ? "border-primary/50 bg-primary/5"
                : "border-slate-200"
            }`}
          >
            {/* 1. KHU VỰC ẢNH (BÊN TRÁI) */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-slate-50">
              <img
                src={img.image_url}
                alt={`Product Image ${index + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/150?text=Error";
                }}
              />
            </div>

            {/* 2. KHU VỰC THÔNG TIN (BÊN PHẢI) */}
            <div className="flex flex-1 flex-col justify-between h-24 py-1">
              {/* Dòng 1: Các nhãn trạng thái */}
              <div className="space-y-1">
                {img.is_thumbnail && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground w-fit shadow-sm">
                    Ảnh đại diện (Thumbnail)
                  </div>
                )}

                <div className="text-sm text-slate-600 font-medium flex items-center gap-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 border text-xs">
                    Thứ tự: #{img.display_order || 0}
                  </span>
                </div>
              </div>

              {/* Dòng 2: Link ảnh (Optional - hiển thị rút gọn nếu cần) */}
              <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                {img.image_url}
              </p>
            </div>

            {/* 3. NÚT HÀNH ĐỘNG (GÓC PHẢI) */}
            <div className="h-full flex items-center pr-2">
              <button
                onClick={() => deleteImage(img.image_id)}
                className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Xóa ảnh"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
