import React from "react";
import { Phone, MapPin, Star, ShieldCheck, Heart } from "lucide-react";
import { SHOP_INFO } from "../data/butcherData.ts";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] border-t border-stone-800 pt-12 pb-8 text-stone-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-[4px] bg-stone-900 border border-stone-700 p-1 flex items-center justify-center shadow-2xs">
                <img
                  src="/logo.png"
                  alt={SHOP_INFO.name}
                  className="h-full w-full object-contain brightness-110"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <span className="font-serif-brand font-bold text-xl text-white block leading-tight">
                  {SHOP_INFO.name}
                </span>
                <span className="text-xs text-rose-400 font-medium">
                  {SHOP_INFO.subtitle} · Ιωάννινα
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Εκλεκτά κρέατα ανώτερης ποιότητας με σεβασμό στον καταναλωτή και την παράδοση.
              Βαθμολογημένο με 5.0 αστέρια από τους πελάτες μας στα Ιωάννινα.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-brand font-bold text-sm text-white uppercase tracking-wider">
              Πλοήγηση
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-stone-300 hover:text-white transition-colors">
                  Αρχική Σελίδα
                </a>
              </li>
              <li>
                <a href="#cuts" className="text-stone-300 hover:text-white transition-colors">
                  Οι Κοπές μας & Κρέατα
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-stone-300 hover:text-white transition-colors">
                  Ωράριο & Τοποθεσία
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-brand font-bold text-sm text-white uppercase tracking-wider">
              Επικοινωνία & Διεύθυνση
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">{SHOP_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a
                  href={`tel:${SHOP_INFO.phoneClean}`}
                  className="font-mono font-medium text-stone-200 hover:text-rose-400 transition-colors"
                >
                  {SHOP_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {SHOP_INFO.name}. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>

      </div>
    </footer>
  );
};
