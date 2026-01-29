import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/utils/formatMoney";
import { useEffect, useState } from "react";
import DialogDetailProduct from "./DialogDetailProduct";
import { deleteProductById } from "@/services/productService";
import { toast } from "sonner";

const statusStyle = {
  true: "!bg-green-100 !text-green-700 border border-green-300",
  false: "!bg-gray-100 !text-gray-600 border border-gray-300",
};

export default function ProductTable({ products, onManage }) {
  console.log("Product Table Products:", products);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleViewDetail = (product) => {
    console.log("View details for product:", product);

    setIsProductDetailOpen(product);
  };

  const handleDelete = async (productId) => {
    console.log("Delete product with ID:", productId);
    // Call the deleteProductById function from the productService
    try {
      await deleteProductById(productId);
      setProductList((prev) => prev.filter((p) => p.product_id !== productId));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message);
      toast.error("Xóa sản phẩm không thành công");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {productList.map((p) => (
          <TableRow key={p.product_id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>{p.categories.name}</TableCell>
            <TableCell>{formatMoney(p.base_price)}</TableCell>
            <TableCell>
              <Badge className={statusStyle[p.is_active]}>
                {p.is_active ? "Active" : "Disabled"}
              </Badge>
            </TableCell>
            <TableCell className="flex flex-row justify-center gap-2">
              {/* tuyền xuống bằng id rồi call lấy dữ liệu trong đây */}
              <Button size="sm" onClick={() => onManage(p.product_id)}>
                Các biến thể
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewDetail(p)}
              >
                Chi tiết
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(p.product_id)}
              >
                Xóa
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {isProductDetailOpen && (
        <DialogDetailProduct
          open={isProductDetailOpen}
          product={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(null)}
        />
      )}
    </Table>
  );
}
