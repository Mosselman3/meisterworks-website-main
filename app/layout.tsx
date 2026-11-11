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

const CONSENT_MODE_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_personalization:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted',
  wait_for_update:2000
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
window.addEventListener('CookiebotOnConsentReady',function(){
  var consent=window.Cookiebot&&window.Cookiebot.consent;
  if(!consent)return;
  var marketing=consent.marketing?'granted':'denied';
  var statistics=consent.statistics?'granted':'denied';
  var preferences=consent.preferences?'granted':'denied';
  gtag('consent','update',{
    ad_personalization:marketing,
    ad_storage:marketing,
    ad_user_data:marketing,
    analytics_storage:statistics,
    functionality_storage:preferences,
    personalization_storage:preferences
  });
});
var cookiebot=document.createElement('script');
cookiebot.id='Cookiebot';
cookiebot.async=false;
cookiebot.src='https://consent.cookiebot.com/uc.js';
cookiebot.setAttribute('data-cbid','4fffca42-0367-4be2-bb86-65159a8d4cd6');
cookiebot.setAttribute('data-blockingmode','auto');
cookiebot.onload=function(){
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.setAttribute('data-cookieconsent','ignore');j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M4GSSZBX');
  var chat=document.createElement('script');
  chat.id='avanza-chat';
  chat.text='(function(w){var api=w.AvanzaChat=w.AvanzaChat||{};api.q=api.q||[];api.open=api.open||function(payload){api.q.push(["open",payload]);return false;};api.executePrompt=api.executePrompt||function(payload){api.q.push(["executePrompt",payload]);return false;};api.close=api.close||function(){api.q.push(["close"]);return false;};})(window);window.AVANZACHAT_CONFIG={organizationId:"1e5ac2c3-97a7-4b97-a007-27dce9f6b325",apiEndpoint:"https://api.avanza.chat"};';
  document.body.appendChild(chat);
  var widget=document.createElement('script');
  widget.src='https://api.avanza.chat/widget.js';
  document.body.appendChild(widget);
};
document.head.appendChild(cookiebot);`;

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
        <Script id="site-motion" strategy="beforeInteractive">
          {`try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")}catch(e){}`}
        </Script>
        <div className="flex min-h-dvh flex-col">{children}</div>
        <script
          id="google-consent-mode"
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{ __html: CONSENT_MODE_SCRIPT }}
        />
      </body>
    </html>
  );
}
