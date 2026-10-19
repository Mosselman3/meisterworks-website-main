import type { Metadata } from "next";
import Script from "next/script";
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
      suppressHydrationWarning
    >
      <body className={lato.className}>
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
          data-cookieconsent="ignore"
        >
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_personalization:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted',
  wait_for_update:500
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);`}
        </Script>
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          data-cookieconsent="ignore"
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.setAttribute('data-cookieconsent','ignore');j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4GSSZBX');`}
        </Script>
        <Script
          id="cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="4fffca42-0367-4be2-bb86-65159a8d4cd6"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <Script id="site-motion" strategy="beforeInteractive">
          {`try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")}catch(e){}`}
        </Script>
        <div className="flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
