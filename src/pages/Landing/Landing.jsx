import {
  Navbar,
  HeroSection,
  UpcomingEvents,
  AboutSection,
  EnquirySection,
  PrivacyPolicy,
  Footer,
} from "../../components";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <UpcomingEvents />
      <AboutSection />
      <EnquirySection />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default Landing;
