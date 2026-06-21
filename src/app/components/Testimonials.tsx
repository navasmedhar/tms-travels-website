import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AVATAR_COLORS = ["#1a56db", "#f97316", "#10b981", "#7c3aed", "#0ea5e9", "#dc2626"];

function getInitials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name) {
  const sum = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function formatReviewDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchReviews() {
      try {
        const res = await fetch(`${API_URL}/api/reviews?limit=20`);
        const data = await res.json();
        if (!cancelled && data.success) {
          setReviews(data.reviews || []);
        }
      } catch {
        // Silently fail — testimonials just won't show, rest of the site still works
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReviews();
    return () => { cancelled = true; };
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

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

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16 text-[#5a6e8a] text-sm">Loading reviews…</div>
        )}

        {/* Empty state */}
        {!loading && reviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 px-8 rounded-2xl max-w-xl mx-auto"
            style={{ background: "#f8faff", border: "1px solid rgba(26,86,219,0.1)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "#e8f0fe" }}
            >
              <Quote size={20} style={{ color: "#1a56db" }} />
            </div>
            <h3 className="font-semibold text-[#0d1b2a] mb-2">Be the first to share your experience!</h3>
            <p className="text-sm text-[#5a6e8a]">
              We're just getting started collecting reviews. Travelled with us recently? We'd love to hear about it.
            </p>
          </motion.div>
        )}

        {/* Reviews grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((t, i) => (
              <motion.div
                key={t._id}
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
                    style={{ background: getAvatarColor(t.name) }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#0d1b2a]">{t.name}</div>
                    <div className="text-xs text-[#5a6e8a]">
                      {t.trip}{t.trip && t.location ? " · " : ""}{t.location}
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-[#5a6e8a]">{formatReviewDate(t.createdAt)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Overall rating */}
        {!loading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 px-8 rounded-2xl"
            style={{ background: "#f8faff", border: "1px solid rgba(26,86,219,0.1)" }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-[#0d1b2a]" style={{ fontFamily: "var(--font-display)" }}>
                {avgRating}
              </div>
              <StarRating rating={Math.round(Number(avgRating))} />
              <div className="text-xs text-[#5a6e8a] mt-1">Average Rating</div>
            </div>
            <div className="w-px h-16 hidden sm:block" style={{ background: "rgba(26,86,219,0.1)" }} />
            <div className="text-center sm:text-left">
              <div className="font-bold text-[#0d1b2a] mb-1">
                Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </div>
              <p className="text-sm text-[#5a6e8a]">From verified customers across Tamil Nadu.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}