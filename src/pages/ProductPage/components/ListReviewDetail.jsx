import ReviewDetailItem from "./ReviewDeatailItem";

function ListReviewDetail({ reviews }) {
  return (
    <div className="">
      {reviews.map(
        (review, index) => (
          console.log(review.user.full_name),
          (<ReviewDetailItem key={index} review={review} />)
        )
      )}
    </div>
  );
}

export default ListReviewDetail;
