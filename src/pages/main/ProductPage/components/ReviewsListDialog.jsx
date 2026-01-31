import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ReviewDetailItem from "./ReviewDeatailItem";

const ReviewsListDialog = ({ reviews = [] }) => {
  // Logic kiểm tra: Nếu ít hơn hoặc bằng 5 review thì không cần hiển thị nút này
  // Vì list bên ngoài đã hiện đủ rồi.
  if (!reviews || reviews.length <= 5) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[300px] bg-black hover:bg-gray-800 text-white">
          Xem thêm đánh giá
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Đánh giá từ khách hàng
          </DialogTitle>
          <DialogDescription>
            Tổng hợp chi tiết {reviews.length} đánh giá cho sản phẩm này.
          </DialogDescription>
        </DialogHeader>

        {/* Khu vực cuộn */}
        <ScrollArea className="flex-1 mt-4 pr-4 -mr-4">
          <div className="flex flex-col gap-6 pb-4">
            {reviews.map((review) => (
              <ReviewDetailItem key={review.review_id} review={review} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewsListDialog;
