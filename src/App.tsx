/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Preloader } from "./components/Preloader.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { CutsShowcase } from "./components/CutsShowcase.tsx";
import { ReviewsSection } from "./components/ReviewsSection.tsx";
import { PortionCalculator } from "./components/PortionCalculator.tsx";
import { LocationSchedule } from "./components/LocationSchedule.tsx";
import { ReviewModal } from "./components/ReviewModal.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const scrollToSchedule = () => {
    const el = document.getElementById("schedule");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-body">
      {/* 1. Preloader displaying solely the logo with soft red & white aesthetic */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Top Header: Hamburger menu immediately adjacent to the logo (src="/logo.png") */}
      <Header
        onOpenSchedule={scrollToSchedule}
        onOpenReviewModal={() => setReviewModalOpen(true)}
      />

      {/* 3. Main Content */}
      <main className="flex-1">
        {/* Clean Hero Section without the top card */}
        <Hero />

        {/* Featured realistic meats & cuts showcase (pure culinary food photography, no work environment) */}
        <CutsShowcase />

        {/* Dedicated Reviews Section matching the user's reference format */}
        <ReviewsSection onOpenReviewModal={() => setReviewModalOpen(true)} />

        {/* Interactive Meat & Portion Calculator */}
        <PortionCalculator />

        {/* Full Weekly Schedule matching the uploaded image & Google Maps location */}
        <LocationSchedule />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Review Submission Modal ("Γράψτε μια αξιολόγηση") */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </div>
  );
}
