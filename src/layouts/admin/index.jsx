import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./component/sidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
