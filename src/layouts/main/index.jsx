import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { Suspense } from "react";
import Loading from "@/components/loading";

function MainLayout() {
  return (
    <div className="main-layout w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content  ">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
