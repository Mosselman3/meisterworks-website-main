import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Meisterworks",
  description: "Maatwerk in staal en glas",
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
