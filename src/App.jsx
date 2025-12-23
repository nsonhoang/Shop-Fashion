import React, { Suspense } from "react"; // 1. Import Suspense
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../src/layouts/main/index.jsx";
import Loading from "./components/Loading";
import { AdminLayout } from "./layouts/admin/index.jsx";

// 2. Định nghĩa Lazy Import (Code splitting)
// Cách này hoạt động tốt với "export default"
const MenPage = React.lazy(() => import("./pages/main/MenPage/index.jsx"));
const WomenPage = React.lazy(() => import("./pages/main/WomenPage/index.jsx"));
const AboutPage = React.lazy(() => import("./pages/main/About/index.jsx"));
const StoryPage = React.lazy(() => import("./pages/main/Story/index.jsx"));
const ProductPage = React.lazy(() =>
  import("./pages/main/ProductPage/index.js")
);
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard/index.jsx"));
const ProductAdminPage = React.lazy(() =>
  import("./pages/admin/Product/index.jsx")
);
const CategoriesAdminPage = React.lazy(() =>
  import("./pages/admin/Categories/index.jsx")
);
const CustomersAdminPage = React.lazy(() =>
  import("./pages/admin/Customers/index.jsx")
);
const InventoryAdminPage = React.lazy(() =>
  import("./pages/admin/Inventory/index.jsx")
);
const AnalyticsAdminPage = React.lazy(() =>
  import("./pages/admin/Analytics/index.jsx")
);
const SettingsAdminPage = React.lazy(() =>
  import("./pages/admin/Settings/index.jsx")
);
const OrdersAdminPage = React.lazy(() =>
  import("./pages/admin/Orders/index.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    Suspense: <Loading />,
    element: <MainLayout />,
    // Lưu ý: Loading sẽ được xử lý bên trong MainLayout (xem Bước 2)
    children: [
      {
        index: true,
        element: <MenPage />, // Dùng element như bình thường
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
        path: "story",
        element: <StoryPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
    ],
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
