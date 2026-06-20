import { motion } from "motion/react";
import { Phone, Calendar, MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background: photo collage grid */}
      <div className="absolute inset-0 bg-[#0d1b2a] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0.5 opacity-70">
          {[
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1587307519295-2605c1396225?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1622779100968-f38ad2954a0d?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1621864634210-15ed9f6b915b?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1635929620316-d34cecc5639b?w=500&h=400&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1609828913552-f9138ed9e42d?w=500&h=400&fit=crop&auto=format",
          ].map((url, i) => (
            <div key={i} className="w-full h-full overflow-hidden">
              <img src={url} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </div>
          ))}
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,27,42,0.88) 0%, rgba(13,27,42,0.65) 50%, rgba(13,27,42,0.80) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.95) 0%, transparent 60%)" }} />
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute top-32 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#f97316" }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#1a56db" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: headline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-6"
            style={{ background: "rgba(249,115,22,0.18)", color: "#fbbf80", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <MapPin size={12} />
            Thammampatty, Salem · Tamil Nadu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          >
            Explore India with{" "}
            <span style={{ color: "#f97316" }}>TMS Travels</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/75 mb-8 max-w-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Comfortable Cars & Vans for Every Journey — from peaceful hill stations to sacred temples, across all of India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#booking")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f97316, #ea6000)", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}
            >
              <Calendar size={18} />
              Book Now
            </button>
            <a
              href="tel:7402233588"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border border-white/30 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Phone size={18} />
              Call Now
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-8 mt-12"
          >
            {[
              { value: "500+", label: "Happy Customers" },
              { value: "16+", label: "Years Experience" },
              { value: "4", label: "Vehicle Types" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: quick info card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.15)" }}>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Our Services</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🚗", label: "4 Seater Cars" },
                { icon: "🚙", label: "7 Seater SUVs" },
                { icon: "🚐", label: "15 Seater AC Van" },
                { icon: "🚌", label: "20 Seater Van" },
                { icon: "✈️", label: "Airport Pickup" },
                { icon: "🛕", label: "Temple Tours" },
                { icon: "💍", label: "Honeymoon Trips" },
                { icon: "🗺️", label: "All India Tours" },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/85 transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <a
                href="https://wa.me/917402233588"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-[1.02]"
                style={{ background: "#25D366" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors z-10"
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
