import { useState, useEffect } from "react";
import AppComingSoonModal from "../common/AppComingSoonModal";

// Event card data for the carousel rows with real images
const eventCards = {
  row1: [
    {
      id: 1,
      title: "Wedding",
      color: "from-rose-400 to-pink-500",
      image:
        "https://www.candidshutters.com/maintenance/wp-content/uploads/2024/06/Best-wedding-photographers-India-Top-5-destination-wedding-photographers-Indian-weddings-2.jpg",
    },
    {
      id: 2,
      title: "Birthday",
      color: "from-amber-400 to-orange-500",
      image:
        "https://thumbs.dreamstime.com/b/kids-celebrating-birthday-party-blowing-group-joyful-little-candles-cake-holidays-concept-48869522.jpg",
    },
    {
      id: 3,
      title: "Anniversary",
      color: "from-red-400 to-rose-500",
      image:
        "https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/Celebrate+Anniversary+travel/cvr.jpg",
    },
    {
      id: 4,
      title: "Corporate",
      color: "from-blue-400 to-indigo-500",
      image:
        "https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/Celebrate+Anniversary+travel/cvr.jpg",
    },
    {
      id: 5,
      title: "Graduation",
      color: "from-emerald-400 to-teal-500",
      image:
        "https://img.freepik.com/free-photo/group-diverse-grads-throwing-caps-up-sky_53876-56031.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 6,
      title: "Baby Shower",
      color: "from-pink-400 to-fuchsia-500",
      image:
        "https://deluxebanquethall.com/wp-content/uploads/2015/02/De-Luxe-Baby-Shower-Group-Photo.jpg",
    },
    {
      id: 7,
      title: "Engagement",
      color: "from-violet-400 to-purple-500",
      image:
        "https://img.weddingbazaar.com/photos/pictures/000/824/474/new_medium/knots_in_focus.jpg?1556090551",
    },
    {
      id: 8,
      title: "Reunion",
      color: "from-cyan-400 to-blue-500",
      image:
        "https://thumbs.dreamstime.com/b/outdoor-lunch-friends-cheers-champagne-reunion-party-social-event-celebration-food-group-people-toast-398862899.jpg",
    },
  ],
  row2: [
    {
      id: 1,
      title: "House Party",
      color: "from-fuchsia-400 to-pink-500",
      image:
        "https://thumbs.dreamstime.com/b/tipsy-friends-messy-living-room-wild-house-party-three-stylish-relaxing-couch-blond-haired-women-teddy-bear-87426355.jpg",
    },
    {
      id: 2,
      title: "Festive",
      color: "from-yellow-400 to-amber-500",
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/photo_gallery/202312/reuters-rtssj0i6.jpg?VersionId=4NF7.7JW2TCSrIrOTzwNVvlNYc_hLOwI",
    },
    {
      id: 3,
      title: "Concert",
      color: "from-purple-400 to-indigo-500",
      image:
        "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 4,
      title: "Exhibition",
      color: "from-teal-400 to-cyan-500",
      image:
        "https://media.istockphoto.com/id/526927807/photo/outdoor-art-gallery-on-union-square-san-francisco.jpg?s=612x612&w=0&k=20&c=5pEW8tcAfY4Vvp7CYC8PqjFiAz4fK8kN91NJj5cCFTA=",
    },
    {
      id: 5,
      title: "Seminar",
      color: "from-slate-400 to-gray-500",
      image:
        "https://www.shutterstock.com/image-photo/speaker-giving-talk-on-corporate-260nw-2348665423.jpg",
    },
    {
      id: 6,
      title: "Workshop",
      color: "from-orange-400 to-red-500",
      image:
        "https://thumbs.dreamstime.com/b/welcome-handshake-meeting-business-women-office-workshop-success-celebration-applause-intro-winner-people-shaking-369366284.jpg",
    },
    {
      id: 7,
      title: "Charity",
      color: "from-green-400 to-emerald-500",
      image:
        "https://media.istockphoto.com/id/1436319269/vector/group-of-diverse-people-with-arms-and-hands-raised-towards-a-hand-painted-heart-charity.jpg?s=612x612&w=0&k=20&c=gZdRZiNly1HoX4k0Qa8LnlTOD6fjjHSm_haq7pizYD4=",
    },
    {
      id: 8,
      title: "Launch",
      color: "from-indigo-400 to-violet-500",
      image:
        "https://www.getyourvenue.com/uploads/allied-service/40/service-main1.jpg",
    },
  ],
  row3: [
    {
      id: 1,
      title: "Mehndi",
      color: "from-green-400 to-teal-500",
      image:
        "https://sadafindia.com/wp-content/uploads/2023/09/Henna-Party-Photo-1-1024x683.jpeg",
    },
    {
      id: 2,
      title: "Sangeet",
      color: "from-pink-400 to-rose-500",
      image:
        "https://www.linandjirsa.com/wp-content/uploads/sangeet-at-terranea-resort.jpg",
    },
    {
      id: 3,
      title: "Haldi",
      color: "from-yellow-400 to-orange-500",
      image:
        "https://media.istockphoto.com/id/2119243529/photo/bride-is-seated-beneath-phoolon-ki-chadar-during-her-haldi-ceremony-as-a-part-of-the-ritual.jpg?s=612x612&w=0&k=20&c=tFH0dDwDldTuGkzeKKzaZeY09Og_2rNQeMDJUxFkcKE=",
    },
    {
      id: 4,
      title: "Reception",
      color: "from-purple-400 to-fuchsia-500",
      image:
        "https://i.pinimg.com/736x/b4/67/e5/b467e5d35b3e625e7b9e96395aac4155.jpg",
    },
    {
      id: 5,
      title: "Kitty Party",
      color: "from-rose-400 to-pink-500",
      image:
        "https://www.sloshout.com/blog/wp-content/uploads/Untitled-design-5_11zon-6.jpg",
    },
    {
      id: 6,
      title: "Pool Party",
      color: "from-cyan-400 to-blue-500",
      image:
        "https://www.sloshout.com/blog/wp-content/uploads/Untitled-design-5_11zon-6.jpg",
    },
    {
      id: 7,
      title: "Theme Party",
      color: "from-violet-400 to-indigo-500",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Farewell",
      color: "from-amber-400 to-yellow-500",
      image:
        "https://t4.ftcdn.net/jpg/15/71/46/93/360_F_1571469397_HH26CX7hAekT9sgeYrvK8bUqxzrw6vUm.jpg",
    },
  ],
  row4: [
    {
      id: 1,
      title: "Puja",
      color: "from-orange-400 to-amber-500",
      image:
        "https://t4.ftcdn.net/jpg/15/71/46/93/360_F_1571469397_HH26CX7hAekT9sgeYrvK8bUqxzrw6vUm.jpg",
    },
    {
      id: 2,
      title: "Naming Ceremony",
      color: "from-sky-400 to-blue-500",
      image:
        "https://giftlaya.com/_next/image?url=https%3A%2F%2Fcdn.giftlaya.com%2Fimages%2F62%2F26ce769d-d3ab-405e-aff4-447d016498b0.webp&w=3840&q=75",
    },
    {
      id: 3,
      title: "Retirement",
      color: "from-emerald-400 to-green-500",
      image: "https://thumbs.dreamstime.com/b/retirement-party-62558274.jpg",
    },
    {
      id: 4,
      title: "Sports Day",
      color: "from-red-400 to-orange-500",
      image:
        "https://media.istockphoto.com/id/466335022/photo/space-hopper-challenge.jpg?s=612x612&w=0&k=20&c=nEqdwhaLdW7FU3l1nDi5jvCIH8pWHj94zKiBrsXuB68=",
    },
    {
      id: 5,
      title: "Award Night",
      color: "from-yellow-400 to-amber-500",
      image:
        "https://camo.envatousercontent.com/3641e902d71b12171b47c1836d1da794b4f5c7c2/68747470733a2f2f692e696d6775722e636f6d2f6638573651614e2e6a7067",
    },
    {
      id: 6,
      title: "Networking",
      color: "from-blue-400 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Fashion Show",
      color: "from-fuchsia-400 to-purple-500",
      image:
        "https://upinternationaltradeshow.com/wp-content/uploads/2025/03/IMG-20240922-WA0028-scaled-1-1024x683.jpg",
    },
    {
      id: 8,
      title: "Food Fest",
      color: "from-lime-400 to-green-500",
      image:
        "https://blog.italotreno.com/wp-content/uploads/2025/05/summer-food-festivals-italy.jpg",
    },
  ],
};

