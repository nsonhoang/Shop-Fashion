import { AdminHeader } from "@/layouts/admin/component/header";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { mockProducts } from "./mockData";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";
import FilterBar from "./FilterBar";

export default function AdminProducts() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sort: "",
  });

  // =========================
  // CRUD HANDLERS
  // =========================

  const handleCreate = (product) => {
    setProducts(prev => [...prev, product]);
    setOpenForm(false);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }

  // =========================
  // FILTER LOGIC
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (filters.search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Status
    if (filters.status === "active") {
      result = result.filter(p => p.is_active);
    }

    if (filters.status === "inactive") {
      result = result.filter(p => !p.is_active);
    }

    // Sort
    if (filters.sort === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filters.sort === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filters.sort === "price-asc") {
      result.sort((a, b) => a.base_price - b.base_price);
    }

    if (filters.sort === "price-desc") {
      result.sort((a, b) => b.base_price - a.base_price);
    }

    return result;
  }, [products, filters]);

  // =========================
  // PRODUCT DETAIL PAGE
  // =========================

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onUpdate={handleUpdate}
      />
    );
  }

  // =========================
  // MAIN PAGE
  // =========================

  return (
  <>
    <AdminHeader title="Product Management" />

    <div className="p-6 space-y-6">

      {/* Header + Filter + Add button */}
      <div className="flex justify-between items-center">
        <FilterBar filters={filters} setFilters={setFilters} />

        <Button onClick={() => setOpenForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <Card>
        <CardContent className="p-0">
          <ProductTable
            products={filteredProducts}
            onManage={setSelectedProduct}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Create Form */}
      {openForm && (
        <ProductForm
          onClose={() => setOpenForm(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  </>
);

}
