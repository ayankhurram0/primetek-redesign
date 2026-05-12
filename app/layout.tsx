import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})


export const metadata: Metadata = {
  title: "PrimeTek Services",
  description: "IT Solutions and Strategic Partnerships",
};

import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} antialiased`}
    >
      <body className="flex flex-col relative" suppressHydrationWarning={true}>
        {/* Global Background Gradient System */}
        <div className="fixed inset-0 z-[-10] bg-[#020817]" />
        
        {/* Scrolling Background Layer */}
        <div className="absolute top-0 left-0 w-full h-full z-[-9] overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[150vh] bg-[radial-gradient(ellipse_at_20%_0%,rgba(113,198,164,0.07)_0%,transparent_60%)]" />
          <div className="absolute top-[30vh] right-0 w-full h-[150vh] bg-[radial-gradient(ellipse_at_80%_30%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
          <div className="absolute top-[100vh] left-0 w-full h-[150vh] bg-[radial-gradient(ellipse_at_10%_50%,rgba(113,198,164,0.04)_0%,transparent_60%)]" />
          <div className="absolute bottom-[20vh] right-0 w-full h-[150vh] bg-[radial-gradient(ellipse_at_90%_70%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[100vh] bg-[radial-gradient(ellipse_at_50%_100%,rgba(113,198,164,0.08)_0%,transparent_70%)]" />
        </div>
        
        <CustomCursor />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
