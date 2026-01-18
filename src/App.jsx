import React, { Suspense } from "react"; // 1. Import Suspense
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../src/layouts/main/index.jsx";
import Loading from "./components/Loading";
import { AdminLayout } from "./layouts/admin/index.jsx";
import { List } from "lucide-react";
import ListProductPage from "./pages/main/ListProduct/listProduct.jsx";
import { adminLoader } from "./utils/authLoader.js";

// 2. Định nghĩa Lazy Import (Code splitting)

const MenPage = React.lazy(() => import("@/pages/main/MenPage"));
const WomenPage = React.lazy(() => import("@/pages/main/WomenPage"));
const AboutPage = React.lazy(() => import("@/pages/main/About"));
const StoryPage = React.lazy(() => import("@/pages/main/Story"));
const ProductPage = React.lazy(() => import("@/pages/main/ProductPage"));
const OrderHistory = React.lazy(() => import("@/pages/main/OrderHistory"));
const ProfilePage = React.lazy(() => import("@/pages/main/ProfilePage"));
const RegisterSuccessPage = React.lazy(() =>
  import("@/pages/main/RegisterSuccessPage")
);

const EmailConfirmationPage = React.lazy(() =>
  import("@/pages/main/EmailConfirmationPage")
);
const ErrorPage = React.lazy(() => import("@/pages/main/Error"));
const Dashboard = React.lazy(() => import("@/pages/admin/Dashboard"));
const ProductAdminPage = React.lazy(() =>
  import("@/pages/admin/Product/AdminProducts.jsx")
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
        path: "products",
        element: <ListProductPage />,
      },
      {
        path: "register-success",
        element: <RegisterSuccessPage />,
      },
      {
        path: "email-confirmation",
        element: <EmailConfirmationPage />,
      },
    ],
    // --- KẾT THÚC: Route trung gian ---
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    // Suspense: <Loading />,
    errorElement: <ErrorPage />,
    loader: adminLoader,
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
