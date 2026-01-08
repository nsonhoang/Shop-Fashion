import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AddCategoryDialog = ({ open, onOpenChange, onSubmit }) => {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [productCount, setProductCount] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: crypto.randomUUID(),
      name,
      slug,
      description,
      productCount: 0,
    });

    // reset form
    setName("");
    setSlug("");
    setProductCount("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            placeholder="Slug (e.g. t-shirts)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />

          <Input
            placeholder="Product Count"
            type="number"
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
