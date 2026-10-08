import React from "react";
import { Star, Edit3, Navigation, ExternalLink } from "lucide-react";
import { SHOP_INFO, REVIEWS_LIST } from "../data/butcherData.ts";

interface ReviewsSectionProps {
  onOpenReviewModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenReviewModal }) => {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header styled strictly after user's reference image */}
        <div className="space-y-3">
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Τι λένε για εμάς.
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif-brand font-bold text-lg text-white tabular-nums">
                  5.0 / 5.0
                </span>
                <span className="text-sm text-stone-300">
                  σε {SHOP_INFO.reviewsCount} αξιολογήσεις Google
                </span>
              </div>

              {/* 5 stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Review Cards Grid styled like the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS_LIST.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#1c1c1c] rounded-[4px] border border-stone-800 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-stone-700 transition-colors"
            >
              <div className="space-y-3">
                {/* 5 Stars cleanly at the top */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="italic text-stone-200 text-sm sm:text-base leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
