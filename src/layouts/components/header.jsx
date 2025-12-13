import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleOnSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <header className=" top-0 z-50 w-full border-b border-gray-300 bg-white ">
      <div className="mx-auto flex h-16 items-center px-4 w-full relative">
        {/* --- LEFT GROUP: Chiếm 1 phần (flex-1) và căn trái --- */}
        <div className="flex-1 flex justify-start">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <NavLink
              to="/women"
              className={({ isActive }) =>
                `relative group transition-colors duration-300 ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Women
                  {/* Xử lý Gạch chân: */}
                  {/* Nếu isActive = true -> w-full (hiện luôn) */}
                  {/* Nếu isActive = false -> w-0 (ẩn), hover mới hiện (group-hover:w-full) */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative group transition-colors duration-300 ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Man
                  {/* Xử lý Gạch chân: */}
                  {/* Nếu isActive = true -> w-full (hiện luôn) */}
                  {/* Nếu isActive = false -> w-0 (ẩn), hover mới hiện (group-hover:w-full) */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative group transition-colors duration-300 ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {/* Xử lý Gạch chân: */}
                  {/* Nếu isActive = true -> w-full (hiện luôn) */}
                  {/* Nếu isActive = false -> w-0 (ẩn), hover mới hiện (group-hover:w-full) */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/story"
              className={({ isActive }) =>
                `relative group transition-colors duration-300 ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Story
                  {/* Xử lý Gạch chân: */}
                  {/* Nếu isActive = true -> w-full (hiện luôn) */}
                  {/* Nếu isActive = false -> w-0 (ẩn), hover mới hiện (group-hover:w-full) */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </nav>

          {/* Nút Mobile Hamburger */}
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase cursor-pointer">
            EVERLANE
          </h1>
        </div>
        {user ? (
          <div className="flex-1 flex justify-end items-center gap-4 text-gray-700">
            <button
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              onClick={handleOnSearchClick}
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 flex justify-end items-center ">
            <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Log In
            </button>
          </div>
        )}
        <div
          className={`
    absolute left-0 w-full bg-white shadow-md px-4 flex items-center h-20 z-40
    top-full 
    transition-all duration-300 ease-in-out origin-top
    ${
      isSearchOpen
        ? "opacity-100 translate-y-0 visible" // Khi mở: Hiện rõ, nằm đúng vị trí
        : "opacity-0 -translate-y-5 invisible" // Khi đóng: Mờ đi, thụt lên trên 1 chút, tàng hình
    }
  `}
        >
          <div className="container mx-auto max-w-4xl flex items-center gap-4">
            {/* ICON SEARCH NHỎ BÊN TRÁI (Trang trí) */}
            <Search className="h-5 w-5 text-gray-400" />

            {/* INPUT FIELD - Giống hình ảnh 1 */}
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-gray-100 rounded-md px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:bg-gray-50 transition-colors"
            />

            {/* NÚT CANCEL / CLOSE */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
