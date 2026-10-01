import { DM_Sans, Source_Serif_4 } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";

/*
|--------------------------------------------------------------------------
| Fonts
|--------------------------------------------------------------------------
| Source Serif 4 → University headings / academic identity
| DM Sans        → Body, navigation, buttons and UI
|--------------------------------------------------------------------------
*/

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Apni University — Learn, Grow & Build Your Future",
    template: `%s | Apni University`,
  },

  description:
    "Apni University is a modern learning platform designed to help students learn practical skills, explore new opportunities, and build a successful future through quality education.",

  keywords: [
    "Apni University",
    "online university",
    "online learning",
    "education",
    "courses",
    "students",
    "professional development",
    "web development",
    "programming",
    "technology",
    "business",
    "design",
    "career development",
  ],

  authors: [
    {
      name: "Apni University",
    },
  ],

  creator: "Apni University",

  publisher: "Apni University",

  applicationName: "Apni University",

  category: "Education",

  openGraph: {
    title: "Apni University — Learn, Grow & Build Your Future",

    description:
      "Learn practical skills, discover new opportunities, and build your future with Apni University.",

    url: siteConfig.url,

    siteName: "Apni University",

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Apni University",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Apni University — Learn, Grow & Build Your Future",

    description:
      "A modern learning platform for students who want to learn, grow, and build their future.",

    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/*
|--------------------------------------------------------------------------
| Viewport
|--------------------------------------------------------------------------
*/

export const viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#09090b",
    },
  ],
};

/*
|--------------------------------------------------------------------------
| Root Layout
|--------------------------------------------------------------------------
*/

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${dmSans.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />

            <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
              {children}
            </main>

            <Footer />

            <Toaster richColors position="top-right" closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
