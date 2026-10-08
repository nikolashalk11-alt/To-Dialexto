import React, { useState } from "react";
import { Star, X, Check, ExternalLink, Sparkles } from "lucide-react";
import { SHOP_INFO } from "../data/butcherData.ts";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (review: { author: string; rating: number; comment: string }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    if (onSubmitSuccess) {
      onSubmitSuccess({ author: name.trim(), rating, comment: comment.trim() });
    }
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName("");
    setComment("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Dialog with clean rounded-[4px] geometry */}
      <div className="relative w-full max-w-md bg-[#1c1c1c] text-white rounded-[4px] p-5 sm:p-7 shadow-xl border border-stone-800 z-10 animate-[scaleIn_0.2s_ease-out]">
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-[4px] text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Κλείσιμο παραθύρου"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Η γνώμη σας μετράει</span>
              </div>
              <h3 className="font-serif-brand font-semibold text-2xl text-white">
                Γράψτε μια αξιολόγηση
              </h3>
              <p className="text-xs text-stone-400">
                Μοιραστείτε την εμπειρία σας από το κρεοπωλείο {SHOP_INFO.name}.
              </p>
            </div>

            {/* Star Rating Picker with rounded-[4px] */}
            <div className="space-y-1.5 text-center py-2 bg-[#242424] rounded-[4px] border border-stone-700">
              <span className="text-xs font-medium text-stone-300">Βαθμολογία</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 cursor-pointer transition-transform hover:scale-115 focus-visible:outline-rose-500"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-rose-400">
                {rating === 5
                  ? "Εξαιρετικό (5/5)"
                  : rating === 4
                  ? "Πολύ καλό (4/5)"
                  : `${rating}/5 αστέρια`}
              </span>
            </div>

            {/* Inputs with rounded-[4px] */}
            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Το όνομά σας
                </label>
                <input
                  type="text"
                  required
                  placeholder="π.χ. Μιχάλης Ι."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-[4px] bg-[#141414] border border-stone-700 text-white placeholder-stone-500 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Το σχόλιό σας
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Γράψτε λίγα λόγια για την ποιότητα του κρέατος και την εξυπηρέτηση..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-[4px] bg-[#141414] border border-stone-700 text-white placeholder-stone-500 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                />
              </div>
            </div>

            {/* Submit with rounded-[4px] */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-[4px] bg-rose-700 text-white font-medium text-sm hover:bg-rose-800 transition-colors shadow-xs cursor-pointer"
              >
                Υποβολή Αξιολόγησης
              </button>

              <a
                href={SHOP_INFO.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <span>Ή αξιολογήστε μας απευθείας στο Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="h-12 w-12 rounded-[4px] bg-rose-950/60 text-rose-400 border border-rose-800/60 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif-brand font-bold text-2xl text-white">
                Σας ευχαριστούμε θερμά!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Η αξιολόγησή σας καταχωρήθηκε με επιτυχία και μας βοηθά να παραμένουμε αντάξιοι της
                εμπιστοσύνης σας.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2 rounded-[4px] bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
              >
                Κλείσιμο
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
