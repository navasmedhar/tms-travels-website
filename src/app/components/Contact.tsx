import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import tmsLogo from "../../imports/tms-logo.jpeg";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase"
            style={{ background: "#e8f0fe", color: "#1a56db" }}
          >
            Contact Us
          </div>
          <h2
            className="text-[#0d1b2a] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Get in <span style={{ color: "#f97316" }}>Touch</span>
          </h2>
          <p className="text-[#5a6e8a] max-w-xl mx-auto">
            We're available 24/7 to help you plan your perfect trip. Reach us via call, WhatsApp, or email.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Contact cards */}
          {[
            {
              icon: Phone,
              label: "Call Us",
              value: "+91 7402233588",
              sub: "Available 24/7",
              href: "tel:7402233588",
              color: "#1a56db",
              bg: "#e8f0fe",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+91 7402233588",
              sub: "Quick response",
              href: "https://wa.me/917402233588",
              color: "#25D366",
              bg: "#d1fae5",
            },
            {
              icon: Mail,
              label: "Email",
              value: "tmstravels2010@gmail.com",
              sub: "We reply within 2 hours",
              href: "mailto:tmstravels2010@gmail.com",
              color: "#f97316",
              bg: "#fff3e8",
            },
          ].map(({ icon: Icon, label, value, sub, href, color, bg }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-6 rounded-2xl border bg-white hover:shadow-md transition-all duration-300"
              style={{ borderColor: "rgba(26,86,219,0.1)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <div className="text-xs text-[#5a6e8a] mb-0.5">{label}</div>
                <div className="font-semibold text-[#0d1b2a]">{value}</div>
                <div className="text-xs text-[#5a6e8a]">{sub}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Map + address */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border shadow-sm"
            style={{ borderColor: "rgba(26,86,219,0.1)", height: 320 }}
          >
            <iframe
              title="TMS Travels Location - Thammampatty, Salem"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.0!2d78.1!3d11.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baba3855a929867%3A0x959a6522df398428!2sTMS+Travels+%26+Tours!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Address + business info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between p-6 rounded-2xl border"
            style={{ background: "#f8faff", borderColor: "rgba(26,86,219,0.1)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={tmsLogo}
                  alt="TMS Travels logo"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <div className="font-bold text-[#0d1b2a]">TMS Travels</div>
                  <div className="text-xs text-[#f97316]">Safe · Comfortable · Affordable</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: "#1a56db", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div className="text-sm font-medium text-[#0d1b2a]">Our Location</div>
                    <div className="text-xs text-[#5a6e8a]">Thammampatty, Salem,<br />Tamil Nadu – 636 309</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} style={{ color: "#1a56db", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div className="text-sm font-medium text-[#0d1b2a]">Phone / WhatsApp</div>
                    <div className="text-xs text-[#5a6e8a]">+91 7402233588</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} style={{ color: "#1a56db", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div className="text-sm font-medium text-[#0d1b2a]">Email</div>
                    <div className="text-xs text-[#5a6e8a]">tmstravels2010@gmail.com</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl text-xs" style={{ background: "#e8f0fe", color: "#1a56db" }}>
                🕐 Available 24/7 for bookings and emergency assistance
              </div>
            </div>

            <a
              href="https://wa.me/917402233588"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-[1.02]"
              style={{ background: "#25D366" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}