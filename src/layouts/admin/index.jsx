import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./component/sidebar";
import { Suspense } from "react";
import Loading from "@/components/loading";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <main className="min-h-screen ">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
