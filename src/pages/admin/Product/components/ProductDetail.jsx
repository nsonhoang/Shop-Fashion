import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import VariantTable from "./VariantTable";
import ImageGrid from "./ImageGrid";
import { getDetailProductById } from "@/services/productService";
import { Loader2 } from "lucide-react";

export default function ProductDetail({ productId, onBack }) {
  //truyền id xuống để lấy dữ liệu bằng api lu
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); //vào là loading
  console.log("Product Detail Data:", data);
  useEffect(() => {
    const fetchProductDetail = async () => {
      console.log("Product ID in Detail:", productId);
      try {
        const productDetail = await getDetailProductById(productId);
        setData(productDetail);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  // const updateVariants = (variants) => {
  //   const updated = { ...data, variants };
  //   setData(updated);
  //   onUpdate(updated);
  // };

  // const updateImages = (images) => {
  //   const updated = { ...data, images };
  //   setData(updated);
  //   onUpdate(updated);
  // };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-lg px-6 py-3 bg-slate-900 text-white hover:bg-slate-400 rounded-xl shadow"
      >
        ← Back
      </Button>

      <h1 className="text-2xl font-bold">{}</h1>

      <div className="grid grid-cols-2 gap-6">
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang tải dữ liệu...
          </div>
        ) : (
          <>
            <VariantTable
              productId={productId}
              variants={data.product_variants}
              // onChange={updateVariants}
            />
            <ImageGrid
              productId={productId}
              images={data.product_images}
              // onChange={updateImages}
            />
          </>
        )}
      </div>
    </div>
  );
}
