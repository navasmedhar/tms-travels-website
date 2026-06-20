import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Salem",
    trip: "Ooty Family Trip",
    rating: 5,
    review: "Absolutely wonderful experience! The driver was very professional and the 7-seater Innova was spotless. My entire family felt safe and comfortable throughout the Ooty trip. Will definitely book again!",
    avatar: "RK",
    avatarColor: "#1a56db",
    date: "March 2024",
  },
  {
    id: 2,
    name: "Priya Subramaniam",
    location: "Erode",
    trip: "Honeymoon Kerala Tour",
    rating: 5,
    review: "TMS Travels made our honeymoon trip to Kerala absolutely magical. The vehicle was luxurious, the driver was knowledgeable about all the spots, and the pricing was very reasonable. Highly recommend!",
    avatar: "PS",
    avatarColor: "#f97316",
    date: "January 2024",
  },
  {
    id: 3,
    name: "Karthikeyan M",
    location: "Namakkal",
    trip: "Corporate Office Trip",
    rating: 5,
    review: "We hired a 15-seater AC van for our company team outing to Kodaikanal. The vehicle was perfectly maintained and the driver was punctual and courteous. Our entire team had a great time!",
    avatar: "KM",
    avatarColor: "#10b981",
    date: "February 2024",
  },
  {
    id: 4,
    name: "Lakshmi Devi",
    location: "Salem",
    trip: "Tirupati Pilgrimage",
    rating: 5,
    review: "Booked for our family pilgrimage to Tirupati. The driver knew all the routes well, helped with local guidance, and made the journey very comfortable. Truly a trustworthy travel partner!",
    avatar: "LD",
    avatarColor: "#7c3aed",
    date: "April 2024",
  },
  {
    id: 5,
    name: "Murugan Selvam",
    location: "Dharmapuri",
    trip: "College IV Trip",
    rating: 5,
    review: "Arranged 2 vans for our college industrial visit. Everything was on time, the vehicles were in great condition, and the students were happy. TMS Travels is our go-to for all college tours!",
    avatar: "MS",
    avatarColor: "#0ea5e9",
    date: "May 2024",
  },
  {
    id: 6,
    name: "Anitha Rajan",
    location: "Coimbatore",
    trip: "Friends Goa Trip",
    rating: 4,
    review: "Our group of friends booked a 7-seater for an airport drop and long trip. Very smooth booking process via WhatsApp, the car was clean, driver was friendly. Great value for money!",
    avatar: "AR",
    avatarColor: "#dc2626",
    date: "June 2024",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < rating ? "#f59e0b" : "none"}
          className={i < rating ? "text-amber-400" : "text-gray-300"} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
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
            style={{ background: "#fff3e8", color: "#f97316" }}
          >
            Testimonials
          </div>
          <h2
            className="text-[#0d1b2a] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            What Our Customers <span style={{ color: "#1a56db" }}>Say</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            Real experiences from real travellers. Join our growing family of happy customers across Tamil Nadu.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300"
              style={{ borderColor: "rgba(26,86,219,0.08)" }}
            >
              {/* Quote icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#e8f0fe" }}
              >
                <Quote size={14} style={{ color: "#1a56db" }} />
              </div>

              <StarRating rating={t.rating} />

              <p className="mt-3 text-sm text-[#5a6e8a] leading-relaxed line-clamp-4">
                "{t.review}"
              </p>

              <div className="mt-4 pt-4 border-t flex items-center gap-3"
                style={{ borderColor: "rgba(26,86,219,0.07)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0d1b2a]">{t.name}</div>
                  <div className="text-xs text-[#5a6e8a]">{t.trip} · {t.location}</div>
                </div>
                <div className="ml-auto text-xs text-[#5a6e8a]">{t.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 px-8 rounded-2xl"
          style={{ background: "#f8faff", border: "1px solid rgba(26,86,219,0.1)" }}
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-[#0d1b2a]" style={{ fontFamily: "var(--font-display)" }}>4.9</div>
            <StarRating rating={5} />
            <div className="text-xs text-[#5a6e8a] mt-1">Average Rating</div>
          </div>
          <div className="w-px h-16 hidden sm:block" style={{ background: "rgba(26,86,219,0.1)" }} />
          <div className="text-center sm:text-left">
            <div className="font-bold text-[#0d1b2a] mb-1">Based on 500+ reviews</div>
            <p className="text-sm text-[#5a6e8a]">From Google, WhatsApp, and direct customer feedback.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
