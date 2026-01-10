import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusStyle = {
  true: "!bg-green-100 !text-green-700 border border-green-300",
  false: "!bg-gray-100 !text-gray-600 border border-gray-300",
};

export default function ProductTable({ products, onManage }) {
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
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>{p.category}</TableCell>
            <TableCell>${p.base_price}</TableCell>
            <TableCell>
              <Badge className={statusStyle[p.is_active]}>{p.is_active ? "Active" : "Disabled"}</Badge>
            </TableCell>
            <TableCell className="text-center">
              <Button size="sm" onClick={() => onManage(p)}>
                Manage
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
