import { useEffect, useState } from "react";
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminHeader } from "@/layouts/admin/component/header";
import AddCategoryDialog from "@/pages/admin/Categories/components/AddCategoryDialog";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/services/categoriesService";
import CustomAlert from "@/components/CustomAlert";

const CategoriesAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Thêm state để quản lý thông báo (Alert)
  const [alertState, setAlertState] = useState(null); // { type, title, message }

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const data = await getCategories();
        // Đảm bảo data là mảng trước khi set
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        setAlertState({
          type: "error",
          title: "Lỗi tải dữ liệu",
          message: "Không thể lấy danh sách danh mục. Vui lòng thử lại.",
        });
        console.error(error);
      } finally {
        setLoading(false); // Kết thúc loading dù thành công hay thất bại
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = async (newCategory) => {
    try {
      // Gọi API tạo danh mục
      const data = await createCategory(newCategory);

      // Cập nhật danh sách ngay lập tức
      setCategories((prev) => [data, ...prev]);

      // 2. Hiển thị thông báo thành công qua State
      setAlertState({
        type: "success",
        title: "Thành công!",
        message: `Đã thêm danh mục "${data.name}" vào hệ thống.`,
      });

      // Tự động tắt thông báo sau 3 giây (nếu muốn)
    } catch (error) {
      // Hiển thị thông báo lỗi
      setAlertState({
        type: "error",
        title: "Thất bại",
        message: "Có lỗi xảy ra khi tạo danh mục. Vui lòng thử lại.",
      });
      console.error("Lỗi tạo danh mục:", error);
    } finally {
      setTimeout(() => setAlertState(null), 3000);
    }
  };
  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prev) =>
        prev.filter((cat) => cat.category_id !== categoryId)
      );
      setAlertState({
        type: "success",
        title: "Thành công!",
        message: "Đã xóa danh mục thành công.",
      });
    } catch (error) {
      setAlertState({
        type: "error",
        title: "Thất bại",
        message: "Có lỗi xảy ra khi xóa danh mục. Vui lòng thử lại.",
      });
      console.error("Lỗi xóa danh mục:", error);
    }
  };

  return (
    <div>
      <AdminHeader title="Quản lý Danh mục" />
      <div className="p-6 space-y-6">
        {/* hiển thị dialog */}
        {alertState && (
          <CustomAlert
            type={alertState.type}
            title={alertState.title}
            onClose={() => setAlertState(null)}
          >
            {alertState.message}
          </CustomAlert>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setOpenAdd(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm danh mục
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="w-[70px]">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* 4. Xử lý trạng thái Loading */}
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang tải dữ liệu...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCategories.length === 0 ? (
                  /* 5. Xử lý khi không có dữ liệu */
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Không tìm thấy danh mục nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    // Lưu ý: Đảm bảo dùng đúng ID từ database (category_id hoặc id)
                    <TableRow key={category.category_id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.slug}
                      </TableCell>
                      <TableCell>
                        {category.productCount || "không có"}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {category.description || "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => console.log("Edit", category)}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(category.category_id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
