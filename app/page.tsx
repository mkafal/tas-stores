"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeroVideo from "@/components/HeroVideo";

// 3D / interactive components — loaded client-side only
const AnimatedStats   = dynamic(() => import("@/components/AnimatedStats"),   { ssr: false });
const SupplyChainFlow = dynamic(() => import("@/components/SupplyChainFlow"), { ssr: false });

const certifications = [
  {
    src: "https://static.wixstatic.com/media/879aa2_558c841a58ea4b438865f941314756cd~mv2.png",
    alt: "EU Organic Certified",
    label: "EU Organic",
    description: "Certified by Control Union under EU organic regulation standards",
  },
  {
    src: "https://static.wixstatic.com/media/879aa2_c9af659a196c4664903297e9af75dd73~mv2.png",
    alt: "USDA NOP Organic",
    label: "USDA NOP Organic",
    description: "National Organic Program certified for the US market",
  },
  {
    src: "https://static.wixstatic.com/media/879aa2_9a97187d96194550b005d878b2888694~mv2.png",
    alt: "Fairtrade Certified",
    label: "Fairtrade",
    description: "Ensuring fair prices, decent working conditions, and community investment",
  },
];

const markets = ["Netherlands", "United Kingdom", "Belgium", "France", "United States"];

export default function HomePage() {
  return (
    <>
      {/* ── VIDEO HERO ─────────────────────────────────────────── */}
      <HeroVideo />

      {/* ── ANIMATED STATS ─────────────────────────────────────── */}
      <AnimatedStats />

      {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-forest-800 text-xs font-semibold uppercase tracking-widest">
              International Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-900 mt-2">
              Triple-Certified Quality
            </h2>
            <p className="text-brown-600 mt-4 max-w-2xl mx-auto">
              Every bag of cocoa and coffee we export carries triple certification — ensuring
              buyers receive organic, ethically-sourced produce that meets the highest global standards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.label}
                className="bg-white border border-brown-100 rounded-xl p-8 text-center hover:shadow-lg hover:shadow-brown-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={96}
                  height={96}
                  className="h-20 w-20 object-contain mx-auto mb-4"
                />
                <h3 className="font-serif font-semibold text-brown-900 text-lg mb-2">
                  {cert.label}
                </h3>
                <p className="text-brown-500 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-900 mt-2 mb-6">
                From a Local Buyer to<br />Sierra Leone&apos;s #1 Exporter
              </h2>
              <p className="text-brown-600 leading-relaxed mb-4">
                Founded in 2000 by Amin A. Skaikay, TAS Stores began as a single-trader buying cocoa
                from local farmers. By 2005, we were exporting directly to Europe — at a time when
                Sierra Leone&apos;s cocoa faced quality blacklisting.
              </p>
              <p className="text-brown-600 leading-relaxed mb-4">
                Within three years, our relentless focus on quality earned us the Best Cocoa Quality
                Award from our European client Theobroma — and put Sierra Leone back on the premium
                cocoa map.
              </p>
              <p className="text-brown-600 leading-relaxed mb-8">
                Today, certified by Sierra Leone&apos;s Ministry of Trade and Industry as the
                country&apos;s highest-volume exporter — working with over 10,000 certified farmers
                across three districts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-brown-900 hover:bg-brown-800 text-cream-100 px-6 py-3 rounded-md text-sm font-semibold transition-colors"
                >
                  Full Story
                </Link>
                <Link
                  href="/achievements"
                  className="border border-brown-200 hover:border-brown-400 text-brown-700 px-6 py-3 rounded-md text-sm font-semibold transition-colors"
                >
                  Our Achievements
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/879aa2_e998c0bce14e4395b9c377ea040d5e86~mv2_d_6000_4000_s_4_2.jpg"
                alt="TAS Stores cocoa farm operations"
                width={600}
                height={500}
                className="rounded-xl object-cover w-full h-[420px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-forest-800 text-cream-100 rounded-xl p-5 shadow-xl">
                <div className="font-serif text-2xl font-bold text-gold-400">#1</div>
                <div className="text-xs text-cream-300 mt-1">
                  Certified by GoSL Ministry<br />of Trade &amp; Industry
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED SUPPLY CHAIN FLOW ─────────────────────────── */}
      <SupplyChainFlow />

      {/* ── PRODUCTS PREVIEW ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">
              What We Export
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-900 mt-2">
              Our Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src="https://static.wixstatic.com/media/879aa2_85295e52bb2c459fa57251f887b6f802~mv2_d_1760_1761_s_2.jpg"
                alt="Cocoa beans"
                width={600}
                height={400}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl font-bold text-cream-100 mb-1">Cocoa Beans</h3>
                <p className="text-brown-300 text-sm mb-4">
                  Grade 1 &amp; 2 · EU Organic · USDA · Fairtrade · Min. 16 MT
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-gold-500 hover:bg-gold-400 text-brown-900 px-5 py-2 rounded-md text-sm font-semibold transition-colors"
                >
                  View Specs
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src="https://static.wixstatic.com/media/879aa2_fc3f99ee7ccf4faca9012a10637b52da~mv2.jpg"
                alt="Robusta coffee beans"
                width={600}
                height={400}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl font-bold text-cream-100 mb-1">
                  Robusta Coffee Beans
                </h3>
                <p className="text-brown-300 text-sm mb-4">
                  Green Unroasted · EU Organic · Min. 20 MT
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-gold-500 hover:bg-gold-400 text-brown-900 px-5 py-2 rounded-md text-sm font-semibold transition-colors"
                >
                  View Specs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETS ────────────────────────────────────────────── */}
      <section className="py-16 bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
            Our Customers
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-100 mt-2 mb-10">
            Trusted by Buyers Across the Globe
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {markets.map((market) => (
              <span
                key={market}
                className="bg-brown-800 border border-brown-700 text-cream-200 px-6 py-2.5 rounded-full text-sm font-medium"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/879aa2_0d5cf23118f04557ae1dc58fbf9f5b3c~mv2.jpg"
          alt="Coffee processing"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brown-950/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 mb-4">
            Ready to Source Premium<br />West African Cocoa or Coffee?
          </h2>
          <p className="text-cream-200/80 text-lg mb-8">
            Complete our RFQ form and our export team will respond within 24 hours
            with availability, current pricing, and a sample offer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gold-500 hover:bg-gold-400 text-brown-900 px-8 py-4 rounded-md font-semibold transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="https://wa.me/23276111112?text=Hello%20TAS%20Stores%2C%20I%20am%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-md font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
