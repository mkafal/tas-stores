import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how TAS Stores grew from a local cocoa buyer in Sierra Leone to the country's #1 certified cocoa and coffee exporter, supplying Europe and North America since 2000.",
};

const timeline = [
  { year: "2000", event: "TAS Stores founded by Amin A. Skaikay as a sole proprietorship in Kenema." },
  { year: "2005", event: "Began direct exports to Europe. Sierra Leone cocoa was blacklisted — we focused on quality rehabilitation." },
  { year: "2008", event: "Received Best Cocoa Quality Award from European client Theobroma." },
  { year: "2013", event: "Launched IMS/ICS certification program. Started with 2,000 registered farmers." },
  { year: "2017", event: "Received Quality Produce Award as Best Quality Exhibitor from Sierra Leone's Produce Monitoring Board." },
  { year: "2018", event: "Certified by GoSL Ministry of Trade & Industry as Highest Produce Exporter for 3 consecutive years." },
  { year: "2024", event: "10,000+ certified farmers across three districts. Exporting 2,800+ MT of premium cocoa annually." },
];

const processSteps = [
  {
    icon: "🌿",
    title: "Harvest & Fermentation",
    desc: "Farmers harvest cocoa pods, extract beans, and ferment them for 5–7 days. This natural process develops the aroma and colour of the beans.",
  },
  {
    icon: "🌞",
    title: "Sun Drying",
    desc: "After fermentation, beans are spread on drying floors to reduce moisture. This step is critical for meeting export-grade moisture standards.",
  },
  {
    icon: "📦",
    title: "Collection & IMS Registration",
    desc: "Beans are collected at our agents' centers or directly at our Kenema office. Every bag is weighed, moisture-checked, and registered by our traceability team.",
  },
  {
    icon: "🔬",
    title: "Expert Grading",
    desc: "Our technicians further dry and grade beans to export standards — 1st grade (≤5% defect) and 2nd grade (≤10% defect) — and pack them in 63kg jute bags.",
  },
  {
    icon: "🚛",
    title: "Transport to Freetown",
    desc: "Branded jute bags are loaded onto our trucks and transported to our Freetown port warehouse, where they are stacked for loading.",
  },
  {
    icon: "🚢",
    title: "FOB Export",
    desc: "Goods are exported FOB Freetown. Final weight and quality are verified at port of destination, ensuring buyers receive exactly what was contracted.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-80 sm:h-96 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/879aa2_4cd2d22c78404b60a3828f6a66d9d5f9~mv2_d_4032_1960_s_2.jpg"
          alt="TAS Stores operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/90 to-brown-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-100 mt-2">About TAS Stores</h1>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brown-900 mb-6">
                Built on Quality,<br />Driven by Farmers
              </h2>
              <div className="space-y-4 text-brown-600 leading-relaxed">
                <p>
                  T.A.S Stores was established in the year 2000 by Amin A. Skaikay as a sole proprietorship. 
                  He began by buying cocoa and coffee from farmers and selling to exporters in Sierra Leone. 
                  In 2005, we started exporting our own products to Europe — at a time when Sierra Leone&apos;s 
                  cocoa was blacklisted due to quality issues.
                </p>
                <p>
                  Within three years of direct export, the company received the Best Cocoa Quality Award 
                  from its main European client, Theobroma — helping to restore Sierra Leone&apos;s reputation 
                  in the premium cocoa market.
                </p>
                <p>
                  As we expanded into rural towns and villages, our agents and branches spread across the 
                  three main producing districts: Kenema, Kono, and Kailahun. TAS Stores began offering 
                  micro-financing and micro-credit facilities to farmers, building deep trust and improving 
                  both farm practices and farmer income.
                </p>
                <p>
                  In 2013, we launched our IMS/ICS (Internal Management System / Internal Control System) 
                  and started our certification journey with 2,000 registered farmers. Today, we work 
                  with over 10,000 certified farmers and export more than 2,800 metric tons of premium 
                  grade cocoa annually.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <Image
                src="https://static.wixstatic.com/media/879aa2_803c5138cde645afb661e3026175bab1~mv2.jpg"
                alt="TAS Stores main operation areas map"
                width={500}
                height={400}
                className="rounded-xl w-full h-64 object-cover"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream-100 rounded-xl p-5 border border-brown-100">
                  <div className="font-serif text-2xl font-bold text-gold-500">2,800 MT</div>
                  <div className="text-brown-600 text-sm mt-1">Cocoa exported per year</div>
                </div>
                <div className="bg-cream-100 rounded-xl p-5 border border-brown-100">
                  <div className="font-serif text-2xl font-bold text-gold-500">10,000+</div>
                  <div className="text-brown-600 text-sm mt-1">Certified farmers registered</div>
                </div>
                <div className="bg-cream-100 rounded-xl p-5 border border-brown-100">
                  <div className="font-serif text-2xl font-bold text-gold-500">3</div>
                  <div className="text-brown-600 text-sm mt-1">Districts of operation</div>
                </div>
                <div className="bg-cream-100 rounded-xl p-5 border border-brown-100">
                  <div className="font-serif text-2xl font-bold text-gold-500">26 yrs</div>
                  <div className="text-brown-600 text-sm mt-1">Of continuous operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">26 Years</span>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-brown-200" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-brown-900 rounded-full flex items-center justify-center z-10">
                    <span className="text-gold-400 text-xs font-bold">{item.year.slice(2)}&apos;</span>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-brown-100 shadow-sm mt-1">
                    <span className="text-gold-600 font-bold text-sm">{item.year}</span>
                    <p className="text-brown-600 text-sm mt-1 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">How We Work</span>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2">The Process Behind Every Bag</h2>
            <p className="text-brown-500 mt-4 max-w-2xl mx-auto">
              From the farm in Kenema to the factory floor in Rotterdam — every step is controlled, 
              documented, and certified.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-cream-100 border border-brown-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-serif font-semibold text-brown-900 text-lg mb-2">{step.title}</h3>
                <p className="text-brown-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="py-20 bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Our Network</span>
              <h2 className="font-serif text-3xl font-bold text-cream-100 mt-2 mb-6">
                The Link Between Farmers and Global Markets
              </h2>
              <p className="text-brown-300 leading-relaxed mb-6">
                TAS Stores sources premium certified organic cocoa and coffee from all producing 
                regions in the country. Our extensive network of farmers, cooperatives, agents, and 
                partners makes us a leading producer company today.
              </p>
              <p className="text-brown-300 leading-relaxed mb-8">
                To organic farmers in Kenema, Kono, and Kailahun — we are the link to manufacturers 
                in Europe. For those manufacturers, we are a trusted, transparent partner enabling 
                them to successfully tap into the growing organic and ethical sourcing market.
              </p>
              <Link
                href="/sustainability"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-brown-900 px-6 py-3 rounded-md font-semibold text-sm transition-colors"
              >
                Our Impact & Sustainability
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div>
              <Image
                src="https://static.wixstatic.com/media/879aa2_1ecd25fca2a24d97968ecf7e6f51efaf~mv2_d_3888_2592_s_4_2.jpg"
                alt="Cocoa collection center"
                width={500}
                height={380}
                className="rounded-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
