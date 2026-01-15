import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import VariantForm from "./VariantForm";
import { formatMoney } from "@/utils/formatMoney";
import { LoadingOverlay } from "@/components/loading";
import {
  createVariant,
  deleteVariantById,
  updateVariantById,
} from "@/services/productService";

export default function VariantTable({ productId, variants }) {
  const [openCreate, setOpenCreate] = useState(false); //cái này hiện dialog thêm biến thể
  const [openEdit, setOpenEdit] = useState(null); //cái này hiện dialog sửa biến thể chat chỉ cho null
  const [loading, setLoading] = useState(false);
  const [variantList, setVariantList] = useState(variants || []);

  const addVariant = async (variant) => {
    try {
      setLoading(true);
      const newVariant = { ...variant, product_id: productId };
      console.log("Add variant", newVariant);
      const result = await createVariant(newVariant);
      setVariantList([...variantList, result]);
      alert("Thêm biến thể thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm biến thể:", error.message);
      alert("Lỗi khi thêm biến thể. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setOpenCreate(false);
    }
    // console.log("Add variant", variant, isEdit);
  };

  const handleUpdate = async (variant) => {
    try {
      setLoading(true);
      const updateResult = await updateVariantById(variant.variant_id, variant);
      setVariantList(
        variantList.map((v) =>
          v.variant_id === variant.variant_id ? updateResult : v
        )
      );
      alert("Cập nhật biến thể thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật biến thể:", error.message);
      alert("Lỗi khi cập nhật biến thể. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setOpenEdit(null);
    }
  };

  const handleDeleteVariant = async (variantId) => {
    try {
      setLoading(true);
      await deleteVariantById(variantId);
      setVariantList(variantList.filter((v) => v.variant_id !== variantId));
      alert("Xóa biến thể thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa biến thể:", error.message);
      alert("Lỗi khi xóa biến thể. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      {loading && <LoadingOverlay />}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Variants</h3>
        <Button size="sm" onClick={() => setOpenCreate(true)}>
          + Add Variant
        </Button>
      </div>

      <table className="w-full text-center border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2">SKU</th>
            <th className="p-2">Size</th>
            <th className="p-2">Color</th>
            <th className="p-2">Price</th>

            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {variantList.map((v) => (
            <tr key={v.variant_id} className="border-t">
              <td className="p-2">{v.sku}</td>
              <td className="p-2">{v.size}</td>
              <td className="p-2">{v.color}</td>
              <td className="p-2">{formatMoney(v.price_adjustment)}</td>
              <td className="p-2 text-center">
                <Button
                  className="bg-transparent text-blue-500 hover:underline hover:bg-transparent"
                  onClick={() => setOpenEdit(v.variant_id)}
                >
                  <Edit className="w-4 h-4 " />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteVariant(v.variant_id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openCreate && (
        <VariantForm
          onClose={() => setOpenCreate(false)}
          onSubmit={addVariant}
        />
      )}
      {openEdit && (
        <VariantForm
          onClose={() => setOpenEdit(false)}
          onSubmit={handleUpdate}
          editVariant={variantList.find((v) => v.variant_id === openEdit)}
        />
      )}
    </div>
  );
}
