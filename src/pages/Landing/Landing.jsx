import { lazy, Suspense } from "react";
import { HeroSection, UpcomingEvents } from "../../components";

// Lazy load below-fold sections for better initial load performance
const AboutSection = lazy(() => import("../../components/home/AboutSection"));
const EnquirySection = lazy(() => import("../../components/home/EnquirySection"));
const PrivacyPolicy = lazy(() => import("../../components/home/DataPolicy"));

// Section loading placeholder
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
  </div>
);

const Landing = () => {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Critical above-fold content - loaded immediately */}
      <HeroSection />
      <UpcomingEvents />
      
      {/* Below-fold content - lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <EnquirySection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PrivacyPolicy />
      </Suspense>
    </main>
  );
};

export default Landing;

