import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ContactHero } from "./Components/ContactHero";
import { ContactFormSection } from "./Components/ContactFormSection";
import { ContactStats } from "./Components/ContactStats";

export const metadata = {
  title: "Contact | PrimeTek Services",
  description: "Connect with PrimeTek Services for pharmacy compliance and revenue optimization solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden">
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <ContactStats />
      <Footer />
    </main>
  );
}
