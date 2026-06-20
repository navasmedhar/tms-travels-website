import { motion } from "motion/react";
import { Users, Thermometer, Star, CheckCircle } from "lucide-react";

const vehicles = [
  {
    name: "4 Seater Car",
    type: "Sedan / Hatchback",
    seats: 4,
    ac: true,
    image: "https://images.unsplash.com/photo-1559385072-5adb2c4fc83f?w=600&h=400&fit=crop&auto=format",
    features: ["GPS Navigation", "Music System", "Comfortable Seats"],
    badge: "Budget Friendly",
    badgeColor: "#10b981",
    priceFrom: "₹2,000/day",
  },
  {
    name: "7 Seater SUV",
    type: "Innova / Ertiga",
    seats: 7,
    ac: true,
    image: "https://images.unsplash.com/photo-1529369623266-f5264b696110?w=600&h=400&fit=crop&auto=format",
    features: ["Spacious Boot", "GPS Navigation", "Premium Seats"],
    badge: "Most Popular",
    badgeColor: "#1a56db",
    priceFrom: "₹2,700/day",
  },
  {
    name: "15 Seater AC Van",
    type: "Force Traveller / AC",
    seats: 15,
    ac: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop&auto=format",
    features: ["Full AC", "Push-back Seats", "Luggage Space"],
    badge: "Group Travel",
    badgeColor: "#f97316",
    priceFrom: "₹5,000/day",
  },
  {
    name: "20 Seater Van",
    type: "Mini Bus",
    seats: 20,
    ac: false,
    image: "https://images.unsplash.com/photo-1567604804217-9be3addbd802?w=600&h=400&fit=crop&auto=format",
    features: ["Large Capacity", "Storage Space", "Comfort Seats"],
    badge: "Best Value",
    badgeColor: "#7c3aed",
    priceFrom: "₹6,000/day",
  },
];

export function Fleet() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fleet" className="py-24 overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase"
            style={{ background: "#e8f0fe", color: "#1a56db" }}
          >
            Our Fleet
          </div>
          <h2
            className="text-[#0d1b2a] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Choose Your <span style={{ color: "#f97316" }}>Perfect Vehicle</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            From cozy sedans for couples to large vans for group tours — we have the right vehicle for every trip size and budget.
          </p>
        </motion.div>

        {/* Vehicle grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "rgba(26,86,219,0.08)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.5), transparent 60%)" }} />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: v.badgeColor }}
                >
                  {v.badge}
                </div>
                {v.ac && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ background: "rgba(13,27,42,0.6)", backdropFilter: "blur(4px)" }}>
                    <Thermometer size={10} />
                    AC
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-[#0d1b2a]" style={{ fontSize: "1rem" }}>{v.name}</h3>
                    <p className="text-xs text-[#5a6e8a]">{v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#5a6e8a]">
                    <Users size={13} />
                    {v.seats}
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  {v.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#5a6e8a]">
                      <CheckCircle size={12} style={{ color: "#1a56db", flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(26,86,219,0.08)" }}>
                  <div>
                    <div className="text-xs text-[#5a6e8a]">Starting from</div>
                    <div className="font-bold text-[#1a56db]">{v.priceFrom}</div>
                  </div>
                  <button
                    onClick={scrollToBooking}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #f97316, #ea6000)" }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rental types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Day Rental", desc: "Flexible hourly & full-day packages", icon: "🌅" },
            { label: "Weekly Rental", desc: "Best rates for 3–7 day journeys", icon: "📅" },
            { label: "Monthly Rental", desc: "Dedicated vehicle for long-term needs", icon: "🗓️" },
          ].map((r) => (
            <div key={r.label}
              className="flex items-center gap-3 p-4 rounded-xl border bg-white"
              style={{ borderColor: "rgba(26,86,219,0.1)" }}>
              <span className="text-2xl">{r.icon}</span>
              <div>
                <div className="font-semibold text-sm text-[#0d1b2a]">{r.label}</div>
                <div className="text-xs text-[#5a6e8a]">{r.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
