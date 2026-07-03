"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";
import pharmacistImage from "@/src/assets/pharmacist.png";

const SITE_BG = "/images/website-background.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#020817] font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        html, body {
          overflow: hidden !important;
          height: 100% !important;
          width: 100% !important;
          scrollbar-width: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
          display: none !important;
        }
      `,
        }}
      />

      {/* Left side: image + testimonial */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 p-16 lg:flex lg:w-[45%] xl:w-[40%]">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#020817] via-transparent to-[#005969]/40" />
        <Image
          src={pharmacistImage}
          alt="Pharmacy professional"
          fill
          priority
          className="z-0 scale-110 object-cover opacity-60"
        />

        <div className="relative z-20">
          <Link href="/">
            <Image src={logo} alt="PrimeTek Logo" width={220} height={55} className="h-16 w-auto" />
          </Link>
        </div>

        <div className="relative z-20 max-w-lg rounded-3xl border border-white/10 bg-[#020817]/70 p-10 shadow-2xl backdrop-blur-md">
          <p className="mb-6 font-display text-xl font-medium italic leading-relaxed text-white">
            &ldquo;PrimeTek restored complete visibility over our claims margins and protected us from
            clawbacks when we faced PBM audit pressure.&rdquo;
          </p>
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">
              Independent Pharmacy Owner
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-teal-400">Multi-Store Client</div>
          </div>
        </div>
      </div>

      {/* Right side: form panel over site background */}
      <div className="relative flex w-full items-center justify-center overflow-y-auto overflow-x-hidden p-8 md:p-16 lg:w-[55%] xl:w-[60%]">
        <div aria-hidden className="absolute inset-0 overflow-hidden bg-white">
          <Image
            src={SITE_BG}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/45" />
        </div>

        <div className="relative z-10 w-full max-w-lg py-10">
          <div className="mb-10 flex justify-center lg:hidden">
            <Link href="/">
              <Image src={logo} alt="PrimeTek Logo" width={200} height={50} className="h-12 w-auto" />
            </Link>
          </div>

          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-10 border-t border-ink/10 pt-10 text-center">
            {type === "login" ? (
              <p className="text-base text-ink-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-accent hover:underline">
                  Sign up for free
                </Link>
              </p>
            ) : (
              <p className="text-base text-ink-muted">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-base text-ink-muted transition-colors hover:text-ink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
