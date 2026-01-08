import { Link } from "react-router-dom";

const StoreCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] border border-green-500/30 rounded-full" />
        <div className="absolute w-[500px] h-[500px] border border-emerald-500/30 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-green-500/30 rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Limited Time Offer
            </span>
          </div>

          {/* Main content */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              20% Off
            </span>{" "}
            on Your First Order
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers and experience the plannix Store
            difference. Use code{" "}
            <span className="text-green-400 font-semibold">plannix20</span> at
            checkout.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          
            <Link
              to="/"
              className="px-10 py-5 rounded-full border-2 border-white/20 text-white text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: "🔒", text: "Secure Payments" },
              { icon: "🚚", text: "Free Shipping 5000+" },
              { icon: "↩️", text: "7-Day Returns" },
              { icon: "💬", text: "24/7 Support" },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-400"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreCTA;
