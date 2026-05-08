
import { ContactHero } from "./Components/ContactHero";
import { ContactFormSection } from "./Components/ContactFormSection";
import { ContactStats } from "./Components/ContactStats";
import { OfficeLocations } from "./Components/OfficeLocations";

export const metadata = {
  title: "Contact | PrimeTek Services",
  description: "Connect with PrimeTek Services for pharmacy compliance and revenue optimization solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-950 overflow-x-hidden">
      <ContactHero />
      
      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ContactFormSection />
        </div>
      </section>
      
      <ContactStats />
      <OfficeLocations />
    </main>
  );
}
