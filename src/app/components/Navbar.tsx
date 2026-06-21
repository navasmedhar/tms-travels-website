import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import tmsLogo from "../../imports/tms-logo.jpeg";
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Fleet", href: "#fleet" },
  { label: "Tour Packages", href: "#packages" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      {/* Top bar */}
      <div className={`${scrolled ? "hidden" : "flex"} justify-end items-center px-6 py-1 text-xs gap-4 text-white/80 max-w-7xl mx-auto`}>
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          Thammampatty, Salem, Tamil Nadu
        </span>
        <a href="tel:7402233588" className="flex items-center gap-1 hover:text-white transition-colors">
          <Phone size={12} />
          +91 7402233588
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="flex items-center gap-2"
        >
          <img
            src={tmsLogo}
            alt="TMS Travels logo"
            className="w-12 h-12 object-cover rounded-2xl shadow-sm"
          />
          <div>
            <div
              className={`font-bold text-lg leading-tight transition-colors ${scrolled ? "text-[#0d1b2a]" : "text-white"}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              TMS Travels
            </div>
            <div className={`text-xs leading-none transition-colors ${scrolled ? "text-[#f97316]" : "text-orange-300"}`}>
              Safe · Comfortable · Affordable
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`text-sm font-medium transition-colors hover:text-[#f97316] ${
                scrolled ? "text-[#0d1b2a]" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); handleNavClick("#booking"); }}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f97316, #ea6000)" }}
          >
            Book Now
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#0d1b2a]" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl border-t border-blue-50 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="py-3 px-4 rounded-xl text-sm font-medium text-[#0d1b2a] hover:bg-[#e8f0fe] hover:text-[#1a56db] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); handleNavClick("#booking"); }}
            className="mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white text-center"
            style={{ background: "linear-gradient(135deg, #f97316, #ea6000)" }}
          >
            Book Now
          </a>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-[#5a6e8a]">
            <Phone size={12} />
            <a href="tel:7402233588" className="font-medium text-[#1a56db]">+91 7402233588</a>
          </div>
        </div>
      )}
    </header>
  );
}