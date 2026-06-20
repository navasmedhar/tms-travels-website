import { motion } from "motion/react";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Hill Stations", "Kerala", "Religious", "Coastal", "All India"];

const packages = [
  {
    id: 1,
    name: "Kodaikanal",
    subtitle: "Princess of Hill Stations",
    category: "Hill Stations",
    duration: "2–3 Days",
    distance: "200 km from Salem",
    rating: 4.9,
    reviews: 87,
    highlights: ["Coaker's Walk", "Bear Shola Falls", "Pillar Rocks"],
    image: "https://images.unsplash.com/photo-1621864634210-15ed9f6b915b?w=600&h=400&fit=crop&auto=format",
    tag: "Popular",
    tagColor: "#f97316",
  },
  {
    id: 2,
    name: "Ooty",
    subtitle: "Queen of Hill Stations",
    category: "Hill Stations",
    duration: "2–3 Days",
    distance: "160 km from Salem",
    rating: 4.8,
    reviews: 124,
    highlights: ["Nilgiri Mountain Railway", "Botanical Garden", "Ooty Lake"],
    image: "https://images.unsplash.com/photo-1772729756487-4f0169ee28e5?w=600&h=400&fit=crop&auto=format",
    tag: "Top Pick",
    tagColor: "#1a56db",
  },
  {
    id: 3,
    name: "Yercaud",
    subtitle: "Jewel of the South",
    category: "Hill Stations",
    duration: "1–2 Days",
    distance: "55 km from Salem",
    rating: 4.7,
    reviews: 63,
    highlights: ["Yercaud Lake", "Kiliyur Falls", "Lady's Seat"],
    image: "https://images.unsplash.com/photo-1616388969587-8196f32388b4?w=600&h=400&fit=crop&auto=format",
    tag: "Nearby",
    tagColor: "#10b981",
  },
  {
    id: 4,
    name: "Munnar",
    subtitle: "Tea Garden Paradise",
    category: "Hill Stations",
    duration: "3–4 Days",
    distance: "320 km from Salem",
    rating: 4.9,
    reviews: 110,
    highlights: ["Tea Plantations", "Eravikulam NP", "Mattupetty Dam"],
    image: "https://images.unsplash.com/photo-1658051161493-1d311c4c7b4d?w=600&h=400&fit=crop&auto=format",
    tag: "Scenic",
    tagColor: "#10b981",
  },
  {
    id: 5,
    name: "Valparai",
    subtitle: "Hidden Hill Gem",
    category: "Hill Stations",
    duration: "1–2 Days",
    distance: "180 km from Salem",
    rating: 4.7,
    reviews: 54,
    highlights: ["Monkey Falls", "Tea Estates", "Akkamalai"],
    image: "https://images.unsplash.com/photo-1723745390402-04eeda8b6444?w=600&h=400&fit=crop&auto=format",
    tag: "Off-beat",
    tagColor: "#7c3aed",
  },
  {
    id: 6,
    name: "Coorg",
    subtitle: "Scotland of India",
    category: "Hill Stations",
    duration: "2–3 Days",
    distance: "330 km from Salem",
    rating: 4.8,
    reviews: 76,
    highlights: ["Coffee Estates", "Abbey Falls", "Raja's Seat"],
    image: "https://images.unsplash.com/photo-1676140428072-62fa84ba5800?w=600&h=400&fit=crop&auto=format",
    tag: "Popular",
    tagColor: "#f97316",
  },
  {
    id: 7,
    name: "Kerala Tour",
    subtitle: "God's Own Country",
    category: "Kerala",
    duration: "4–5 Days",
    distance: "400 km from Salem",
    rating: 5.0,
    reviews: 98,
    highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach"],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop&auto=format",
    tag: "Premium",
    tagColor: "#7c3aed",
  },
  {
    id: 8,
    name: "Alleppey",
    subtitle: "Venice of the East",
    category: "Kerala",
    duration: "2–3 Days",
    distance: "450 km from Salem",
    rating: 4.9,
    reviews: 89,
    highlights: ["Houseboat Stay", "Backwater Cruise", "Vembanad Lake"],
    image: "https://images.unsplash.com/photo-1609828913552-f9138ed9e42d?w=600&h=400&fit=crop&auto=format",
    tag: "Romantic",
    tagColor: "#f97316",
  },
  {
    id: 9,
    name: "Tirupati Temple",
    subtitle: "Divine Pilgrimage",
    category: "Religious",
    duration: "2 Days",
    distance: "430 km from Salem",
    rating: 4.9,
    reviews: 156,
    highlights: ["Venkateswara Temple", "Tirumala Hills", "Padmavathi Temple"],
    image: "https://images.unsplash.com/photo-1578645546130-a8e4c5becb17?w=600&h=400&fit=crop&auto=format",
    tag: "Spiritual",
    tagColor: "#f59e0b",
  },
  {
    id: 10,
    name: "Madurai",
    subtitle: "Temple City of India",
    category: "Religious",
    duration: "1–2 Days",
    distance: "170 km from Salem",
    rating: 4.8,
    reviews: 134,
    highlights: ["Meenakshi Temple", "Thirumalai Nayakkar Palace", "Gandhi Museum"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop&auto=format",
    tag: "Must Visit",
    tagColor: "#f59e0b",
  },
  {
    id: 11,
    name: "Rameswaram",
    subtitle: "Island of Devotion",
    category: "Religious",
    duration: "2 Days",
    distance: "300 km from Salem",
    rating: 4.8,
    reviews: 98,
    highlights: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi"],
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop&auto=format",
    tag: "Pilgrimage",
    tagColor: "#f59e0b",
  },
  {
    id: 12,
    name: "Varanasi",
    subtitle: "Spiritual Capital of India",
    category: "Religious",
    duration: "3–4 Days",
    distance: "2,100 km from Salem",
    rating: 4.9,
    reviews: 67,
    highlights: ["Ganga Ghats", "Kashi Vishwanath", "Evening Aarti"],
    image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=600&h=400&fit=crop&auto=format",
    tag: "Sacred",
    tagColor: "#dc2626",
  },
  {
    id: 13,
    name: "Kanyakumari",
    subtitle: "Land's End of India",
    category: "Coastal",
    duration: "1–2 Days",
    distance: "490 km from Salem",
    rating: 4.7,
    reviews: 88,
    highlights: ["Sunrise & Sunset", "Vivekananda Rock", "Thiruvalluvar Statue"],
    image: "https://images.unsplash.com/photo-1773036221522-c99b359480b5?w=600&h=400&fit=crop&auto=format",
    tag: "Scenic",
    tagColor: "#0ea5e9",
  },
  {
    id: 14,
    name: "Pondicherry",
    subtitle: "French Riviera of the East",
    category: "Coastal",
    duration: "2 Days",
    distance: "230 km from Salem",
    rating: 4.7,
    reviews: 72,
    highlights: ["French Quarter", "Auroville", "Promenade Beach"],
    image: "https://images.unsplash.com/photo-1588623598822-9ff0cd048b8a?w=600&h=400&fit=crop&auto=format",
    tag: "Charming",
    tagColor: "#0ea5e9",
  },
  {
    id: 15,
    name: "Goa",
    subtitle: "Beach Paradise of India",
    category: "Coastal",
    duration: "4–5 Days",
    distance: "880 km from Salem",
    rating: 4.8,
    reviews: 115,
    highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"],
    image: "https://images.unsplash.com/photo-1727276883315-53b22b811f43?w=600&h=400&fit=crop&auto=format",
    tag: "Beach Fun",
    tagColor: "#0ea5e9",
  },
  {
    id: 16,
    name: "South India Tour",
    subtitle: "Cultural Heritage Trail",
    category: "All India",
    duration: "7–10 Days",
    distance: "Pan South India",
    rating: 4.8,
    reviews: 42,
    highlights: ["Chennai", "Madurai", "Kanyakumari", "Rameswaram"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop&auto=format",
    tag: "Best Seller",
    tagColor: "#1a56db",
  },
  {
    id: 17,
    name: "Rajasthan Tour",
    subtitle: "Land of Kings",
    category: "All India",
    duration: "7–8 Days",
    distance: "2,000 km from Salem",
    rating: 4.9,
    reviews: 38,
    highlights: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
    image: "https://images.unsplash.com/photo-1635929620316-d34cecc5639b?w=600&h=400&fit=crop&auto=format",
    tag: "Royal",
    tagColor: "#f59e0b",
  },
  {
    id: 18,
    name: "Golden Triangle",
    subtitle: "Delhi · Agra · Jaipur",
    category: "All India",
    duration: "5–6 Days",
    distance: "2,200 km from Salem",
    rating: 4.8,
    reviews: 55,
    highlights: ["Taj Mahal", "Red Fort", "Amber Fort"],
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop&auto=format",
    tag: "Classic",
    tagColor: "#1a56db",
  },
];

export function TourPackages() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? packages : packages.filter((p) => p.category === active);

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase"
            style={{ background: "#fff3e8", color: "#f97316" }}
          >
            Tour Packages
          </div>
          <h2
            className="text-[#0d1b2a] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Popular <span style={{ color: "#1a56db" }}>Destinations</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            Handpicked travel packages from Salem to India's most breathtaking destinations. Customised for families, couples, friends, and corporate groups.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: active === cat ? "#1a56db" : "#f0f4ff",
                color: active === cat ? "#fff" : "#5a6e8a",
                boxShadow: active === cat ? "0 4px 12px rgba(26,86,219,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Package grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "rgba(26,86,219,0.08)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.6), transparent 50%)" }} />
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: pkg.tagColor }}
                >
                  {pkg.tag}
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>{pkg.name}</div>
                  <div className="text-white/80 text-xs">{pkg.subtitle}</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 text-xs text-[#5a6e8a]">
                  <span className="flex items-center gap-1"><Clock size={11} /> {pkg.duration}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {pkg.distance}</span>
                  <span className="flex items-center gap-1">
                    <Star size={11} fill="#f59e0b" className="text-amber-400" />
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.highlights.map((h) => (
                    <span key={h} className="px-2 py-0.5 rounded-md text-xs"
                      style={{ background: "#f0f4ff", color: "#1a56db" }}>
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  onClick={scrollToBooking}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #1a56db, #1040b0)", color: "white" }}
                >
                  Enquire Now
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All India banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #1a56db 0%, #0d3a9e 60%, #0d1b2a 100%)" }}
        >
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>All India Tour Packages</h3>
            <p className="text-white/75 text-sm">Rajasthan, Himachal, Goa, North East, and more — we drive you anywhere in India with All India Permit vehicles.</p>
          </div>
          <button
            onClick={scrollToBooking}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0d1b2a] transition-all hover:scale-105 active:scale-95"
            style={{ background: "#f97316", color: "white" }}
          >
            Plan Your Trip <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
