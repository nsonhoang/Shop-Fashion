// Dữ liệu mẫu cho reviews
// dữ liệu review đồ chị em
export const womenReviews = {
  averageRating: 5.0,
  ratingDistribution: {
    5: 6,
    4: 2,
    3: 0,
    2: 0,
    1: 0
  },
  reviews: [
    {
      review_id: 'w1',
      user_id: 'user1',
      product_id: 'product1',
      rating: 5,
      comment: 'Bộ đồ cực kì hợp, tôn dáng, màu sắc hài hòa. Tui mua 2 bộ mặc rất ok, recomment cho chị em.',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Nguyễn Văn Chiến',
        avatar_url: null
      },
      height: '5\'0" - 5\'1"',
      weight: '-10 lb',
      body_type: 'Petite',
      size_purchased: 'L',
      usual_size: 'L',
      verified: true
    },
    {
      review_id: 'w2',
      user_id: 'user2',
      product_id: 'product2',
      rating: 5,
      comment: 'Chất lượng vải ấn tượng, màu sắc tươi sáng, dịch vụ chu đáo, giao hàng nhanh chóng, đổi trả phút mốt.',
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Người Ẩn danh 34563',
        avatar_url: null
      },
      height: '5\'0" - 5\'1"',
      weight: '-10 lb',
      body_type: 'Petite',
      size_purchased: 'XL',
      usual_size: 'L',
      verified: true
    },
    {
      review_id: 'w3',
      user_id: 'user3',
      product_id: 'product3',
      rating: 5,
      comment: 'Váy đẹp mặc quá hợp, mua ngay đợt deal hời 12/12 giảm từ 5 củ xuống 3 củ 5 ngon quá chị em ơi!',
      created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Trận Trường Phân Tính',
        avatar_url: null
      },
      height: '5\'4" - 5\'5"',
      weight: '125 lb',
      body_type: 'Slim',
      size_purchased: 'M',
      usual_size: 'M',
      verified: true
    },
    {
      review_id: 'w4',
      user_id: 'user4',
      product_id: 'product4',
      rating: 4,
      comment: 'Đồ đẹp nhưng giao nhầm size mặc hơi chật xíu nhưng oke',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Chị Phiến',
        avatar_url: null
      },
      height: '5\'6" - 5\'7"',
      weight: '140 lb',
      body_type: 'Average',
      size_purchased: 'L',
      usual_size: 'M',
      verified: true
    }
  ]
};


// review của tụi đực
export const menReviews = {
  averageRating: 4.8,
  ratingDistribution: {
    5: 8,
    4: 3,
    3: 1,
    2: 0,
    1: 0
  },
  reviews: [
    {
      review_id: 'm1',
      user_id: 'user5',
      product_id: 'product5',
      rating: 5,
      comment: 'Vừa vặn hoàn hảo! Chất liệu cao cấp và thoải mái. Rất khuyên dùng cho nam giới đang tìm kiếm một trang phục vừa phong cách vừa tiện dụng.',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Ricardo Matheo Roneoney',
        avatar_url: null
      },
      height: '5\'10" - 6\'0"',
      weight: '170 lb',
      body_type: 'Athletic',
      size_purchased: 'M',
      usual_size: 'M',
      verified: true
    },
    {
      review_id: 'm2',
      user_id: 'user6',
      product_id: 'product6',
      rating: 5,
      comment: 'Áo khoác tuyệt vời so với giá tiền. Đủ ấm cho mùa đông và trông rất chuyên nghiệp.',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'penaldo',
        avatar_url: null
      },
      height: '6\'0" - 6\'2"',
      weight: '190 lb',
      body_type: 'Broad',
      size_purchased: 'L',
      usual_size: 'L',
      verified: true
    },
    {
      review_id: 'm3',
      user_id: 'user7',
      product_id: 'product7',
      rating: 4,
      comment: 'Quần có chất lượng tốt, nhưng màu sắc hơi tối hơn so với hình ảnh.',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Messu',
        avatar_url: null
      },
      height: '5\'8" - 5\'9"',
      weight: '160 lb',
      body_type: 'Average',
      size_purchased: 'M',
      usual_size: 'M',
      verified: true
    },
    {
      review_id: 'm4',
      user_id: 'user8',
      product_id: 'product8',
      rating: 5,
      comment: 'Đôi giày này cực kỳ thoải mái ngay từ khi mới mua về. Hoàn hảo để mang cả ngày.',
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Ẩn danh 12543',
        avatar_url: null
      },
      height: '5\'11" - 6\'0"',
      weight: '175 lb',
      body_type: 'Slim',
      size_purchased: '10',
      usual_size: '10',
      verified: true
    },
    {
      review_id: 'm5',
      user_id: 'user9',
      product_id: 'product9',
      rating: 3,
      comment: 'Áo sơ mi ổn, nhưng tay áo dài hơn so với dự kiến khiên tôi không thể mặc hơi dai và đi lại khó khăn, ngoài ra cô bán xôi ngoài hẻm tui nay nghỉ bán và tui vừa hết giấy về sinh.',
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      profiles: {
        full_name: 'Võ Chí Công',
        avatar_url: null
      },
      height: '5\'7" - 5\'8"',
      weight: '155 lb',
      body_type: 'Petite',
      size_purchased: 'S',
      usual_size: 'S',
      verified: true
    }
  ]
};

// Helper function để lấy reviews theo gender(chưa dùng)
export const getReviewsByGender = (gender) => {
  switch(gender.toLowerCase()) {
    case 'women':
    case 'woman':
      return womenReviews;
    case 'men':
    case 'man':
      return menReviews;
    case 'unisex':
      return unisexReviews;
    default:
      return womenReviews; // default
  }
};

export default { womenReviews, menReviews, getReviewsByGender };