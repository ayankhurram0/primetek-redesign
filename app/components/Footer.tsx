'use client'
import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { name: "ABOUT", href: "/about" },
    { name: "AWARDS", href: "/about#awards" },
    { name: "REVIEWS", href: "/testimonials" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <footer className="bg-white text-white font-sans relative overflow-hidden">
      <div className="relative z-10 px-8 md:px-16 pt-10 pb-">
        <div className="flex flex-col md:flex-row justify-left gap-50">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-black text-md 2xl:text-xl font-medium tracking-wide hover:text-[#71c6a4] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-2 text-left">
            <span className="text-black/60 text-md uppercase tracking-wider">US</span>
            <p className="text-black text-md 2xl:text-xl leading-relaxed">
              3 Gateway Center, 100 Mulberry Street<br />
              12th Floor, Suite 1243<br />
              Newark, NJ 07102
            </p>
            <p className="text-black text-md 2xl:text-xl mt-2">
              +1 (908) 333-6252
            </p>
            <p className="text-black text-md 2xl:text-xl mt-2">
              info@primetekservices.com
            </p>
          </div>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-black text-md 2xl:text-xl"> 2026 ALL RIGHTS RESERVED</p>
              <Link href="#" className="text-black/40 text-md 2xl:text-xl hover:text-[#71c6a4] transition-colors">PRIVACY POLICY</Link>
            </div>
          </div>
          <div className="flex justify-center gap-4 my-12">
            <a href="#" className="2xl:w-16 2xl:h-16 h-10 w-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-[#71c6a4] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="2xl:w-8 2xl:h-8 w-6 h-6 text-black">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.282.975.95 1.245 2.217 1.307 3.583.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.282 3.608-.95.975-2.217 1.245-3.583 1.307-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.282-.975-.95-1.245-2.217-1.307-3.583-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.282-3.608.95-.975 2.217-1.245 3.583-1.307 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.62 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.62-6.78-6.98-6.98-1.281-.058-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="2xl:w-16 2xl:h-16 h-10 w-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-[#71c6a4] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="2xl:w-8 2xl:h-8 w-6 h-6 text-black ">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="2xl:w-16 2xl:h-16 h-10 w-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-[#71c6a4] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="2xl:w-8 2xl:h-8 w-6 h-6 text-black ">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="2xl:w-16 2xl:h-16 h-10 w-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-[#71c6a4] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="2xl:w-8 2xl:h-8 w-6 h-6 text-black">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Bottom: Copyright & Legal */}

        </div>
      </div>
      {/* Large Background Logo - Behind everything */}
      <div className=" pointer-events-none select-none z-0 md:px-14">
        <div className="text-[19vw] font-black text-[#2b4c8c] tracking-lose leading-none text-left ">
          Prime<span className="text-[#71c6a4]">Tek</span>
        </div>
      </div>
    </footer>
  );
}
