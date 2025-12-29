import React, { useState, useEffect, useRef } from "react";
import StoreList from "./components/StoreList";
import AboutSection from "./components/AboutSection";
import EnvironmentSection from "./components/EnvironmentSection";
import CommitmentSection from "./components/CommitmentSection";
import SustainableFashionSection from "./components/SustainableFashionSection";

// 1. Mảng này dùng để tạo Menu và làm "chìa khóa" để tìm thẻ div bên dưới
const NAV_ITEMS = [
  { id: "about", label: "Giới thiệu" },
  { id: "store", label: "Cửa hàng" },
  { id: "factory", label: "Nhà máy" },
  { id: "environment", label: "Các sáng kiến môi trường" },
  { id: "commitment", label: "Cam kết giảm phát thải" },
  { id: "sustainable-fashion", label: "Thời trang bền vững" },
];

const About = () => {
  const [activeSection, setActiveSection] = useState("about");
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    // Tìm các thẻ div theo id trong NAV_ITEMS để theo dõi
    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.current.observe(element);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const handleScrollToProducts = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110; // Chỉnh số này nếu bị che
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 relative ">
      <div className="sticky top-[60px] z-40 bg-white border-gray-100 ">
        <div className="flex items-center gap-4 overflow-x-auto py-2 px-4 no-scrollbar md:justify-center ">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollToProducts(item.id)}
                className={`
                  whitespace-nowrap px-4 py-3 font-medium text-sm transition-all duration-300 outline-none
                  ${
                    isActive
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50">
        {/* 1. Giới thiệu */}
        <div id="about" className="w-full flex ">
          <AboutSection />
        </div>

        {/* 2. Cửa hàng */}
        <div id="store" className="w-full  flex flex-col  ">
          <div className="flex flex-col items-center mx-auto mt-5">
            <h2 className="text-3xl font-mono">Cửa hàng</h2>
            <p className="font-thin">Tất cả 9 cửa hàng của chúng tôi</p>
          </div>
          <div>
            <div className="">
              <StoreList />
            </div>
          </div>
        </div>

        {/* 3. Nhà máy */}

        {/* 4. Môi trường */}
        <div id="environment" className="w-full flex  ">
          <EnvironmentSection />
        </div>

        {/* 5. Cam kết */}
        <div id="commitment" className="w-full flex ">
          <CommitmentSection />
        </div>

        {/* 6. Thời trang bền vững */}
        <div id="sustainable-fashion" className="w-full  flex">
          <SustainableFashionSection />
        </div>
      </div>
    </div>
  );
};

export default About;
