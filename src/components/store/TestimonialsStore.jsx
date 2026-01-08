import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Meera Krishnan",
    role: "Wedding Planner",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
    content:
      "Plannix Store ne meri wedding planning business ko next level pe le jaaya! From sangeet decorations to mandap setup - sab kuch top quality mila. Clients itne khush hote hain, referrals aate rehte hain!",
    rating: 5,
    event: "150+ Shaadis",
  },
  {
    id: 2,
    name: "Arjun Deshmukh",
    role: "Corporate Event Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    content:
      "Humari company ke annual day se lekar client meets tak, sab events ke liye Plannix Store hi use karte hain. Professional service, time pe delivery, aur budget mein best quality - kya chahiye aur!",
    rating: 5,
    event: "75+ Corporate Events",
  },
  {
    id: 3,
    name: "Kavitha Nair",
    role: "Birthday Party Host",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content:
      "Beti ki first birthday ke liye yahan se decorations liye the - balloon arch itna sundar tha ki sab pooch rahe the kahan se liya! Setup bhi bahut easy tha. Definitely recommending to all my society friends!",
    rating: 5,
    event: "Family Celebration",
  },
  {
    id: 4,
    name: "Rajesh Iyer",
    role: "Event Decorator",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content:
      "Chennai mein 10 saal se event decoration kar raha hoon. Plannix Store se better supplier nahi mila. Diwali parties, haldi ceremonies, naming ceremonies - har event ke liye perfect supplies milte hain!",
    rating: 5,
    event: "300+ Decorations",
  },
];

const TestimonialsStore = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-medium">
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Event Planners
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 relative">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 text-green-500/20">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute inset-0"
                }`}
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-green-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    : "w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() =>
              setActiveIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "50K+", label: "Products Delivered" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStore;
