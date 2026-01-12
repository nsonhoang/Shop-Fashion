import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const ProductReviews = ({ 
  reviews = [], 
  averageRating = 0, 
  ratingDistribution = {},
  onSortChange 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-black fill-black" : "text-gray-300 fill-gray-300"}
          />
        ))}
      </div>
    );
  };

  const finalRatingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, ...ratingDistribution };
  const maxCount = Math.max(...Object.values(finalRatingDist), 1);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <div>
              <div className="mb-1">{renderStars(Math.round(averageRating))}</div>
              <div className="text-xs text-gray-600">Overall Rating</div>
            </div>
          </div>
          
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = finalRatingDist[star] || 0;
              const width = (count / maxCount) * 100;
              
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-5">{star} ★</span>
                  <div className="flex-1 h-1.5 bg-gray-200">
                    <div 
                      className="h-full bg-black"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="w-4 text-right">{count}</span>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-1 text-sm">
            <div>Runs slightly large</div>
            <div>Run small</div>
            <div>Run large</div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* FILTER & SORT */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} />
          <span className="text-sm">Verified</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-sm">Sort by:</span>
          <select 
            className="border p-1 focus:outline-none text-sm"
            onChange={(e) => onSortChange?.(e.target.value)}
            defaultValue="highest"
          >
            <option value="highest">Highest to Lowest Rating</option>
            <option value="lowest">Lowest to Highest Rating</option>
            <option value="newest">Most Recent</option>
          </select>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* REVIEWS */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={review.review_id || index} className={index > 0 ? "pt-3 border-t" : ""}>
            <div className="flex flex-col md:flex-row">
              
              <div className="md:w-2/5 pr-3">
                <div className="font-bold text-sm mb-1">{review.profiles?.full_name || 'Anonymous'}</div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <CheckCircle size={12} />
                    <span>Verified</span>
                  </div>
                )}
                
                <div className="text-xs space-y-0.5">
                  {review.height && (
                    <div>
                      <span className="text-gray-600">Height:</span> {review.height}
                    </div>
                  )}
                  
                  {review.weight && (
                    <div>
                      <span className="text-gray-600">Weight (lb):</span> {review.weight}
                    </div>
                  )}
                  
                  {review.body_type && (
                    <div>
                      <span className="text-gray-600">Body Type:</span> {review.body_type}
                    </div>
                  )}
                  
                  {review.size_purchased && (
                    <div>
                      <span className="text-gray-600">Size Purchased:</span> {review.size_purchased}
                    </div>
                  )}
                  
                  {review.usual_size && (
                    <div>
                      <span className="text-gray-600">Usual Size:</span> {review.usual_size}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-3/5">
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(review.rating || 0)}
                  <span className="font-medium text-sm">{review.rating || 0}.0</span>
                  <span className="text-gray-600 text-xs ml-2">{formatDate(review.created_at)}</span>
                </div>
                
                <div className="text-sm text-gray-800">
                  {review.comment || 'No comment'}
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;