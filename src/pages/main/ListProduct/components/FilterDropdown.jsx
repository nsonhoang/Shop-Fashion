import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getCategories } from "@/services/categoriesService";

// Định nghĩa label và màu sắc ngay tại đây hoặc trong file constants
const CATEGORY_LABELS = {
  all: "Tất cả",
  shirt: "Áo",
  pants: "Quần",
  jacket: "Áo khoác",
  sweater: "Sweater",
};

const CATEGORY_COLORS = {
  all: "bg-gray-300",
  shirt: "bg-black",
  pants: "bg-gray-400",
  jacket: "bg-blue-700",
  sweater: "bg-amber-700",
};

export default function FilterDropdown({ currentCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-end mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Chọn loại sản phẩm"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border hover:shadow-sm transition text-sm"
          >
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                CATEGORY_COLORS[currentCategory] || "bg-gray-300"
              }`}
            />
            <span className="font-medium text-sm">
              {CATEGORY_LABELS[currentCategory] || "Tất cả"}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="min-w-[12rem]"
        >
          <DropdownMenuRadioGroup
            value={currentCategory}
            onValueChange={onCategoryChange}
          >
            <DropdownMenuRadioItem value="all">Tất cả</DropdownMenuRadioItem>
            {categories.map((category) => (
              <DropdownMenuRadioItem
                key={category.category_id}
                value={category.slug}
              >
                {category.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
