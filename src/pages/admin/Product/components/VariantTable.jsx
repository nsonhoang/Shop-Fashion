import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import VariantForm from "./VariantForm";
import { formatMoney } from "@/utils/formatMoney";

export default function VariantTable({ variants, onChange }) {
  const [open, setOpen] = useState(false);

  const addVariant = (variant) => {
    onChange([...variants, variant]);
    setOpen(false);
  };

  const deleteVariant = (id) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Variants</h3>
        <Button size="sm" onClick={() => setOpen(true)}>
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
            <th className="p-2">Stock</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.sku}</td>
              <td className="p-2">{v.size}</td>
              <td className="p-2">{v.color}</td>
              <td className="p-2">{formatMoney(v.price)}</td>
              <td className="p-2">{v.stock}</td>
              <td className="p-2 text-center">
                <Button
                  className="bg-transparent text-blue-500 hover:underline hover:bg-transparent"
                  onClick={() => console.log("Edit variant", v)}
                >
                  <Edit className="w-4 h-4 " />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteVariant(v.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <VariantForm onClose={() => setOpen(false)} onSubmit={addVariant} />
      )}
    </div>
  );
}
