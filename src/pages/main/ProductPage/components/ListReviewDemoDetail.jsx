import ReviewDetailItem from "./ReviewDeatailItem";

function ListReviewDemoDetail({ reviews }) {
  return (
    <div className="">
      {reviews?.slice(0, 5).map((review) => (
        <ReviewDetailItem key={review.review_id} review={review} />
      ))}
    </div>
  );
}

export default ListReviewDemoDetail;
