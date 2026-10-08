import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Keep visible for ~1.1s for smooth brand experience, then fade out
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        onComplete();
      }, 400);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-400 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative flex items-center justify-center">
          <div className="relative flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32 rounded-[4px] bg-[#181818] border border-stone-800 shadow-xl p-3">
            {!imageError ? (
              <img
                src="/logo.png"
                alt="Το Διαλεχτό Logo"
                className="max-h-full max-w-full object-contain animate-pulse brightness-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-serif-brand font-bold text-xl text-rose-500 tracking-wider">
                  ΤΟ ΔΙΑΛΕΧΤΟ
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">
                  ΚΡΕΟΠΩΛΕΙΟ
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Minimalist loading indicator bar */}
        <div className="w-24 h-0.5 bg-stone-800 rounded-[4px] mt-6 overflow-hidden">
          <div className="h-full bg-rose-600 rounded-[4px] animate-[shimmer_1.2s_infinite]" />
        </div>
      </div>
    </div>
  );
};
