import React, { Suspense } from "react"; // 1. Import Suspense
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../src/layouts/main/index.jsx";
import Loading from "./components/Loading";

// 2. Định nghĩa Lazy Import (Code splitting)
// Cách này hoạt động tốt với "export default"
const MenPage = React.lazy(() => import("./pages/MenPage"));
const WomenPage = React.lazy(() => import("./pages/WomenPage"));
const AboutPage = React.lazy(() => import("./pages/About"));
const StoryPage = React.lazy(() => import("./pages/Story"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));

const router = createBrowserRouter([
  {
    path: "/",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
