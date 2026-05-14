'use client'
import Link from "next/link";
import primetek from "@/src/assets/primetek.png";
import logocolor from "@/src/assets/logo-colored.png";
import Image from "next/image";

export default function Footer() {
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Awards", href: "/about#awards" },
    { name: "Reviews", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-transparent text-white font-montserrat relative overflow-hidden">
      <div className="relative z-10 px-8 md:px-16 pt-10 pb-">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Col 1: Brand/Logo */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="w-40">
              <Image src={logocolor} alt="PrimeTek Logo" className="w-full h-auto" />
            </div>
            <p className="text-white/60 text-xl leading-relaxed">
              Empowering pharmacies through advanced audit readiness and revenue optimization solutions.
            </p>
          </div>

          {/* Col 2: Navigation (Shifted) */}
          <div className="flex flex-col gap-4 pl-12">
            <span className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-2">Navigation</span>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/60 text-base 2xl:text-xl font-medium tracking-wide hover:text-teal-400 hover:translate-x-1 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-2">Knowledge</span>
            {[
              "Compliance Guide",
              "Case Studies",
              "Pharmacy News",
              "Regulatory Alerts",
              "Industry Reports"
            ].map((resource) => (
              <Link
                key={resource}
                href="/blog"
                className="text-white/60 text-base 2xl:text-xl font-medium tracking-wide hover:text-teal-400 hover:translate-x-1 transition-all duration-300"
              >
                {resource}
              </Link>
            ))}
          </div>

          {/* Col 4: Contact Info */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-2">Headquarters</span>
            <div className="space-y-3">
              <p className="text-white/80 text-base 2xl:text-xl leading-relaxed">
                3 Gateway Center, 100 Mulberry Street<br />
                12th Floor, Suite 1243<br />
                Newark, NJ 07102
              </p>
              <div className="pt-2 space-y-1">
                <p className="text-white font-bold text-base 2xl:text-xl">
                  +1 (908) 333-6252
                </p>
                <p className="text-teal-400 font-medium text-base 2xl:text-xl break-all">
                  info@primetekservices.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-white/60 text-sm 2xl:text-base font-medium tracking-wide">
              © 2026 PRIMETEK SERVICES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/40 text-sm 2xl:text-base hover:text-teal-400 transition-colors">PRIVACY POLICY</Link>
              <Link href="#" className="text-white/40 text-sm 2xl:text-base hover:text-teal-400 transition-colors">TERMS OF SERVICE</Link>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[
              { icon: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.282.975.95 1.245 2.217 1.307 3.583.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.282 3.608-.95.975-2.217 1.245-3.583 1.307-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.282-.975-.95-1.245-2.217-1.307-3.583-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.282-3.608.95-.975 2.217-1.245 3.583-1.307 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.62 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.62-6.78-6.98-6.98-1.281-.058-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { icon: "facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { icon: "linkedin", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
              { icon: "twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }
            ].map((social) => (
              <a
                key={social.icon}
                href="#"
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-400 hover:border-teal-400 hover:-translate-y-1 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 2xl:w-7 2xl:h-7 text-white">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Large Background Logo - Behind everything */}
      <div className=" pointer-events-none select-none z-0 md:px-14 pb-10 pt-10">
        <div className="text-[19vw] font-bold text-[#2b4c8c] tracking-lose leading-none text-left ">
          <Image src={primetek} alt="PrimeTek" className="w-full h-full" />
        </div>
      </div>
    </footer>
  );
}
