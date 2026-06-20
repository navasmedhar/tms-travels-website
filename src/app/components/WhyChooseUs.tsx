import { motion } from "motion/react";
import { Users, Shield, IndianRupee, Headphones, MapPin, Star, Clock, Car } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Experienced Drivers",
    desc: "Our drivers have 5+ years of experience and know every road — from city streets to mountain passes.",
    color: "#1a56db",
    bg: "#e8f0fe",
  },
  {
    icon: Car,
    title: "Clean Vehicles",
    desc: "Every vehicle is thoroughly sanitised and maintained before each trip for your comfort and safety.",
    color: "#10b981",
    bg: "#d1fae5",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    desc: "Transparent, no-hidden-cost pricing. Day, weekly, and monthly rentals to suit every budget.",
    color: "#f97316",
    bg: "#fff3e8",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock customer support via call and WhatsApp for any assistance on your journey.",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    desc: "GPS-enabled vehicles, insured fleet, and emergency contact — your safety is our top priority.",
    color: "#dc2626",
    bg: "#fee2e2",
  },
  {
    icon: MapPin,
    title: "All India Permit",
    desc: "Licensed to travel across all Indian states. One company for all your national travel needs.",
    color: "#0ea5e9",
    bg: "#e0f2fe",
  },
  {
    icon: Star,
    title: "Personalized Service",
    desc: "Custom itineraries, flexible pickups, and travel plans tailored exactly to your preferences.",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  {
    icon: Clock,
    title: "Punctual & Reliable",
    desc: "On-time pickups and drop-offs guaranteed. We respect your time as much as you do.",
    color: "#1a56db",
    bg: "#e8f0fe",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
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
            Why Choose Us
          </div>
          <h2
            className="text-[#0d1b2a] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            The TMS Travels <span style={{ color: "#f97316" }}>Difference</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            More than just a ride — we create travel experiences that you'll remember for a lifetime.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group p-5 rounded-2xl bg-white border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(26,86,219,0.08)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-bold text-[#0d1b2a] text-sm mb-2">{title}</h3>
              <p className="text-xs text-[#5a6e8a] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "16+", label: "Years in Business" },
            { value: "50+", label: "Destinations Covered" },
            { value: "4.9★", label: "Average Rating" },
          ].map(({ value, label }) => (
            <div key={label}
              className="text-center py-6 px-4 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #1a56db, #1040b0)" }}>
              <div
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </div>
              <div className="text-xs text-white/70">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
