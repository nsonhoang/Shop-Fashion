import { Outlet } from "react-router-dom";
import Header from "../components/header";

function MainLayout() {
  return (
    <div className="main-layout w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content h-[10000px]">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
