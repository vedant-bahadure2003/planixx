import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Decorations",
    description: "Transform any space with our stunning decorative elements",
    icon: "✨",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80",
    items: ["Balloons", "Banners", "Centerpieces", "Table Settings"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 2,
    name: "Lighting",
    description: "Create the perfect ambiance with professional lighting",
    icon: "💡",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    items: ["Fairy Lights", "Spotlights", "LED Strips", "Chandeliers"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    name: "Furniture",
    description: "Premium furniture rentals for any occasion",
    icon: "🪑",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    items: ["Chairs", "Tables", "Sofas", "Bars & Counters"],
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    name: "Backdrops",
    description: "Stunning backdrops for memorable photo moments",
    icon: "🎨",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    items: ["Flower Walls", "Sequin Walls", "Custom Prints", "Fabric Drapes"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 5,
    name: "Florals",
    description: "Fresh and artificial floral arrangements",
    icon: "🌸",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
    items: ["Bouquets", "Centerpieces", "Arches", "Garlands"],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 6,
    name: "Audio & Visual",
    description: "Professional sound and display equipment",
    icon: "🎵",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    items: ["Speakers", "Projectors", "Screens", "Microphones"],
    color: "from-red-500 to-pink-600",
  },
  {
    id: 7,
    name: "Linens & Fabrics",
    description: "Quality textiles for elegant table settings",
    icon: "🎀",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    items: ["Tablecloths", "Napkins", "Chair Covers", "Runners"],
    color: "from-teal-500 to-green-600",
  },
  {
    id: 8,
    name: "Props & Accessories",
    description: "Fun props and accessories for themed events",
    icon: "🎭",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    items: ["Photo Props", "Signage", "Themed Items", "Party Favors"],
    color: "from-indigo-500 to-violet-600",
  },
];

const StoreCategories = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="categories"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-medium">
              Our Categories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything for Your
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Perfect Event
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse through our extensive collection of event supplies. From
            decorations to professional equipment, we have it all.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background image */}
              <div className="aspect-[4/5] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <span className="text-4xl mb-3 transform transition-transform duration-300 group-hover:scale-125 inline-block">
                    {category.icon}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Items list - shown on hover */}
                  <div
                    className={`flex flex-wrap gap-2 transition-all duration-300 ${
                      hoveredId === category.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {category.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default StoreCategories;
