import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function MainLayout() {
  return (
    <div className="main-layout w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
