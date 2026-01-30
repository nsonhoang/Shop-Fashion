import ReviewDetailItem from "./ReviewDeatailItem";

function ListReviewDetail({ reviews }) {
  return (
    <div className="">
      {reviews.map((review) => (
        <ReviewDetailItem key={review.review_id} review={review} />
      ))}
    </div>
  );
}

export default ListReviewDetail;
