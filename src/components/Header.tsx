import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Clock, Star, ChevronRight, Copy, Check } from "lucide-react";
import { SHOP_INFO, getStoreStatus } from "../data/butcherData.ts";

interface HeaderProps {
  onOpenSchedule: () => void;
  onOpenReviewModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSchedule, onOpenReviewModal }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState(getStoreStatus());
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(SHOP_INFO.phone);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = SHOP_INFO.phone;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const navLinks = [
    { label: "Αρχική", href: "#hero" },
    { label: "Εκλεκτές Κοπές", href: "#cuts" },
    { label: "Κριτικές (5.0 ★)", href: "#reviews" },
    { label: "Ωράριο & Τοποθεσία", href: "#schedule" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-stone-800 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
          
          {/* LEFT ZONE: Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center group focus-visible:outline-rose-500 py-1"
              aria-label={SHOP_INFO.name}
            >
              {!imageError ? (
                <img
                  src="/logo.png"
                  alt={SHOP_INFO.name}
                  className="h-12 sm:h-15 md:h-16 w-auto max-w-[170px] sm:max-w-[230px] object-contain transition-transform duration-200 group-hover:scale-102 drop-shadow-2xs brightness-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                  {SHOP_INFO.name}
                </span>
              )}
            </a>
          </div>

          {/* CENTER ZONE: Desktop Quick Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-rose-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT ZONE: Fast Phone Call Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Phone Number Action Button */}
            <button
              type="button"
              onClick={handleCopyPhone}
              title={`Κλήση ή αντιγραφή: ${SHOP_INFO.phone}`}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-[4px] text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap active:scale-95 ${
                copied
                  ? "bg-rose-600 text-white"
                  : "bg-rose-700 hover:bg-rose-800 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-200" />
                  <span>Αντιγράφηκε!</span>
                </>
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-100 shrink-0" />
                  <span className="font-mono tabular-nums font-semibold">{SHOP_INFO.phone}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Hamburger Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-sm bg-[#161616] text-white h-full shadow-2xl flex flex-col z-10 animate-[slideRight_0.25s_ease-out] border-r border-stone-800">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#141414]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[4px] bg-stone-900 border border-stone-700 p-1 flex items-center justify-center">
                  {!imageError ? (
                    <img
                      src="/logo.png"
                      alt={SHOP_INFO.name}
                      className="h-full w-full object-contain brightness-110"
                    />
                  ) : (
                    <span className="font-serif-brand font-bold text-rose-500 text-xs">ΤΔ</span>
                  )}
                </div>
                <div>
                  <h2 className="font-serif-brand font-bold text-white leading-tight">
                    {SHOP_INFO.name}
                  </h2>
                  <p className="text-xs text-rose-400">{SHOP_INFO.subtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-[4px] text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Κλείσιμο μενού"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="px-5 py-3 bg-[#1a1a1a] border-b border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-stone-500"
                  }`}
                />
                <span className="font-medium text-stone-200">{status.statusText}</span>
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSchedule();
                }}
                className="text-rose-400 font-semibold hover:underline"
              >
                Ωράριο &gt;
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1 bg-[#161616]">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-[4px] text-stone-200 hover:bg-stone-800 hover:text-white font-medium text-sm transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </a>
              ))}
            </div>

            {/* Drawer Bottom Action: Phone */}
            <div className="p-4 border-t border-stone-800 bg-[#141414]">
              <div className="text-xs text-stone-400 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{SHOP_INFO.addressShort}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-[4px] font-medium text-sm transition-colors shadow-xs cursor-pointer ${
                  copied
                    ? "bg-rose-600 text-white"
                    : "bg-rose-700 text-white hover:bg-rose-800"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-rose-200" />
                    <span>Αντιγράφηκε ο αριθμός!</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 text-rose-100" />
                    <span className="font-mono tabular-nums font-semibold">{SHOP_INFO.phone}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
