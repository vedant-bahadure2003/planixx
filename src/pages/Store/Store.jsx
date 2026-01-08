import {
  StoreHero,
  StoreCategories,
  WhyChooseUs,
  TestimonialsStore,
  StoreCTA,
} from "../../components/store";

const Store = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <StoreHero />
      <StoreCategories />
      <WhyChooseUs />
      <TestimonialsStore />
      <StoreCTA />
    </div>
  );
};

export default Store;
