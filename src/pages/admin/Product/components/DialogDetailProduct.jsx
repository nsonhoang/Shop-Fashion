import React from "react";
// 1. Import thêm DialogHeader, DialogTitle, DialogDescription
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DialogDetailProduct({ product, open, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        {/* 2. Dùng bộ thẻ Header chuẩn của thư viện để fix lỗi */}
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Chi tiết sản phẩm
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Thông tin chi tiết của {product.name}
          </DialogDescription>
        </DialogHeader>

        {/* Nội dung hiển thị (giữ nguyên như cũ) */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Tên */}
          <div>
            <label className="font-semibold text-sm">Tên sản phẩm</label>
            <div className="border p-2 rounded bg-gray-50 mt-1">
              {product.name}
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="font-semibold text-sm">Mô tả</label>
            <div className="border p-2 rounded bg-gray-50 mt-1 h-20 overflow-y-auto whitespace-pre-wrap">
              {product.description || "Không có mô tả"}
            </div>
          </div>

          {/* Giá & Giới tính */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm">Giá cơ bản</label>
              <div className="border p-2 rounded bg-gray-50 mt-1">
                {product.base_price?.toLocaleString("vi-VN")} đ
              </div>
            </div>
            <div>
              <label className="font-semibold text-sm">Giới tính</label>
              <div className="border p-2 rounded bg-gray-50 mt-1">
                {product.gender === "UNISEX" ? "Unisex" : product.gender}
              </div>
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <label className="font-semibold text-sm">Danh mục</label>
            <div className="border p-2 rounded bg-gray-50 mt-1">
              {product.categories?.name || "Chưa phân loại"}
            </div>
          </div>
        </div>

        {/* Nút đóng */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Đóng
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
