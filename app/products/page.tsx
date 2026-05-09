import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "TAS Stores exports Grade 1 & 2 EU Organic cocoa beans and Robusta coffee beans from Sierra Leone. Fairtrade and USDA NOP certified. FOB Freetown. Min. 16 MT.",
};

const cocoaSpecs = [
  { label: "Certification", value: "EU Organic · USDA NOP · Fairtrade (UTZ)" },
  { label: "Packaging", value: "63kg net in Jute bags or Bulk" },
  { label: "Moisture Content", value: "≤ 7% (standard export)" },
  { label: "Minimum Order", value: "16 MT (1 × 20ft container)" },
  { label: "Price Basis", value: "LIFFE (London International Financial Futures Exchange)" },
  { label: "Terms", value: "FOB Freetown, net landed weight" },
  { label: "Payment", value: "Swift transfer — 95% against shipping docs + 5% after quality verification" },
];

const cocoaGrades = [
  {
    grade: "Grade 1",
    specs: "100 grams = 100 beans",
    defect: "Max 5% defective beans",
    best: "Premium chocolate manufacturing, origin bars",
  },
  {
    grade: "Grade 2",
    specs: "100 grams = 100–115 beans",
    defect: "Max 10% defective beans",
    best: "Industrial chocolate, blending, confectionery",
  },
];

const coffeeSpecs = [
  { label: "Type", value: "Robusta — Green Unroasted" },
  { label: "Certification", value: "EU Organic · UTZ" },
  { label: "Packaging", value: "63kg net in Jute bags" },
  { label: "Minimum Order", value: "20 MT (1 × 20ft container)" },
  { label: "Price Basis", value: "LIFFE" },
  { label: "Terms", value: "FOB Freetown, net landed weight" },
  { label: "Payment", value: "Net cash — 100% against shipping documents" },
];

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-72 sm:h-96 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/879aa2_85295e52bb2c459fa57251f887b6f802~mv2_d_1760_1761_s_2.jpg"
          alt="TAS Stores cocoa beans"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/90 to-brown-900/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Export Specifications</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-100 mt-2">Our Products</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 bg-white rounded-xl border border-brown-100 shadow-sm">
            <div>
              <h2 className="font-serif text-xl font-bold text-brown-900">Looking for a specific grade or volume?</h2>
              <p className="text-brown-500 text-sm mt-1">Our export team responds to all inquiries within 24 hours.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="bg-gold-500 hover:bg-gold-400 text-brown-900 px-6 py-3 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Request a Quote
              </Link>
              <a
                href="https://wa.me/23276111112?text=Hello%20TAS%20Stores%2C%20I%20would%20like%20a%20product%20specification%20sheet."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COCOA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">Product 01</span>
              <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2 mb-2">Cocoa Beans</h2>
              <p className="text-brown-500 mb-8">
                Sierra Leone cocoa is renowned in the European market for its high quality and is 
                used as a premium blending agent. Our beans are 100% organic — Sierra Leone&apos;s 
                rich soil requires no artificial fertilizers or chemicals.
              </p>

              {/* Grade comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {cocoaGrades.map((g) => (
                  <div key={g.grade} className="bg-cream-100 border border-brown-200 rounded-xl p-5">
                    <div className="inline-block bg-brown-900 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {g.grade}
                    </div>
                    <p className="text-brown-700 text-sm font-medium">{g.specs}</p>
                    <p className="text-brown-500 text-sm mt-1">{g.defect}</p>
                    <p className="text-forest-700 text-xs mt-3 font-medium">Best for: {g.best}</p>
                  </div>
                ))}
              </div>

              {/* Specs table */}
              <div className="border border-brown-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {cocoaSpecs.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-cream-100" : "bg-white"}>
                        <td className="px-4 py-3 font-semibold text-brown-700 w-40 border-r border-brown-100">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-brown-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/contact"
                  className="bg-brown-900 hover:bg-brown-800 text-cream-100 px-6 py-3 rounded-md text-sm font-semibold transition-colors"
                >
                  Request Cocoa Quote
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <Image
                src="https://static.wixstatic.com/media/879aa2_85295e52bb2c459fa57251f887b6f802~mv2_d_1760_1761_s_2.jpg"
                alt="TAS Stores Grade 1 cocoa beans"
                width={560}
                height={420}
                className="w-full h-80 object-cover rounded-xl"
              />
              <Image
                src="https://static.wixstatic.com/media/879aa2_e998c0bce14e4395b9c377ea040d5e86~mv2_d_6000_4000_s_4_2.jpg"
                alt="Cocoa farm Sierra Leone"
                width={560}
                height={240}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="bg-cream-200 h-px max-w-7xl mx-auto" />

      {/* COFFEE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:order-2">
              <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">Product 02</span>
              <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2 mb-2">Robusta Coffee Beans</h2>
              <p className="text-brown-500 mb-8">
                Sierra Leone Robusta coffee is a niche, largely undiscovered origin with strong 
                potential for specialty and sustainable roasters. Grown at altitude in the eastern 
                districts, our organic Robusta offers a distinctive profile for blending and single-origin use.
              </p>

              <div className="bg-forest-100 border border-forest-400/30 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <h3 className="font-semibold text-forest-800 text-sm">Specialty Opportunity</h3>
                    <p className="text-forest-700 text-sm mt-1">
                      Sierra Leone Robusta is a first-mover origin in the sustainable coffee space. 
                      Contact us to discuss exclusive supply arrangements for roasters seeking 
                      differentiated, fully-traceable West African origins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Specs table */}
              <div className="border border-brown-100 rounded-xl overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <tbody>
                    {coffeeSpecs.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-cream-100" : "bg-white"}>
                        <td className="px-4 py-3 font-semibold text-brown-700 w-40 border-r border-brown-100">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-brown-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Link
                href="/contact"
                className="bg-brown-900 hover:bg-brown-800 text-cream-100 px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Request Coffee Quote
              </Link>
            </div>

            <div className="lg:order-1">
              <Image
                src="https://static.wixstatic.com/media/879aa2_fc3f99ee7ccf4faca9012a10637b52da~mv2.jpg"
                alt="Green Robusta coffee beans"
                width={560}
                height={500}
                className="w-full h-[480px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-cream-100 mb-2">Certification Partner</h2>
          <p className="text-brown-300 text-sm mb-8">
            All products are independently certified by{" "}
            <a href="https://www.controlunion.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">
              Control Union
            </a>{" "}
            — one of the world&apos;s leading certification bodies.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { src: "https://static.wixstatic.com/media/879aa2_558c841a58ea4b438865f941314756cd~mv2.png", label: "EU Organic" },
              { src: "https://static.wixstatic.com/media/879aa2_c9af659a196c4664903297e9af75dd73~mv2.png", label: "USDA NOP" },
              { src: "https://static.wixstatic.com/media/879aa2_9a97187d96194550b005d878b2888694~mv2.png", label: "Fairtrade" },
            ].map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2">
                <Image src={cert.src} alt={cert.label} width={64} height={64} className="h-16 w-16 object-contain" />
                <span className="text-brown-300 text-xs">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
