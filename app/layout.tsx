import type { Metadata } from "next";
import { Montserrat, Merriweather } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
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
      className={`${montserrat.variable} ${merriweather.variable} antialiased`}
    >
      <body className="flex flex-col relative" suppressHydrationWarning={true}>
        
        <CustomCursor />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
