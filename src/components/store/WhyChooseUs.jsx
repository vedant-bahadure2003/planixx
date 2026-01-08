import { useState } from "react";
import BusinessEnquiryModal from "../common/BusinessEnquiryModal";

const features = [
  {
    id: 1,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    title: "360° Coverage",
    description:
      "From decorations to cleanup - we cover every aspect of your event supplies. One stop for all your needs.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Quality Assured",
    description:
      "Every product goes through rigorous quality checks. We partner only with trusted manufacturers and suppliers.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Best Prices",
    description:
      "Competitive pricing with regular discounts. Get wholesale rates even for small quantities.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Fast Delivery",
    description:
      "Express delivery options available. Get your supplies when you need them, not when we feel like it.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 5,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Expert Support",
    description:
      "Our event specialists are available 24/7 to help you choose the perfect supplies for your occasion.",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: 6,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Easy Returns",
    description:
      "Not satisfied? Return within 7 days for a full refund. No questions asked, hassle-free process.",
    gradient: "from-teal-500 to-green-600",
  },
];

const WhyChooseUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BusinessEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-medium">
              Why plannix Store
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Event Success is
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Our Priority
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We go above and beyond to ensure your event is nothing short of
            spectacular
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              />

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-gray-700/30 rounded-tr-3xl group-hover:border-green-500/30 transition-colors" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-3xl border border-green-500/20">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to make your event unforgettable?
              </h3>
              <p className="text-gray-400">
                Browse our collection and get everything you need in one place.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all whitespace-nowrap"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default WhyChooseUs;
