import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "TAS Stores has received quality awards from Sierra Leone's Produce Monitoring Board and is certified by the GoSL Ministry of Trade and Industry as the country's #1 exporter.",
};

const awards = [
  {
    year: "2008",
    title: "Best Cocoa Quality Award",
    issuer: "Theobroma — European Client",
    description:
      "Within three years of starting direct exports to Europe, TAS Stores received the Best Cocoa Quality Award from its main European client Theobroma — at a time when Sierra Leone's cocoa was under a quality blacklisting.",
    significance: "This award marked Sierra Leone's return to the premium cocoa market.",
  },
  {
    year: "2017",
    title: "Quality Produce Award",
    issuer: "Produce Monitoring Board — Sierra Leone",
    description:
      "At the close of the 2017 crop year, after examination by the panel of experts at Sierra Leone's Produce Monitoring Board, TAS Stores received the Quality Produce Award as one of the Best Quality Exhibitors of the Year.",
    image: "https://static.wixstatic.com/media/879aa2_4ef9c47f035e4513ab0fabe66f3dd77f~mv2.jpg",
    significance: "Recognition of consistent quality improvement across the entire harvest year.",
  },
  {
    year: "2018",
    title: "Quality Produce Award",
    issuer: "Produce Monitoring Board — Sierra Leone",
    description:
      "TAS Stores continued its quality improvement program and received the Quality Produce Award for the second consecutive year — demonstrating that 2017's achievement was not a one-off.",
    significance: "Consecutive recognition proving systematic, not coincidental, quality standards.",
  },
  {
    year: "2019",
    title: "Highest Produce Exporter Certificate",
    issuer: "Ministry of Trade & Industry / Produce Monitoring Board",
    description:
      "Certified by the Government of Sierra Leone's Ministry of Trade and Industry and the Produce Monitoring Board as the Highest Produce (Cocoa & Coffee) Exporter in Sierra Leone for three consecutive years.",
    image: "https://static.wixstatic.com/media/879aa2_0e708b27f4ae476dbc6f3ef3780f54db~mv2_d_1821_1307_s_2.jpg",
    significance: "Government recognition as Sierra Leone's #1 cocoa and coffee exporter by volume.",
  },
];

const milestones = [
  { year: "2000", text: "Founded in Kenema, Sierra Leone" },
  { year: "2005", text: "First direct export to Europe" },
  { year: "2008", text: "Best Cocoa Quality Award — Theobroma" },
  { year: "2013", text: "Launched IMS/ICS certification program with 2,000 farmers" },
  { year: "2017", text: "Quality Produce Award — PMB" },
  { year: "2018", text: "Second consecutive Quality Award" },
  { year: "2019", text: "GoSL #1 Exporter Certificate (3-year recognition)" },
  { year: "2024", text: "10,000+ certified farmers | 2,800 MT annual export" },
];

export default function AchievementsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-80 sm:h-96 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/879aa2_a3f1de291d4f469684dc5b5491b4caaa~mv2_d_4032_1761_s_2.jpg"
          alt="TAS Stores achievements"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/90 to-brown-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Recognition</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-100 mt-2">Our Achievements</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brown-900 mb-4">
            Recognized by Government, Buyers, and Industry
          </h2>
          <p className="text-brown-500 max-w-2xl mx-auto">
            Our achievements reflect 26 years of relentless focus on quality, farmer partnerships, 
            and responsible supply chain management — recognized at both international and government levels.
          </p>
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {awards.map((award, i) => (
              <div
                key={award.year + award.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gold-500 text-brown-900 font-bold text-sm px-4 py-1.5 rounded-full">
                      {award.year}
                    </div>
                    <div className="h-px flex-1 bg-brown-100" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-brown-900 mb-1">{award.title}</h2>
                  <p className="text-forest-700 text-sm font-medium mb-4">{award.issuer}</p>
                  <p className="text-brown-600 leading-relaxed mb-4">{award.description}</p>
                  <div className="bg-cream-100 border-l-4 border-gold-500 pl-4 py-3 rounded-r-lg">
                    <p className="text-brown-700 text-sm font-medium italic">{award.significance}</p>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  {award.image ? (
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={560}
                      height={380}
                      className="rounded-xl w-full h-72 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="bg-cream-200 rounded-xl p-12 text-center h-72 flex flex-col items-center justify-center border border-brown-100">
                      <div className="text-6xl mb-4">🏆</div>
                      <p className="text-brown-600 font-serif font-semibold text-xl">{award.title}</p>
                      <p className="text-brown-400 text-sm mt-2">{award.issuer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONE TIMELINE */}
      <section className="py-20 bg-brown-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl font-bold text-cream-100">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brown-700 -translate-x-1/2 hidden sm:block" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-6 items-center ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="bg-brown-800 border border-brown-700 rounded-xl p-4 inline-block">
                      <div className="text-gold-400 font-bold text-sm">{m.year}</div>
                      <div className="text-cream-200 text-sm mt-0.5">{m.text}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-gold-500 rounded-full z-10 hidden sm:block" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brown-900 mb-4">
            Partner with Sierra Leone&apos;s #1 Exporter
          </h2>
          <p className="text-brown-500 mb-8">
            Our track record speaks for itself. Ready to add a certified, award-winning West African 
            origin to your supply chain?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-brown-900 hover:bg-brown-800 text-cream-100 px-8 py-3.5 rounded-md font-semibold text-sm transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/products"
              className="border border-brown-300 hover:border-brown-500 text-brown-700 px-8 py-3.5 rounded-md font-semibold text-sm transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
