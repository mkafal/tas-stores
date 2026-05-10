import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import VideoIntro from "@/components/VideoIntro";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TAS Stores | Premium Cocoa & Coffee Exporter — Sierra Leone",
    template: "%s | TAS Stores",
  },
  description:
    "TAS Stores is Sierra Leone's leading exporter of EU Organic, USDA Organic, and Fairtrade certified cocoa and coffee beans. Supplying premium-grade produce to Europe and North America since 2000.",
  keywords: [
    "Sierra Leone cocoa export",
    "organic cocoa beans",
    "Fairtrade coffee",
    "USDA organic cocoa",
    "cocoa exporter West Africa",
    "Robusta coffee beans Sierra Leone",
  ],
  openGraph: {
    title: "TAS Stores | Premium Cocoa & Coffee Exporter — Sierra Leone",
    description:
      "EU Organic, USDA Organic & Fairtrade certified. 10,000+ farmers. 2,800 MT exported annually.",
    url: "https://www.tasstores.com",
    siteName: "TAS Stores",
    images: [
      {
        url: "https://static.wixstatic.com/media/879aa2_09237f59097b44a18b80470f90dfdca8~mv2.png",
        width: 2500,
        height: 1330,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <VideoIntro />
        <ScrollRevealInit />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
