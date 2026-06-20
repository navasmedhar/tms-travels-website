/* MARKER-MAKE-KIT-INVOKED */
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Fleet } from "./components/Fleet";
import { TourPackages } from "./components/TourPackages";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Testimonials } from "./components/Testimonials";
import { BookingForm } from "./components/BookingForm";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <Navbar />
      <Hero />
      <About />
      <Fleet />
      <TourPackages />
      <WhyChooseUs />
      <Testimonials />
      <BookingForm />
      <Contact />
      <Footer />
    </div>
  );
}
