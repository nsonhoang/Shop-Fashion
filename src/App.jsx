import React, { Suspense } from "react"; // 1. Import Suspense
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../src/layouts/main/index.jsx";
import Loading from "./components/Loading";
import { AdminLayout } from "./layouts/admin/index.jsx";
import { List } from "lucide-react";
import ListProductPage from "./pages/main/ProductPage/components/listproduct.jsx";

// 2. Định nghĩa Lazy Import (Code splitting)
// Cách này hoạt động tốt với "export default"
const MenPage = React.lazy(() => import("@/pages/main/MenPage/index.jsx"));
const WomenPage = React.lazy(() => import("@/pages/main/WomenPage/index.jsx"));
const AboutPage = React.lazy(() => import("@/pages/main/About/index.jsx"));
const StoryPage = React.lazy(() => import("@/pages/main/Story/index.jsx"));
const ProductPage = React.lazy(() =>
  import("@/pages/main/ProductPage/index.jsx")
);
const OrderHistory = React.lazy(() =>
  import("@/pages/main/OrderHistory/index.jsx")
);
const ProfilePage = React.lazy(() =>
  import("@/pages/main/ProfilePage/index.jsx")
);
const ErrorPage = React.lazy(() => import("@/pages/main/Error/index.jsx"));
const Dashboard = React.lazy(() => import("@/pages/admin/Dashboard/index.jsx"));
const ProductAdminPage = React.lazy(() =>
  import("@/pages/admin/Product/index.jsx")
);
const CategoriesAdminPage = React.lazy(() =>
  import("@/pages/admin/Categories/index.jsx")
);
const CustomersAdminPage = React.lazy(() =>
  import("@/pages/admin/Customers/index.jsx")
);
const InventoryAdminPage = React.lazy(() =>
  import("@/pages/admin/Inventory/index.jsx")
);
const AnalyticsAdminPage = React.lazy(() =>
  import("@/pages/admin/Analytics/index.jsx")
);
const SettingsAdminPage = React.lazy(() =>
  import("@/pages/admin/Settings/index.jsx")
);
const OrdersAdminPage = React.lazy(() =>
  import("@/pages/admin/Orders/index.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // Suspense: <Loading />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MenPage />,
      },
      {
        path: "women",
        element: <WomenPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "story",
        element: <StoryPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "listproduct",
        element: <ListProductPage />,
      },
    ],
    // --- KẾT THÚC: Route trung gian ---
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    Suspense: <Loading />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductAdminPage />,
      },
      {
        path: "categories",
        element: <CategoriesAdminPage />,
      },
      {
        path: "customers",
        element: <CustomersAdminPage />,
      },

      {
        path: "inventory",
        element: <InventoryAdminPage />,
      },
      {
        path: "orders",
        element: <OrdersAdminPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsAdminPage />,
      },
      {
        path: "settings",
        element: <SettingsAdminPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
