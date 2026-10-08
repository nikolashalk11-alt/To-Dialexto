import React from "react";
import {
  Phone,
  Navigation,
} from "lucide-react";
import {
  SHOP_INFO,
  WEEKLY_SCHEDULE,
} from "../data/butcherData.ts";

export const LocationSchedule: React.FC = () => {
  const currentDayIndex = new Date().getDay();

  const formatSlotTime = (slot: { start: number; end: number }) => {
    const startH = Math.floor(slot.start / 60).toString().padStart(2, "0");
    const startM = (slot.start % 60).toString().padStart(2, "0");
    const endH = Math.floor(slot.end / 60).toString().padStart(2, "0");
    const endM = (slot.end % 60).toString().padStart(2, "0");
    return `${startH}:${startM} – ${endH}:${endM}`;
  };

  return (
    <section id="schedule" className="py-14 sm:py-20 bg-[#121212] border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <h2 className="font-['Roboto',sans-serif] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ωράριο Λειτουργίας & Τοποθεσία
          </h2>

          <p className="font-['Roboto',sans-serif] text-stone-300 text-xs sm:text-sm">
            Σας περιμένουμε στο κέντρο των Ιωαννίνων, στην οδό Μιχαήλ Αγγέλου 34-36.
          </p>
        </div>

        {/* Schedule & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Column 1: Weekly Hours Table with clean Roboto typography */}
          <div className="lg:col-span-6 bg-[#1b1b1b] rounded-[4px] border border-stone-800 p-5 sm:p-7 shadow-xs space-y-4 font-['Roboto',sans-serif]">
            
            <div className="border-b border-stone-800/80 pb-3">
              <h3 className="font-bold text-lg text-white tracking-tight">
                Εβδομαδιαίο Πρόγραμμα
              </h3>
            </div>

            {/* Schedule List */}
            <div className="space-y-1.5">
              {WEEKLY_SCHEDULE.map((item) => {
                const isToday = item.dayIndex === currentDayIndex;

                return (
                  <div
                    key={item.dayName}
                    className={`flex items-center justify-between py-2 px-3 rounded-[4px] transition-colors ${
                      isToday
                        ? "bg-rose-600 border border-rose-600 text-white shadow-xs"
                        : "bg-[#151515] hover:bg-stone-800/50 text-stone-200"
                    }`}
                  >
                    {/* Day label */}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm ${isToday ? "font-bold text-white" : "font-medium text-stone-200"}`}>
                        {item.dayName}
                      </span>
                    </div>

                    {/* Hours display */}
                    <div>
                      {item.isClosed ? (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-[3px] ${
                            isToday
                              ? "bg-black/25 text-white border border-white/25"
                              : "bg-stone-800/80 text-stone-400 border border-stone-700/40"
                          }`}
                        >
                          Κλειστά
                        </span>
                      ) : item.slots.length === 1 ? (
                        <span className={`text-xs sm:text-sm tabular-nums ${isToday ? "font-bold text-white" : "font-medium text-stone-100"}`}>
                          {formatSlotTime(item.slots[0])}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm tabular-nums">
                          <span className={`${isToday ? "font-bold text-white" : "font-medium text-stone-100"}`}>
                            {formatSlotTime(item.slots[0])}
                          </span>
                          <span className={`${isToday ? "text-white/80" : "text-stone-400"} text-xs font-bold`}>&</span>
                          <span className={`${isToday ? "font-bold text-white" : "font-medium text-stone-100"}`}>
                            {formatSlotTime(item.slots[1])}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Column 2: Location, Contact & Interactive Map Embed */}
          <div className="lg:col-span-6 space-y-6 font-['Roboto',sans-serif]">
            
            {/* Contact details box with rounded-[4px] */}
            <div className="bg-[#1b1b1b] rounded-[4px] border border-stone-800 p-5 sm:p-7 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-white tracking-tight">
                Στοιχεία Επικοινωνίας
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase font-semibold text-stone-400">Διεύθυνση</p>
                  <p className="font-medium text-white mt-0.5">{SHOP_INFO.address}</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Κεντρικό σημείο στα Ιωάννινα, εύκολη πρόσβαση
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase font-semibold text-stone-400">Τηλέφωνο</p>
                  <a
                    href={`tel:${SHOP_INFO.phoneClean}`}
                    className="font-bold text-base text-rose-400 hover:underline block mt-0.5"
                  >
                    {SHOP_INFO.phone}
                  </a>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Δεχόμαστε τηλεφωνικές παραγγελίες και προκρατήσεις κοπών
                  </p>
                </div>
              </div>

              {/* Action buttons with rounded-[4px] */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={SHOP_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-rose-700 text-white text-xs sm:text-sm font-semibold hover:bg-rose-800 transition-colors shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Άνοιγμα στους Χάρτες Google</span>
                </a>

                <a
                  href={`tel:${SHOP_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-stone-700 bg-stone-900 text-white text-xs sm:text-sm font-semibold hover:bg-stone-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Κλήση</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
