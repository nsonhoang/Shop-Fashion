import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner"; // Hoặc thư viện toast bạn đang dùng

function DialogCreateReview({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý khi hover chuột vào sao (nếu muốn làm hiệu ứng hover)
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async () => {
    // Validate cơ bản
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (comment.trim().length < 5) {
      toast.error("Nội dung đánh giá quá ngắn!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Gọi hàm onSubmit được truyền từ props (gọi API ở component cha)
      if (onSubmit) {
        await onSubmit({ rating, comment });
      }

      // Reset form và đóng dialog sau khi thành công

      setRating(0);
      setComment("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[300px] bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
          Viết đánh giá
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
          <DialogDescription>
            Chia sẻ trải nghiệm của bạn về sản phẩm này để giúp những người khác
            mua hàng.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 1. Phần chọn Rating (Sao) */}
          <div className="flex flex-col gap-2 items-center justify-center mb-2">
            <Label className="text-base font-semibold">
              Chất lượng sản phẩm
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-110 focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={32}
                    // Logic tô màu: Nếu sao hiện tại <= (sao đang hover HOẶC sao đã chọn) thì tô vàng
                    className={`
                      ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-transparent text-gray-300"
                      } 
                      transition-colors duration-200
                    `}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            <div className="h-5 text-sm font-medium text-yellow-600">
              {/* Hiển thị text trạng thái dựa trên số sao */}
              {hoverRating || rating ? (
                <span>
                  {(hoverRating || rating) === 5 && "Tuyệt vời"}
                  {(hoverRating || rating) === 4 && "Hài lòng"}
                  {(hoverRating || rating) === 3 && "Bình thường"}
                  {(hoverRating || rating) === 2 && "Không hài lòng"}
                  {(hoverRating || rating) === 1 && "Tệ"}
                </span>
              ) : null}
            </div>
          </div>

          {/* 2. Phần nhập Comment */}
          <div className="grid gap-2">
            <Label htmlFor="comment">Nhận xét của bạn</Label>
            <Textarea
              id="comment"
              placeholder="Sản phẩm rất đẹp, đóng gói cẩn thận..."
              className="min-h-[100px] resize-none focus-visible:ring-black"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCreateReview;
