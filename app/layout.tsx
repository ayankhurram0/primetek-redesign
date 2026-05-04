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
        <div className="fixed inset-0 z-[-1] bg-[#020817]" />
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_-20%,#0a192f_0%,transparent_50%)]" />
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_0%_0%,rgba(113,198,164,0.05)_0%,transparent_30%)]" />
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.05)_0%,transparent_30%)]" />
        
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
