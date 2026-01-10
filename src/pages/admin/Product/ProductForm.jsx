import { useState } from "react";
import { categories } from "./mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ProductForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    base_price: "",
    category: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.base_price || !form.category) return;

    onSubmit({
      id: Date.now().toString(),
      ...form,
      is_active: true,
      variants: [],
      images: [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <Card className="p-6 w-[500px] space-y-4">
        <h2 className="text-xl font-semibold">Add Product</h2>

        <Input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <Input type="number" placeholder="Base Price" onChange={e => setForm({ ...form, base_price: e.target.value })} />

        <select
          className="border rounded-md p-2"
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </Card>
    </div>
  );
}
