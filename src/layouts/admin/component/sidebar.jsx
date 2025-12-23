import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Warehouse,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// Việt hóa các mục menu
const menuItems = [
  { title: "Tổng quan", url: "/admin", icon: LayoutDashboard },
  { title: "Sản phẩm", url: "/admin/products", icon: Package },
  { title: "Danh mục", url: "/admin/categories", icon: FolderTree },
  { title: "Đơn hàng", url: "/admin/orders", icon: ShoppingCart },
  { title: "Khách hàng", url: "/admin/customers", icon: Users },
  { title: "Kho hàng", url: "/admin/inventory", icon: Warehouse },
  { title: "Thống kê", url: "/admin/analytics", icon: BarChart3 },
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase cursor-pointer">
            EVERLANE
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Về trang bán hàng
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
