import ContactHero from "./Components/ContactHero";
import ContactForm from "./Components/ContactForm";
import ContactInfo from "./Components/ContactInfo";
import ContactStats from "./Components/ContactStats";

export const metadata = {
  title: "Contact | PrimeTek Services",
  description: "Connect with PrimeTek Services for pharmacy compliance and revenue optimization solutions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-950 overflow-x-hidden">
      <ContactHero />
      
      {/* Contact Section */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
      
      <ContactStats />
    </main>
  );
}
