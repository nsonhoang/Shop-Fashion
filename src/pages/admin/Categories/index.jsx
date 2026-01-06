import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddCategoryDialog  from "@/components/ui/AddCategoryDialog";

const mockCategories = [
  { id: "1", name: "T-Shirts", slug: "t-shirts", productCount: 45, description: "Casual and formal t-shirts" },
  { id: "2", name: "Jeans", slug: "jeans", productCount: 32, description: "Denim jeans collection" },
  { id: "3", name: "Outerwear", slug: "outerwear", productCount: 28, description: "Jackets, coats, and more" },
  { id: "4", name: "Shoes", slug: "shoes", productCount: 56, description: "Footwear for all occasions" },
  { id: "5", name: "Sweaters", slug: "sweaters", productCount: 19, description: "Warm and cozy sweaters" },
  { id: "6", name: "Hoodies", slug: "hoodies", productCount: 24, description: "Comfortable hooded sweatshirts" },
  { id: "7", name: "Accessories", slug: "accessories", productCount: 67, description: "Belts, bags, and more" },
];



const CategoriesAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(mockCategories);
  const [openAdd, setOpenAdd] = useState(false);

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

   return (
    <div>
      <AdminHeader title="Categories" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell>{category.productCount}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{category.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <AddCategoryDialog
            open={openAdd}
            onOpenChange={setOpenAdd}
            onSubmit={handleAddCategory}
      />
    </div>
  );
};

export default CategoriesAdminPage;
