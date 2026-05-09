"use client";

import type { Metadata } from "next";
import { useState } from "react";

// Note: metadata export doesn't work in client components; see contact/metadata.ts pattern
// For now using a separate metadata approach via layout

const products = ["Cocoa Beans — Grade 1", "Cocoa Beans — Grade 2", "Robusta Coffee Beans", "Both Cocoa and Coffee"];
const volumes = ["16–50 MT", "50–100 MT", "100–250 MT", "250+ MT", "Not yet determined"];
const incoterms = ["FOB Freetown (as offered)", "CIF", "CFR", "Other"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    volume: "",
    incoterms: "",
    deliveryWindow: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to API route or Formspree/Resend
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-brown-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-100 mt-2">Request a Quote</h1>
          <p className="text-brown-300 mt-4 max-w-xl">
            Complete the form below and our export team will respond within 24 hours with 
            current availability, pricing, and a sample offer.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* CONTACT SIDEBAR */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-brown-100 rounded-xl p-6">
                <h2 className="font-serif font-bold text-brown-900 text-lg mb-5">Contact Information</h2>
                <ul className="space-y-5">
                  <li className="flex gap-3">
                    <div className="w-9 h-9 bg-brown-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-brown-800 text-sm">Address</p>
                      <p className="text-brown-500 text-sm mt-0.5">227 Hanga Road, Kenema<br />Sierra Leone</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-9 h-9 bg-brown-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-brown-800 text-sm">Email</p>
                      <a href="mailto:info@tasstores.com" className="text-gold-600 hover:text-gold-500 text-sm transition-colors">
                        info@tasstores.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-9 h-9 bg-brown-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-brown-800 text-sm">Phone</p>
                      <a href="tel:+23276111112" className="text-brown-500 hover:text-brown-700 text-sm transition-colors">
                        +232 76 111112
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-9 h-9 bg-brown-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-brown-800 text-sm">Business Hours</p>
                      <p className="text-brown-500 text-sm mt-0.5">Mon–Fri: 07:00 – 21:00<br />Saturday: 11:00 – 22:00</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/23276111112?text=Hello%20TAS%20Stores%2C%20I%20am%20interested%20in%20purchasing%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-5 py-4 rounded-xl font-semibold transition-colors w-full"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <div>
                  <div className="text-sm font-bold">WhatsApp Business</div>
                  <div className="text-xs text-green-100">Fastest response</div>
                </div>
              </a>

              <div className="bg-gold-100 border border-gold-400/30 rounded-xl p-5">
                <h3 className="font-semibold text-brown-800 text-sm mb-2">🚢 Export Terms</h3>
                <ul className="text-brown-600 text-xs space-y-1">
                  <li>• FOB Freetown (standard)</li>
                  <li>• Minimum 16 MT cocoa / 20 MT coffee</li>
                  <li>• Price basis: LIFFE</li>
                  <li>• Payment via swift transfer</li>
                </ul>
              </div>
            </div>

            {/* RFQ FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-brown-100 rounded-xl p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="font-serif text-2xl font-bold text-brown-900 mb-3">Quote Request Received!</h2>
                    <p className="text-brown-500 max-w-md mx-auto">
                      Thank you, {form.name}. Our export team will review your request and 
                      respond to {form.email} within 24 hours with pricing and availability.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-brown-900 mb-2">Request for Quotation</h2>
                    <p className="text-brown-500 text-sm mb-8">
                      Please provide as much detail as possible to help us prepare the most accurate quote.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal info */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-brown-400 mb-4">Your Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={form.name}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Company *</label>
                            <input
                              type="text"
                              name="company"
                              required
                              value={form.company}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                              placeholder="Acme Chocolates B.V."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Business Email *</label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                              placeholder="you@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Country *</label>
                            <input
                              type="text"
                              name="country"
                              required
                              value={form.country}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                              placeholder="Netherlands"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Order details */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-brown-400 mb-4">Order Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Product *</label>
                            <select
                              name="product"
                              required
                              value={form.product}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                            >
                              <option value="">Select product...</option>
                              {products.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Volume Required *</label>
                            <select
                              name="volume"
                              required
                              value={form.volume}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                            >
                              <option value="">Select volume...</option>
                              {volumes.map((v) => <option key={v} value={v}>{v}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Preferred Incoterms</label>
                            <select
                              name="incoterms"
                              value={form.incoterms}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                            >
                              <option value="">Select Incoterms...</option>
                              {incoterms.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brown-700 mb-1.5">Delivery Window</label>
                            <input
                              type="text"
                              name="deliveryWindow"
                              value={form.deliveryWindow}
                              onChange={handleChange}
                              className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white"
                              placeholder="e.g. Q3 2025, within 60 days"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-brown-700 mb-1.5">
                          Additional Requirements or Questions
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          className="w-full border border-brown-200 rounded-lg px-4 py-2.5 text-sm text-brown-800 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 bg-white resize-none"
                          placeholder="Grade preference, certification requirements, port of destination, sample request..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brown-900 hover:bg-brown-800 text-cream-100 py-4 rounded-lg font-semibold text-sm transition-colors"
                      >
                        Submit Quote Request
                      </button>

                      <p className="text-brown-400 text-xs text-center">
                        We respond to all inquiries within 24 hours. Your information is never shared with third parties.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
