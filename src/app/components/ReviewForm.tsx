import { useState } from "react";
import { motion } from "motion/react";
import { Star, Send, CheckCircle2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function ReviewForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    trip: "",
    mobile: "",
    review: "",
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!form.name.trim() || !form.review.trim()) {
      setError("Please fill in your name and review.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Unable to submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-16 bg-[#f8faff]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-10 rounded-2xl bg-white border"
            style={{ borderColor: "rgba(26,86,219,0.08)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#dcfce7" }}
            >
              <CheckCircle2 size={26} style={{ color: "#15803d" }} />
            </div>
            <h3 className="font-bold text-lg text-[#0d1b2a] mb-2">Thank you!</h3>
            <p className="text-sm text-[#5a6e8a]">
              Your review has been submitted and will appear on our site once it's been reviewed by our team.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f8faff]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3
            className="text-[#0d1b2a] mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
          >
            Share Your Experience
          </h3>
          <p className="text-sm text-[#5a6e8a]">
            Travelled with TMS Travels? We'd love to hear how it went.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-white border space-y-4"
          style={{ borderColor: "rgba(26,86,219,0.08)" }}
        >
          {/* Star rating picker */}
          <div>
            <label className="block text-xs font-semibold text-[#5a6e8a] mb-2 uppercase tracking-wide">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                >
                  <Star
                    size={28}
                    fill={n <= (hoverRating || rating) ? "#f59e0b" : "none"}
                    className={n <= (hoverRating || rating) ? "text-amber-400" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a6e8a] mb-1.5 uppercase tracking-wide">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none focus:border-[#1a56db] transition-colors"
                style={{ borderColor: "rgba(26,86,219,0.15)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5a6e8a] mb-1.5 uppercase tracking-wide">
                Your Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                maxLength={100}
                placeholder="e.g. Salem"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none focus:border-[#1a56db] transition-colors"
                style={{ borderColor: "rgba(26,86,219,0.15)" }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a6e8a] mb-1.5 uppercase tracking-wide">
                Trip Type
              </label>
              <input
                type="text"
                name="trip"
                value={form.trip}
                onChange={handleChange}
                maxLength={150}
                placeholder="e.g. Ooty Family Trip"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none focus:border-[#1a56db] transition-colors"
                style={{ borderColor: "rgba(26,86,219,0.15)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5a6e8a] mb-1.5 uppercase tracking-wide">
                Mobile (optional)
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                maxLength={20}
                placeholder="For follow-up only"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none focus:border-[#1a56db] transition-colors"
                style={{ borderColor: "rgba(26,86,219,0.15)" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5a6e8a] mb-1.5 uppercase tracking-wide">
              Your Review *
            </label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              required
              maxLength={1000}
              rows={4}
              placeholder="Tell us about your trip..."
              className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none focus:border-[#1a56db] transition-colors resize-none"
              style={{ borderColor: "rgba(26,86,219,0.15)" }}
            />
          </div>

          {error && (
            <div className="text-sm px-3.5 py-2.5 rounded-lg" style={{ background: "#fee2e2", color: "#b91c1c" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm text-white transition-opacity disabled:opacity-60"
            style={{ background: "#1a56db" }}
          >
            {submitting ? "Submitting…" : (<><Send size={16} /> Submit Review</>)}
          </button>
        </motion.form>
      </div>
    </section>
  );
}