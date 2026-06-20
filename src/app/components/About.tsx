import { motion } from "motion/react";
import { Shield, Star, Clock, Award } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Safe Travel", desc: "Verified drivers, GPS-tracked vehicles" },
  { icon: Star, label: "Top Rated", desc: "500+ satisfied customers across Tamil Nadu" },
  { icon: Clock, label: "24/7 Support", desc: "Always available for your journey needs" },
  { icon: Award, label: "All India Permit", desc: "Licensed to travel anywhere in India" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1622779100968-f38ad2954a0d?w=700&h=525&fit=crop&auto=format"
              alt="Beautiful mountain landscape in Tamil Nadu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,86,219,0.15), transparent)" }} />
          </div>
          {/* Floating card */}
          <div
            className="absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-xl border border-white/80 backdrop-blur-sm"
            style={{ background: "white" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #1a56db, #f97316)" }}>
                <Award size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[#0d1b2a] text-sm">Trusted Since 2010</div>
                <div className="text-xs text-[#5a6e8a]">16+ Years of Excellence</div>
              </div>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full -z-10"
            style={{ background: "#e8f0fe" }} />
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-wide uppercase"
            style={{ background: "#e8f0fe", color: "#1a56db" }}
          >
            About TMS Travels
          </div>

          <h2
            className="text-[#0d1b2a] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Your Trusted Travel Partner from{" "}
            <span style={{ color: "#1a56db" }}>Salem</span>
          </h2>

          <p className="text-[#5a6e8a] leading-relaxed mb-4">
            TMS Travels is a premier vehicle rental and tour service based in Thammampatty, Salem, Tamil Nadu. For over a decade, we have been delivering safe, comfortable, and affordable travel experiences to thousands of happy customers.
          </p>
          <p className="text-[#5a6e8a] leading-relaxed mb-8">
            Whether you're planning a family getaway to Ooty, a spiritual journey to Tirupati, a romantic honeymoon escape to Kerala, or a corporate outing — our professional team ensures every trip is seamless and memorable.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl border transition-colors hover:border-[#1a56db]/20"
                style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.08)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #e8f0fe, #dbeafe)" }}>
                  <Icon size={17} style={{ color: "#1a56db" }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0d1b2a]">{label}</div>
                  <div className="text-xs text-[#5a6e8a] mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