// Carousel Row Component
const CarouselRow = ({ cards, direction = "left", speed = 30 }) => {
  // Duplicate the cards for seamless ping-pong scroll
  const doubleCards = [...cards, ...cards];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-4 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubleCards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="flex-shrink-0 w-52 h-36 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group relative"
          >
            {/* Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-white font-semibold text-lg drop-shadow-lg">
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Headlines for rotation animation
const headlines = [
  {
    text: "Your perfect event starts with",
    highlight: "plannix",
  },
  {
    text: "Design AI Enabled",
    highlight: "Business Webpage",
  },
  {
    text: "Event specific webpage with",
    highlight: "Booking",
  },
];

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Rotate headlines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        setIsAnimating(false);
      }, 500); // Half of animation duration for smooth transition
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-emerald-600/20 animate-pulse" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Carousel Background */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-70">
        <div className="space-y-4 py-8">
          <CarouselRow cards={eventCards.row1} direction="left" speed={40} />
          <CarouselRow cards={eventCards.row2} direction="right" speed={45} />
          <CarouselRow cards={eventCards.row3} direction="left" speed={42} />
          <CarouselRow cards={eventCards.row4} direction="right" speed={48} />
        </div>
      </div>

      {/* Gradient Overlays for Fade Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        {/* Logo Badge */}
        <div className="mb-6 animate-bounce-slow">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <div className="w-8 h-8 p-1 rounded-lg bg-gradient-to-br from-gray-800 to-gray-500 flex items-center justify-center">
              <img src="/images/plannix-logo.png" className="" />
            </div>
            <span className="text-white/90 text-sm font-medium">plannix</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20 transform hover:scale-[1.02] transition-all duration-500">
            {/* Animated Headline */}
            <div className="h-[120px] md:h-[150px] overflow-hidden relative">
              <h1
                className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? "opacity-0 transform -translate-y-4"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                {headlines[currentHeadline].text}{" "}
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 bg-clip-text text-transparent">
                  {headlines[currentHeadline].highlight}
                </span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg mb-2">
              Plan any event – weddings, birthdays, parties & more.
            </p>
            <p className="text-gray-500 text-base">
              Create stunning event websites in minutes. What are you
              celebrating?
            </p>
          </div>

          {/* CTA Card */}
          <div className="mt-4 bg-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/30">
            <h2 className="text-white text-xl font-semibold mb-1">
              Start planning for free
            </h2>
            <p className="text-gray-400 text-sm mb-5">
              Get your event website ready in under 5 minutes.
            </p>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Google Play Store Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-gray-600 hover:scale-105 transition-all duration-300 group"
              >
                <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#ffffff"/>
                </svg>
                <div className="text-left">
                  <p className="text-gray-400 text-xs">GET IT ON</p>
                  <p className="text-white font-semibold text-sm">Google Play</p>
                </div>
              </button>

              {/* Apple App Store Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-gray-600 hover:scale-105 transition-all duration-300 group"
              >
                <svg className="w-8 h-8" viewBox="0 0 384 512" fill="#ffffff">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left">
                  <p className="text-gray-400 text-xs">Download on the</p>
                  <p className="text-white font-semibold text-sm">App Store</p>
                </div>
              </button>
            </div>

            <p className="text-gray-500 text-xs mt-4 text-center">
              Available on iOS and Android devices
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>100+ templates</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50
       to-transparent pointer-events-none"
      />
    </section>

      {/* App Coming Soon Modal */}
      <AppComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
