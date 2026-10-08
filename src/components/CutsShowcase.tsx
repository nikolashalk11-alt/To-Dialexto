import React, { useState } from "react";
import { Phone, Flame, Sparkles, ChefHat } from "lucide-react";
import { MEAT_CUTS, MeatCut, SHOP_INFO } from "../data/butcherData.ts";

import heroMeatImg from "../assets/images/hero_butcher_meats_1790409796827.jpg";
import politikoKebabImg from "../assets/images/cut_politiko_kebab_raw.jpg";
import beefImg from "../assets/images/cut_beef_steaks_1790409810687.jpg";
import lambPorkImg from "../assets/images/cut_lamb_pork_1790409821242.jpg";
import poultrySausagesImg from "../assets/images/cut_poultry_sausages_1790409833519.jpg";

export const CutsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Όλες οι Κοπές" },
    { id: "dryaged", label: "Dry-Aged" },
    { id: "beef", label: "Μοσχάρι" },
    { id: "lamb_pork", label: "Αρνί & Χοιρινό" },
    { id: "special_poultry", label: "Χειροποίητα & Πουλερικά" },
  ];

  const filteredCuts =
    selectedCategory === "all"
      ? MEAT_CUTS
      : MEAT_CUTS.filter((cut) => cut.category === selectedCategory);

  const getImageForCut = (imageKey: MeatCut["imageKey"]) => {
    switch (imageKey) {
      case "dryaged":
        return politikoKebabImg;
      case "beef":
        return beefImg;
      case "lamb_pork":
        return lambPorkImg;
      case "poultry_sausages":
      default:
        return poultrySausagesImg;
    }
  };

  return (
    <section id="cuts" className="py-14 sm:py-20 bg-[#121212] border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            Εκλεκτά Κρέατα & Εξειδικευμένες Κοπές
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm">
            Κάθε κοπή προετοιμάζεται με προσοχή στη λεπτομέρεια. Επιλέξτε την κατάλληλη κοπή
            ανάλογα με τον τρόπο μαγειρέματος που επιθυμείτε.
          </p>
        </div>

        {/* Cards Grid: Each card has its own UNIQUE non-repeating image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCuts.map((cut) => {
            const cutImg = getImageForCut(cut.imageKey);

            return (
              <div
                key={cut.id}
                className="bg-[#1f1f1f] rounded-[4px] border border-stone-800 overflow-hidden shadow-xs hover:border-rose-500/50 hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image slot */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-900">
                  <img
                    src={cutImg}
                    alt={cut.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1.5">
                    <h3 className="font-serif-brand font-semibold text-lg text-white group-hover:text-rose-400 transition-colors leading-snug">
                      {cut.name}
                    </h3>

                    <p className="text-stone-300 text-xs leading-relaxed">
                      {cut.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
