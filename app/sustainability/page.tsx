import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sustainability & Impact",
  description:
    "TAS Stores works with 10,000+ certified farmers in Sierra Leone. EU Organic, Fairtrade. Full traceability from farm to export. CSDDD-ready supply chain documentation.",
};

const impactStats = [
  { value: "10,000+", label: "Certified Farmers", sub: "Registered in our IMS system" },
  { value: "9,000", label: "Cocoa Farmers", sub: "Across Kenema, Kono & Kailahun" },
  { value: "2,000", label: "Coffee Farmers", sub: "Organic Robusta producers" },
  { value: "100%", label: "Organic Produce", sub: "No artificial fertilizers or chemicals" },
  { value: "2,800 MT", label: "Annual Export Volume", sub: "Premium grade cocoa" },
  { value: "2013", label: "Certification Start", sub: "11+ years of certified supply chain" },
];

const sdgs = [
  { number: "1", title: "No Poverty", desc: "Micro-financing and fair prices increase farmer household income" },
  { number: "2", title: "Zero Hunger", desc: "Block-farming schemes improve food security in producing communities" },
  { number: "8", title: "Decent Work", desc: "Fairtrade certification ensures fair wages and safe working conditions" },
  { number: "12", title: "Responsible Production", desc: "100% organic, no chemicals, IMS traceability for full accountability" },
  { number: "13", title: "Climate Action", desc: "No deforestation practices; sustainable land management training" },
  { number: "17", title: "Partnerships", desc: "Working with Control Union, Fairtrade, and European manufacturers" },
];

const traceabilitySteps = [
  { stage: "Farmer", detail: "Registered in IMS — name, location, farm size, certification status" },
  { stage: "Collection Centre", detail: "Bag weight, moisture %, quality grade, farmer ID logged" },
  { stage: "Kenema Warehouse", detail: "Batch consolidation, final drying, expert grading, re-inspection" },
  { stage: "Jute Bag Labelling", detail: "Each 63kg bag printed with TAS Stores ID + batch code" },
  { stage: "Freetown Port", detail: "Container loading, phytosanitary inspection, COA issued" },
  { stage: "Destination Port", detail: "Final weight verification, quality audit at buyer's port" },
];

export default function SustainabilityPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-80 sm:h-96 flex items-end pb-12 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/879aa2_1ecd25fca2a24d97968ecf7e6f51efaf~mv2_d_3888_2592_s_4_2.jpg"
          alt="Farmers and sustainability"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 to-brown-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">People & Planet</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-100 mt-2">Sustainability & Impact</h1>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-brown-900">Measurable Impact</h2>
            <p className="text-brown-500 mt-4 max-w-2xl mx-auto">
              Since 2013, TAS Stores has focused on expanding its farmer training programs, 
              increasing productivity and income across Sierra Leone&apos;s cocoa and coffee producing communities.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((s) => (
              <div key={s.label} className="bg-white border border-brown-100 rounded-xl p-5 text-center">
                <div className="font-serif text-2xl font-bold text-gold-500">{s.value}</div>
                <div className="font-semibold text-brown-800 text-sm mt-1">{s.label}</div>
                <div className="text-brown-400 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIC FARMING */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">Natural & Organic</span>
              <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2 mb-6">
                Sierra Leone&apos;s Soil Does<br />the Work
              </h2>
              <p className="text-brown-600 leading-relaxed mb-4">
                Sierra Leone is blessed with exceptionally rich, naturally fertile soil. There is no need 
                for artificial fertilizers or chemical treatments — our cocoa and coffee are genuinely, 
                intrinsically organic.
              </p>
              <p className="text-brown-600 leading-relaxed mb-4">
                The growth of the global organic food market has encouraged us to formalize what nature 
                already provides. Since 2013, we have certified and registered over 9,000 cocoa and 2,000 
                coffee farmers through our IMS team, who train farmers on required organic farming practices.
              </p>
              <p className="text-brown-600 leading-relaxed mb-8">
                Our teams work closely with farmers to plant more cocoa and coffee seedlings — improving 
                not just quantity, but quality, management, and long-term sustainability of what is planted. 
                Block-farming schemes are expanding plantation areas and securing both supply and farmer livelihoods.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-forest-100 px-4 py-2 rounded-full">
                  <span className="text-forest-700 text-sm font-medium">🌿 No synthetic inputs</span>
                </div>
                <div className="flex items-center gap-2 bg-forest-100 px-4 py-2 rounded-full">
                  <span className="text-forest-700 text-sm font-medium">🔄 Natural fermentation</span>
                </div>
                <div className="flex items-center gap-2 bg-forest-100 px-4 py-2 rounded-full">
                  <span className="text-forest-700 text-sm font-medium">☀️ Sun drying only</span>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="https://static.wixstatic.com/media/879aa2_e998c0bce14e4395b9c377ea040d5e86~mv2_d_6000_4000_s_4_2.jpg"
                alt="Organic cocoa farming"
                width={560}
                height={460}
                className="rounded-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRACEABILITY */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">EU CSDDD Ready</span>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2">Full Supply Chain Traceability</h2>
            <p className="text-brown-500 mt-4 max-w-2xl mx-auto">
              Our Internal Management System (IMS/ICS) tracks every bag from individual farmer to 
              export container — providing buyers with the documentation needed for European 
              Corporate Sustainability Due Diligence Directive compliance.
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-brown-200 mx-24" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {traceabilitySteps.map((step, i) => (
                <div key={step.stage} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brown-900 rounded-full flex items-center justify-center text-gold-400 font-bold text-lg z-10 mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-brown-800 text-sm mb-2">{step.stage}</h3>
                  <p className="text-brown-500 text-xs leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-brown-500 text-sm mb-4">
              Need CSDDD-compliant documentation for your sourcing audit?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-700 text-cream-100 px-6 py-3 rounded-md text-sm font-semibold transition-colors"
            >
              Request Traceability Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 text-xs font-semibold uppercase tracking-widest">UN Sustainable Development Goals</span>
            <h2 className="font-serif text-3xl font-bold text-brown-900 mt-2">Our SDG Alignment</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgs.map((sdg) => (
              <div key={sdg.number} className="border border-brown-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-forest-800 rounded-lg flex items-center justify-center text-gold-400 font-bold text-sm">
                    {sdg.number}
                  </div>
                  <h3 className="font-serif font-semibold text-brown-900">SDG {sdg.number}: {sdg.title}</h3>
                </div>
                <p className="text-brown-500 text-sm leading-relaxed">{sdg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-cream-100 mb-4">
                Certified by Control Union
              </h2>
              <p className="text-brown-300 leading-relaxed mb-6">
                Certifications are valuable and necessary tools to monitor standard quality farming practices. 
                Control Union is our main certification partner. Since we started certification, 
                our products carry both organic and Fairtrade status — verified annually by independent auditors.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors"
              >
                View full product specifications
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 items-center justify-center">
              {[
                { src: "https://static.wixstatic.com/media/879aa2_558c841a58ea4b438865f941314756cd~mv2.png", label: "EU Organic" },
                { src: "https://static.wixstatic.com/media/879aa2_c9af659a196c4664903297e9af75dd73~mv2.png", label: "USDA NOP" },
                { src: "https://static.wixstatic.com/media/879aa2_9a97187d96194550b005d878b2888694~mv2.png", label: "Fairtrade" },
              ].map((cert) => (
                <div key={cert.label} className="flex flex-col items-center gap-2">
                  <Image src={cert.src} alt={cert.label} width={72} height={72} className="h-18 w-18 object-contain" />
                  <span className="text-brown-300 text-xs">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
