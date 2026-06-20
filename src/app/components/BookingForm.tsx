import { motion } from "motion/react";
import { useState } from "react";
import { Send, CheckCircle, Calendar, MapPin, Car, User, Phone, AlertCircle } from "lucide-react";

const vehicleTypes = [
  "4 Seater Car",
  "7 Seater SUV (Innova/Ertiga)",
  "15 Seater AC Van",
  "20 Seater Van",
  "Tourist Vehicle",
];

const tripTypes = [
  "Day Rental",
  "Weekly Rental",
  "Monthly Rental",
  "Family Trip",
  "Honeymoon Trip",
  "Temple Tour",
  "College IV Trip",
  "Friends Group Trip",
  "Corporate Tour",
  "Airport Pickup/Drop",
  "All India Tour",
];

interface FormState {
  name: string;
  mobile: string;
  pickup: string;
  destination: string;
  vehicle: string;
  tripType: string;
  date: string;
  message: string;
}

const initial: FormState = {
  name: "", mobile: "", pickup: "", destination: "",
  vehicle: "", tripType: "", date: "", message: "",
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          pickup: form.pickup,
          destination: form.destination,
          vehicle: form.vehicle,
          trip_type: form.tripType,
          travel_date: form.date,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Show first validation error or generic message
        const msg = data.errors?.[0]?.msg || data.message || "Something went wrong. Please try again.";
        setError(msg);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to connect to the server. Please call us directly at +91 7402233588.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = encodeURIComponent(
    `Hello TMS Travels!\n\nName: ${form.name}\nMobile: ${form.mobile}\nPickup: ${form.pickup}\nDestination: ${form.destination}\nVehicle: ${form.vehicle}\nTrip Type: ${form.tripType}\nDate: ${form.date}\n\n${form.message}`
  );

  return (
    <section id="booking" className="py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1a3a6e 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: CTA block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-wide uppercase"
            style={{ background: "rgba(249,115,22,0.18)", color: "#fbbf80", border: "1px solid rgba(249,115,22,0.25)" }}
          >
            Book Your Ride
          </div>
          <h2
            className="leading-tight mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            Ready to Start Your <span style={{ color: "#f97316" }}>Adventure?</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Fill out the form and our team will contact you within 30 minutes with the best available options and pricing. Or reach us instantly on WhatsApp!
          </p>

          <div className="space-y-4">
            {[
              { icon: Phone, label: "Call Us", value: "+91 7402233588", href: "tel:7402233588" },
              { icon: MapPin, label: "Our Location", value: "Thammampatty, Salem, Tamil Nadu", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href}
                className="flex items-center gap-4 p-4 rounded-xl transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.2)" }}>
                  <Icon size={18} style={{ color: "#f97316" }} />
                </div>
                <div>
                  <div className="text-xs text-white/50">{label}</div>
                  <div className="text-sm font-medium text-white">{value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/917402233588?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
            style={{ background: "#25D366" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book via WhatsApp
          </a>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: "#d1fae5" }}>
                <CheckCircle size={32} style={{ color: "#10b981" }} />
              </div>
              <h3 className="text-xl font-bold text-[#0d1b2a] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Booking Received!
              </h3>
              <p className="text-[#5a6e8a] text-sm mb-6">
                Thank you, {form.name}! Our team will contact you at <strong>{form.mobile}</strong> within 30 minutes.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initial); }}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1a56db, #1040b0)" }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-[#0d1b2a] font-bold mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
                Book Your Journey
              </h3>
              <p className="text-[#5a6e8a] text-xs mb-6">We'll reply within 30 minutes</p>

              {error && (
                <div className="flex items-start gap-2 mb-4 p-3 rounded-xl text-sm"
                  style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                      <User size={12} className="inline mr-1" />Full Name *
                    </label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                      <Phone size={12} className="inline mr-1" />Mobile *
                    </label>
                    <input
                      type="tel" name="mobile" required value={form.mobile} onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                      <MapPin size={12} className="inline mr-1" />Pickup Location *
                    </label>
                    <input
                      type="text" name="pickup" required value={form.pickup} onChange={handleChange}
                      placeholder="e.g. Salem Bus Stand"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                      <MapPin size={12} className="inline mr-1" />Destination *
                    </label>
                    <input
                      type="text" name="destination" required value={form.destination} onChange={handleChange}
                      placeholder="e.g. Ooty"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                      <Car size={12} className="inline mr-1" />Vehicle Type *
                    </label>
                    <select
                      name="vehicle" required value={form.vehicle} onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: form.vehicle ? "#0d1b2a" : "#5a6e8a" }}
                    >
                      <option value="">Select vehicle</option>
                      {vehicleTypes.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">Trip Type</label>
                    <select
                      name="tripType" value={form.tripType} onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                      style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: form.tripType ? "#0d1b2a" : "#5a6e8a" }}
                    >
                      <option value="">Select type</option>
                      {tripTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">
                    <Calendar size={12} className="inline mr-1" />Travel Date *
                  </label>
                  <input
                    type="date" name="date" required value={form.date} onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db]"
                    style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#0d1b2a] mb-1.5">Additional Notes</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={2}
                    placeholder="Any special requirements, number of passengers, etc."
                    className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-[#1a56db] resize-none"
                    style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.15)", color: "#0d1b2a" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea6000)", boxShadow: "0 6px 20px rgba(249,115,22,0.35)" }}
                >
                  {loading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? "Sending..." : "Send Booking Request"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
