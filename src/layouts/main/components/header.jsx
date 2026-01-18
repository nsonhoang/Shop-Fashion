import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  User,
  LogOut,
  History,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import CartSheet from "@/components/CartSheet";
import DialogLogin from "@/components/DialogLogin";
import { useAuth } from "@/contexts/AuthContext";

// Component Link (Dùng chung cho cả Desktop và Mobile)
const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `relative group transition-colors duration-300 block py-2 md:py-0 text-lg md:text-sm ${
        isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {label}
        {/* Chỉ hiện gạch chân trên Desktop */}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ease-out hidden md:block ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        ></span>
      </>
    )}
  </NavLink>
);

function Header() {
  const { user, signOut, role } = useAuth(); // cái này để gắn tạp khi user sẽ đc lấy ở context kiểm tra

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  // State mới cho Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Đóng menu khi chuyển trang

  // Khóa cuộn trang khi mở menu mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleDropMenuToggle = () => {
    setIsDropMenuOpen(!isDropMenuOpen);
  };

  const navLinks = [
    { to: "/women", label: "Women" },
    { to: "/", label: "Man" },
    { to: "/about", label: "About" },
    { to: "/story", label: "Story" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white">
        <div className="mx-auto flex h-16 items-center px-4 w-full relative">
          {/* --- LEFT: Nav & Mobile Trigger --- */}
          <div className="flex-1 flex justify-start items-center">
            {/* Desktop Nav (Ẩn trên mobile) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <NavItem key={link.label} to={link.to} label={link.label} />
              ))}
            </nav>

            {/* Mobile Menu Trigger (Hiện trên mobile) */}
            <button
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Dùng absolute center trên mobile để đảm bảo logo luôn ở giữa bất kể 2 bên lệch nhau */}
          <div className="shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link to="/">
              <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase cursor-pointer">
                EVERLANE
              </h1>
            </Link>
          </div>

          {/* --- RIGHT: Actions (GIỮ NGUYÊN CODE CŨ CỦA BẠN) --- */}
          <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
            <button
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            {user ? (
              <>
                <div className="relative z-50">
                  {isDropMenuOpen && (
                    <div
                      className="fixed inset-0 z-11 bg-transparent"
                      onClick={() => setIsDropMenuOpen(false)}
                    ></div>
                  )}
                  <div
                    className={`
                    absolute right-0 top-10 w-56 bg-white border border-gray-300 shadow-2xl rounded-md z-12
                    duration-200 origin-top-right p-1
                    ${
                      isDropMenuOpen
                        ? "scale-y-100 opacity-100 duration-300 visible"
                        : "scale-y-0 opacity-0 duration-300 invisible"
                    }
                  `}
                  >
                    <NavLink
                      to="/profile"
                      className="flex items-center text-sm gap-2 p-2 hover:bg-gray-100"
                    >
                      <User className="h-4.5 w-4.5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                      <span>Thông tin người dùng</span>
                    </NavLink>
                    <NavLink
                      className="flex items-center text-sm gap-2 p-2 hover:bg-gray-100"
                      to="/order-history"
                    >
                      <History className="h-4.5 w-4.5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                      <span>Lịch sử mua hàng</span>
                    </NavLink>
                    {role === 1 && (
                      <NavLink
                        className="flex items-center text-sm gap-2 p-2 hover:bg-gray-100"
                        to="/admin"
                      >
                        <ShieldCheck className="h-4.5 w-4.5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                        <span>Truy cập trang quản trị</span>
                      </NavLink>
                    )}

                    <NavLink
                      onClick={() => {
                        signOut();
                        setIsDropMenuOpen(false);
                      }}
                      className="flex items-center text-sm gap-2 p-2 text-red-500 hover:bg-gray-100"
                    >
                      <LogOut className="h-4.5 w-4.5 text-red-500 group-hover:text-gray-900 transition-colors" />
                      <span>Đăng xuất</span>
                    </NavLink>
                  </div>

                  <button
                    className={`hidden md:flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${
                      isDropMenuOpen ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                    onClick={handleDropMenuToggle}
                  >
                    <User className="h-5 w-5" />
                  </button>
                </div>
                <CartSheet />
              </>
            ) : (
              <DialogLogin />
            )}
          </div>

          {/* --- SEARCH BAR DROPDOWN  --- */}
          <div
            className={`
              absolute left-0 w-full bg-white shadow-md px-4 flex items-center h-20 z-40
              top-full transition-all duration-300 ease-in-out origin-top
              ${
                isSearchOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-5 invisible pointer-events-none"
              }
            `}
          >
            <div className="container mx-auto max-w-4xl flex items-center gap-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                autoFocus={isSearchOpen}
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:bg-gray-50 transition-colors"
              />
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

      {/* 1. Backdrop đen mờ */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* 2. Menu trượt từ trái sang */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header của Menu Mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-lg tracking-wider">MENU</span>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              signOut();
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Danh sách Links */}
        <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              to={link.to}
              label={link.label}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}

          <hr className="my-2 border-gray-100" />

          {/* Hiển thị các link User trên Mobile luôn (vì Dropdown trên mobile khó dùng) */}
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <User className="h-5 w-5" />
                <span>Tài khoản của tôi</span>
              </div>
              <Link
                to="/profile"
                className="text-gray-500 ml-7"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Thông tin
              </Link>
              <Link
                to="/order-history"
                className="text-gray-500 ml-7"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đơn hàng
              </Link>
              <Link
                className="text-red-500 ml-7"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đăng xuất
              </Link>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-black text-white font-medium py-3 rounded-md">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
