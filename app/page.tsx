import Navbar from "./components/Navbar";
import Newhero from "./components/Newhero";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollIndicator from "./components/ScrollIndicator";
import ServicesSticky from "./components/ServicesSticky";
import News from "./components/News";
import WhyPrimeTek from "./components/WhyPrimeTek";
import Testimonials from "./components/Testimonials";
import ConsultationCTA from "./components/ConsultationCTA";
import { OrbitingSection } from "./components/OrbitingSection";
import ProcessTimeline from "./components/ProcessTimeline";
import FrameworkSection from "./components/FrameworkSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollIndicator />
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <Newhero />
        <News />
        <ServicesSticky />
        <OrbitingSection />
        <WhyPrimeTek />
        <ProcessTimeline />
        <Testimonials />
        <ConsultationCTA />
        <Footer />
      </main>
    </>
  );
}
