import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "./mockData";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">

      {/* Search */}
      <Input
        placeholder="Search product..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
        className="w-[220px] flex-shrink-0"
      />

      {/* Category */}
      <Select
        value={filters.category || "all"}
        onValueChange={(v) =>
          setFilters({ ...filters, category: v === "all" ? "" : v })
        }
      >
        <SelectTrigger className="w-[180px] flex-shrink-0">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={filters.status || "all"}
        onValueChange={(v) =>
          setFilters({ ...filters, status: v === "all" ? "" : v })
        }
      >
        <SelectTrigger className="w-[150px] flex-shrink-0">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={filters.sort || "default"}
        onValueChange={(v) =>
          setFilters({ ...filters, sort: v === "default" ? "" : v })
        }
      >
        <SelectTrigger className="w-[180px] flex-shrink-0">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="az">Name A → Z</SelectItem>
          <SelectItem value="za">Name Z → A</SelectItem>
          <SelectItem value="price-asc">Price Low → High</SelectItem>
          <SelectItem value="price-desc">Price High → Low</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
