import { useState } from "react";
import { Button } from "@/components/ui/button";
import VariantTable from "./VariantTable";
import ImageGrid from "./ImageGrid";

export default function ProductDetail({ product, onBack, onUpdate }) {
  const [data, setData] = useState(product);

  const updateVariants = (variants) => {
    const updated = { ...data, variants };
    setData(updated);
    onUpdate(updated);
  };

  const updateImages = (images) => {
    const updated = { ...data, images };
    setData(updated);
    onUpdate(updated);
  };

  return (
    <div className="p-6 space-y-6">
      <Button variant="ghost" onClick={onBack}
      className="text-lg px-6 py-3 bg-slate-900 text-white hover:bg-slate-400 rounded-xl shadow"
      >
        ← Back
        </Button>

      <h1 className="text-2xl font-bold">{data.name}</h1>

      <div className="grid grid-cols-2 gap-6">
        <VariantTable variants={data.variants} onChange={updateVariants} />
        <ImageGrid images={data.images} onChange={updateImages} />
      </div>
    </div>
  );
}
