export interface ScheduleDay {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  display: string;
  isClosed: boolean;
  slots: { start: number; end: number }[]; // in minutes from midnight (e.g. 7:30 = 450)
}

export const SHOP_INFO = {
  name: "ΤΟ ΔΙΑΛΕΧΤΟ",
  subtitle: "Κρεοπωλείο",
  rating: "5,0",
  ratingNumber: 5.0,
  reviewsCount: 53,
  address: "Μιχαήλ Αγγέλου 34-36, Ιωάννινα 453 33, Ελλάδα",
  addressShort: "Μιχαήλ Αγγέλου 34-36, Ιωάννινα",
  phone: "+30 2651 608397",
  phoneClean: "+302651608397",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Το+Διαλεχτό+Κρεοπωλείο+Μιχαήλ+Αγγέλου+34-36+Ιωάννινα",
  googleReviewUrl: "https://www.google.com/maps/place/Μιχαήλ+Αγγέλου+34-36,+Ιωάννινα+453+33",
};

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    dayName: "Δευτέρα",
    dayIndex: 1,
    display: "7:30 π.μ. – 3:30 μ.μ.",
    isClosed: false,
    slots: [{ start: 7 * 60 + 30, end: 15 * 60 + 30 }],
  },
  {
    dayName: "Τρίτη",
    dayIndex: 2,
    display: "7:30 π.μ. – 3:00 μ.μ., 6:00 – 9:30 μ.μ.",
    isClosed: false,
    slots: [
      { start: 7 * 60 + 30, end: 15 * 60 },
      { start: 18 * 60, end: 21 * 60 + 30 },
    ],
  },
  {
    dayName: "Τετάρτη",
    dayIndex: 3,
    display: "7:30 π.μ. – 3:30 μ.μ.",
    isClosed: false,
    slots: [{ start: 7 * 60 + 30, end: 15 * 60 + 30 }],
  },
  {
    dayName: "Πέμπτη",
    dayIndex: 4,
    display: "7:30 π.μ. – 3:00 μ.μ., 6:00 – 9:30 μ.μ.",
    isClosed: false,
    slots: [
      { start: 7 * 60 + 30, end: 15 * 60 },
      { start: 18 * 60, end: 21 * 60 + 30 },
    ],
  },
  {
    dayName: "Παρασκευή",
    dayIndex: 5,
    display: "7:30 π.μ. – 3:00 μ.μ., 6:00 – 9:30 μ.μ.",
    isClosed: false,
    slots: [
      { start: 7 * 60 + 30, end: 15 * 60 },
      { start: 18 * 60, end: 21 * 60 + 30 },
    ],
  },
  {
    dayName: "Σάββατο",
    dayIndex: 6,
    display: "7:30 π.μ. – 4:00 μ.μ.",
    isClosed: false,
    slots: [{ start: 7 * 60 + 30, end: 16 * 60 }],
  },
  {
    dayName: "Κυριακή",
    dayIndex: 0,
    display: "Κλειστά",
    isClosed: true,
    slots: [],
  },
];

export function getStoreStatus(): {
  isOpen: boolean;
  statusText: string;
  nextOpenText?: string;
  currentDayName: string;
} {
  const now = new Date();
  // Greek time UTC+2 or UTC+3. Let's use user's local date/time
  const dayIndex = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = WEEKLY_SCHEDULE.find((s) => s.dayIndex === dayIndex) || WEEKLY_SCHEDULE[0];

  if (todaySchedule.isClosed) {
    return {
      isOpen: false,
      statusText: "Κλειστά σήμερα (Κυριακή)",
      nextOpenText: "Ανοίγει τη Δευτέρα στις 7:30 π.μ.",
      currentDayName: todaySchedule.dayName,
    };
  }

  const activeSlot = todaySchedule.slots.find(
    (slot) => currentMinutes >= slot.start && currentMinutes < slot.end,
  );

  if (activeSlot) {
    return {
      isOpen: true,
      statusText: "Ανοιχτά τώρα",
      currentDayName: todaySchedule.dayName,
    };
  }

  // Check if opening later today
  const laterSlot = todaySchedule.slots.find((slot) => currentMinutes < slot.start);
  if (laterSlot) {
    const hours = Math.floor(laterSlot.start / 60);
    const mins = laterSlot.start % 60;
    const formatted = `${hours}:${mins.toString().padStart(2, "0")}`;
    return {
      isOpen: false,
      statusText: "Κλειστά αυτή την ώρα",
      nextOpenText: `Ανοίγει ξανά σήμερα στις ${formatted}`,
      currentDayName: todaySchedule.dayName,
    };
  }

  return {
    isOpen: false,
    statusText: "Κλειστά για σήμερα",
    nextOpenText: "Ανοίγει αύριο στις 7:30 π.μ.",
    currentDayName: todaySchedule.dayName,
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  comment: string;
  highlight: string;
}

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: "r1",
    author: "Κώστας Παπαδόπουλος",
    rating: 5,
    timeAgo: "πριν από 2 εβδομάδες",
    highlight: "Η κορυφαία ποιότητα στα Γιάννενα",
    comment:
      "Το καλύτερο κρεοπωλείο στα Ιωάννινα με διαφορά! Μοσχαράκι απίστευτα μαλακό και πεντανόστιμο. Εξαιρετική καθαριότητα και οι άνθρωποι ευγενέστατοι, πρόθυμοι να σου προτείνουν την κατάλληλη κοπή για κάθε συνταγή.",
  },
  {
    id: "r2",
    author: "Ελένη Γεωργίου",
    rating: 5,
    timeAgo: "πριν από 1 μήνα",
    highlight: "Άψογη εξυπηρέτηση & χειροποίητα",
    comment:
      "Δεν αλλάζω 'Το Διαλεχτό' με τίποτα. Τα χειροποίητα μπιφτέκια και τα ρολά τους είναι σκέτη απόλαυση για το οικογενειακό τραπέζι. Πάντα φρέσκα και καθαρά.",
  },
  {
    id: "r3",
    author: "Δημήτρης Βασιλείου",
    rating: 5,
    timeAgo: "πριν από 3 μήνες",
    highlight: "Εκλεκτά κρέατα για απαιτητικούς",
    comment:
      "Όνομα και πράγμα: ΔΙΑΛΕΧΤΟ! Οι κοπές τους σε ribeye και tomahawk για BBQ δεν υπάρχουν πουθενά αλλού στην πόλη. Τέλεια σίτευση και βαθιά νοστιμιά.",
  },
  {
    id: "r4",
    author: "Μαρία Στασινού",
    rating: 5,
    timeAgo: "πριν από 2 μήνες",
    highlight: "Εμπιστοσύνη & σεβασμός στον πελάτη",
    comment:
      "Ψωνίζω σταθερά από εδώ. Μεγάλη εμπιστοσύνη στην προέλευση των κρεάτων. Πάντα με το χαμόγελο, σου ετοιμάζουν ακριβώς αυτό που ζητάς χωρίς καμία καθυστέρηση.",
  },
  {
    id: "r5",
    author: "Γιώργος Νικολάου",
    rating: 5,
    timeAgo: "πριν από 4 μήνες",
    highlight: "Απόλυτο 5/5 αστέρια",
    comment:
      "Το συνιστώ ανεπιφύλακτα σε όποιον αναζητά αγνό, καθαρό και ποιοτικό κρέας στο κέντρο των Ιωαννίνων. Επαγγελματισμός στο έπακρο!",
  },
];

