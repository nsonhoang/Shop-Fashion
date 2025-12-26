import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * @param {number} value - Số lượng hiện tại
 * @param {function} onDecrease - Hàm chạy khi bấm nút trừ
 * @param {function} onIncrease - Hàm chạy khi bấm nút cộng
 * @param {string} className - Class tùy chỉnh thêm (nếu cần)
 */
export function QuantitySelector({ value, onDecrease, onIncrease, className }) {
  return (
    <div
      className={cn(
        "flex items-center border border-input rounded-sm w-fit", // Viền bao quanh, bo góc nhẹ
        className
      )}
    >
      {/* Nút Trừ */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none hover:bg-transparent hover:text-primary"
        onClick={onDecrease}
        disabled={value <= 1}
      >
        <Minus className="h-3 w-3" />
      </Button>

      {/* Số lượng hiển thị */}
      <span className="w-8 text-center text-sm font-medium tabular-nums">
        {value}
      </span>

      {/* Nút Cộng */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none hover:bg-transparent hover:text-primary"
        onClick={onIncrease}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
