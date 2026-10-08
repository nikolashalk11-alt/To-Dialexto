import React, { useState } from "react";
import { Phone, ArrowDown, ShieldCheck, HeartHandshake, Award, Flame } from "lucide-react";
import { SHOP_INFO } from "../data/butcherData.ts";

// Generated realistic meat hero photograph (pure culinary gourmet food presentation, no work environment)
import heroMeatImg from "../assets/images/hero_butcher_meats_1790409796827.jpg";

export const Hero: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* MAIN HERO SECTION: High-impact Headline & Realistic Gourmet Meat Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Text - Centered vertically between the badge and the body text */}
            <div className="py-2 sm:py-4">
              <h1 className="font-serif-brand text-3xl sm:text-5xl lg:text-6xl text-white tracking-normal leading-[1.25]">
                <span className="block">
                  Η αυθεντική ποιότητα
                </span>
                <span className="block mt-1 sm:mt-2">
                  στο κρέας έχει όνομα.
                </span>
                <span className="text-rose-500 block mt-2 sm:mt-3">
                  Το Διαλεχτό.
                </span>
              </h1>
            </div>

            <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
              Στο κέντρο των Ιωαννίνων, επιλέγουμε καθημερινά για εσάς μόνο τα πιο τρυφερά και
              ποιοτικά κρέατα ελληνικής εκτροφής. Ειδικές κοπές, απόλυτη καθαριότητα και
              χειροποίητες γεύσεις για το καθημερινό και το γιορτινό σας τραπέζι.
            </p>

            {/* Action Button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${SHOP_INFO.phoneClean}`}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[4px] bg-rose-700 text-white font-bold text-sm hover:bg-rose-800 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-rose-200" />
                <span>Τηλεφωνική Παραγγελία</span>
              </a>
            </div>

          </div>

          {/* Hero Image Presentation with crisp rounded-[4px] border */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[4px] overflow-hidden shadow-sm border border-stone-800 bg-stone-900 aspect-16/10 sm:aspect-16/11 group">
              <img
                src={heroMeatImg}
                alt="Εκλεκτές κοπές κρέατος Το Διαλεχτό - Ribeye & Tomahawk"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Gradient scrim for subtle luxury aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block">
                    
                  </span>
                  <p className="font-serif-brand text-lg sm:text-xl font-bold">
                    Παϊδάκια
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