export interface MeatCut {
  id: string;
  category: "beef" | "lamb_pork" | "special_poultry" | "dryaged";
  categoryLabel: string;
  name: string;
  description: string;
  bestFor: string;
  cookingTip: string;
  origin: string;
  imageKey: "dryaged" | "beef" | "lamb_pork" | "poultry_sausages";
}

export const MEAT_CUTS: MeatCut[] = [
  {
    id: "c1",
    category: "dryaged",
    categoryLabel: "Χειροποίητο",
    name: "Χειροποίητο Πολίτικο Κεμπάπ",
    description: "Παραδοσιακός πολίτικος κιμάς από εκλεκτό μοσχάρι και αρνί, ζυμωμένος στο χέρι με αυθεντικά μπαχαρικά και κύμινο, έτοιμος για ψήσιμο.",
    bestFor: "Ψήσιμο στα κάρβουνα, σχάρα, μαντέμι",
    cookingTip: "Ψήστε σε δυνατή φωτιά γυρίζοντας συχνά για να διατηρηθεί ζουμερό και αφράτο.",
    origin: "Φρέσκια καθημερινή παρασκευή στο εργαστήριό μας",
    imageKey: "dryaged",
  },
  {
    id: "c2",
    category: "beef",
    categoryLabel: "Μοσχάρι",
    name: "Μοσχαρίσιο Σουβλάκι",
    description: "Χειροποίητα σουβλάκια από εκλεκτό και τρυφερό μοσχαρίσιο κρέας, περασμένα στο καλαμάκι, ιδανικά για ζουμερό ψήσιμο.",
    bestFor: "Στα κάρβουνα, σχάρα, γκριλ, τηγάνι",
    cookingTip: "Ψήστε σε μέτρια προς δυνατή θράκα γυρίζοντας συχνά για να διατηρήσει όλους τους χυμούς του.",
    origin: "Επιλεγμένα ελληνικά μοσχάρια",
    imageKey: "beef",
  },
  {
    id: "c3",
    category: "lamb_pork",
    categoryLabel: "Χοιρινό",
    name: "Χοιρινές Μπριζόλες",
    description: "Φρέσκες χοιρινές μπριζόλες ελληνικής εκτροφής (λαιμού & κόντρα), κομμένες με ακρίβεια, εξαιρετικά τρυφερές και ζουμερές στο ψήσιμο.",
    bestFor: "Σχάρα, κάρβουνα, τηγάνι, φούρνος",
    cookingTip: "Ψήστε σε δυνατή φωτιά και αφήστε τες να ξεκουραστούν 3 λεπτά για να κρατήσουν όλους τους χυμούς τους.",
    origin: "Επιλεγμένα ελληνικά χοιρινά",
    imageKey: "lamb_pork",
  },
  {
    id: "c4",
    category: "special_poultry",
    categoryLabel: "Χοιρινό",
    name: "Πανσέτες",
    description: "Εκλεκτές χοιρινές πανσέτες ελληνικής εκτροφής, τρυφερές και ζουμερές με ιδανική κατανομή λίπους για ασύγκριτη γεύση στο ψήσιμο.",
    bestFor: "Τηγάνι, κάρβουνα, φούρνος, σχάρα",
    cookingTip: "Ψήσιμο σε δυνατή φωτιά για τραγανή κρούστα και ζουμερό αποτέλεσμα.",
    origin: "Επιλεγμένα ελληνικά χοιρινά",
    imageKey: "poultry_sausages",
  },
];
