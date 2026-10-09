import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

const defaultTitle = "Meisterworks — Maatwerk in staal & glas";
const defaultDescription = "Maatwerk in staal en glas";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s — Meisterworks",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Meisterworks",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Stalen taatsdeur van Meisterworks" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [
      {
        url: "/assets/logo.jpg",
        type: "image/jpeg",
        sizes: "180x180",
      },
    ],
    apple: [
      {
        url: "/assets/logo.jpg",
        type: "image/jpeg",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${cormorantGaramond.variable} ${lato.variable} h-full antialiased`}
    >
      <body className={`${lato.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
