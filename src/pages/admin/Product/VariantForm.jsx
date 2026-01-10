import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VariantForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    sku: "",
    size: "",
    color: "",
    price: "",
    stock: "",
  });

  const handleSubmit = () => {
    onSubmit({ id: Date.now().toString(), ...form });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <Card className="p-6 w-[400px] space-y-3">
        <h3 className="font-semibold">Add Variant</h3>

        <Input placeholder="SKU" onChange={e => setForm({ ...form, sku: e.target.value })} />
        <Input placeholder="Size" onChange={e => setForm({ ...form, size: e.target.value })} />
        <Input placeholder="Color" onChange={e => setForm({ ...form, color: e.target.value })} />
        <Input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} />
        <Input placeholder="Stock" type="number" onChange={e => setForm({ ...form, stock: e.target.value })} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </Card>
    </div>
  );
}
