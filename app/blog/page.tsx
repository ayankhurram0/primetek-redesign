"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import BlogHero from "./components/BlogHero";
import BlogCategories from "./components/BlogCategories";
import BlogFeatured from "./components/BlogFeatured";
import BlogGrid from "./components/BlogGrid";
import BlogNewsletter from "./components/BlogNewsletter";
import { blogs } from "./blogData";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#020817]">
      <Navbar />
      <BlogHero />
      <BlogCategories />
      <BlogFeatured />
      <BlogGrid />
      <BlogNewsletter />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
