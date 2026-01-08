import {
  HeroSection,
  UpcomingEvents,
  AboutSection,
  EnquirySection,
  PrivacyPolicy,
} from "../../components";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <UpcomingEvents />
      <AboutSection />
      <EnquirySection />
      <PrivacyPolicy />
    </div>
  );
};

export default Landing;
