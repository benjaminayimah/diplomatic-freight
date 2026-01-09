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
  title: "Home - Diplomatic Freight & Logistic Services Ltd.",
  description: "We guarantee fast, reliable and secure logistics solutions tailored to your needs.",
  openGraph: {
    title: "Diplomatic Freight & Logistic Services Ltd.",
    description:
      "Fast, reliable and secure logistics solutions tailored to your needs.",
    url: "https://diplomatic-freight.vercel.app",
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
    title: "Diplomatic Freight & Logistic Services Ltd.",
    description:
      "Fast, reliable and secure logistics solutions tailored to your needs.",
    images: ["/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
