'use client';

import React from 'react';
import { useEffect } from 'react';
import { Review } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import ReviewForm from './ReviewForm';

function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <ReviewForm userId={userId} productId={productId} />
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
    </div>
  );
}

export default ReviewList;
