import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import WindowSizeListener from "../listeners/WindowSizeListener";
import "./styles/globals.css";
import { SnackbarProvider } from "@/app/components/SnackbarContext"

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.diplomaticfreight.com"),
  alternates: {
    canonical: "https://www.diplomaticfreight.com",
  },
  title: "Home - Diplomatic Freight & Logistic Services Ltd.",
  description: "We guarantee fast, reliable and secure logistics solutions tailored to your needs.",
  applicationName: "Diplomatic Freight",
  authors: [{ name: "Diplomatic Freight & Logistic Services Ltd." }],
  creator: "Diplomatic Freight",
  publisher: "Diplomatic Freight & Logistic Services Ltd.",
  category: "business",
  keywords: [
    "diplomatic",
    "diplomatic freight",
    "logistics services",
    "freight forwarding",
    "cargo transport",
    "supply chain solutions",
    "international shipping",
    "customs clearance",
    "warehousing",
    "distribution services",
    "diplomatic logistics",
    "freight services",
    "cargo shipping",
    "transport services",
    "customs clearance",
    "GHANA logistics",
    "import export services",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Diplomatic Freight® - Diplomatic Freight and Logistic Services",
    description:
      "At Diplomatic Freight and Logistics, we specialize in delivering reliable, time-critical air cargo and freight solutions across the globe.",
    url: "/",
    siteName: "Diplomatic Freight",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diplomatic Freight & Logistics",
      },
    ],
    type: "website",
  },
  twitter: {
  card: "summary_large_image",
  site: "@dip_freight",
  title: "Diplomatic Freight & Logistic Services Ltd.",
  description:
      "At Diplomatic Freight and Logistics, we specialize in delivering reliable, time-critical air cargo and freight solutions across the globe.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LogisticsCompany",
              name: "Diplomatic Freight & Logistics Services Ltd.",
              description:
                "At Diplomatic Freight and Logistics, we specialize in delivering reliable, time-critical air cargo and freight solutions across the globe.",
              url: "https://www.diplomaticfreight.com",
              logo: "https://www.diplomaticfreight.com/logo.png",
              image: "https://www.diplomaticfreight.com/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Aviance Cargo Village, Kotoka International Airport",
                addressLocality: "Accra",
                addressRegion: "Greater Accra",
                addressCountry: "GH",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "030 290 8064",
                contactType: "customer service",
              },
              sameAs: [
                "https://www.x.com/dip_freight",
                "https://www.instagram.com/diplomaticfreight",
                "https://www.facebook.com/diplomaticfreight",
                "https://www.linkedin.com/company/diplomaticfreight"
              ],
              areaServed: ["GH", "West Africa", "Worldwide"],
              serviceType: [
                "Air Freight",
                "Freight Forwarding",
                "Logistics",
                "Cargo Handling",
                "Sea Freight",
                "Warehousing",
                "Transportation Services",
              ],
            }),
          }}
        />

      </head>
      <body
        className={`${plusJakartaSans.variable} ${ibmPlexSansCondensed.variable} antialiased`}
      >
        <WindowSizeListener />
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
