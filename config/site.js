// Single source of truth for navbar, footer, SEO and sitemap.
// Replace every value marked "placeholder" with your real details.

const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
const url = rawUrl.replace(/\/+$/, ""); // no trailing slash, so `${url}${path}` is always safe

export const siteConfig = {
  name: "Apna University",
  shortName: "Apna Uni",
  tagline: "Learn. Build. Grow.",
  description:
    "Apna University offers industry-focused degrees, short courses and expert instructors, with a modern online learning platform built on Next.js and Firebase.",
  url,
  locale: "en_PK",
  themeColor: "#0F2A4A",
  ogImage: "/images/og.png", // 1200x630; use absoluteUrl(siteConfig.ogImage) for full URL
  keywords: [
    "university",
    "online courses",
    "degree programs",
    "Pakistan",
    "learning platform",
    "instructors",
  ],

  // placeholders: replace with your real details
  contact: {
    email: "info@apnauniversity.edu.pk",
    admissionsEmail: "admissions@apnauniversity.edu.pk",
    careersEmail: "careers@apnauniversity.edu.pk",
    phone: "+92 51 000 0000",
    whatsapp: "https://wa.me/920000000000",
    address: "Islamabad, Pakistan",
    hours: "Mon to Fri, 9:00 am to 5:00 pm",
  },

  // placeholders: replace handles. `twitter` kept for backwards compatibility (twitter.com now redirects to x.com)
  links: {
    twitter: "https://x.com/apnauniversity",
    facebook: "https://facebook.com/apnauniversity",
    instagram: "https://instagram.com/apnauniversity",
    linkedin: "https://linkedin.com/school/apnauniversity",
    youtube: "https://youtube.com/@apnauniversity",
    github: "https://github.com/apnauniversity",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Instructors", href: "/instructors" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Ask about admission", href: "/contact" },

  authLinks: {
    login: { label: "Log in", href: "/login" },
    register: { label: "Sign up", href: "/register" },
    dashboard: { label: "Dashboard", href: "/dashboard" },
  },

  footerLinks: {
    product: [
      { label: "Courses", href: "/courses" },
      { label: "Instructors", href: "/instructors" },
      { label: "Pricing", href: "/pricing" },
      { label: "Skills", href: "/skills" },
      { label: "Verify Certificate", href: "/certificates/verify" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/help" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
};

// Ready-to-map footer columns, in display order.
export const footerColumns = [
  { title: "Learn", links: siteConfig.footerLinks.product },
  { title: "Resources", links: siteConfig.footerLinks.resources },
  { title: "Company", links: siteConfig.footerLinks.company },
  { title: "Legal", links: siteConfig.footerLinks.legal },
];

// Social links as an array (skips empty ones) for rendering icon rows.
export const socialLinks = Object.entries(siteConfig.links)
  .filter(([, href]) => Boolean(href))
  .map(([key, href]) => ({
    key,
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

// Unique public routes: use in app/sitemap.js.
export const publicRoutes = [
  ...new Set(
    [...siteConfig.nav, ...Object.values(siteConfig.footerLinks).flat()].map(
      (l) => l.href,
    ),
  ),
];

export const absoluteUrl = (path = "") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

// Highlights the current nav item: "/" only matches exactly, "/courses" also matches "/courses/abc".
export const isActiveLink = (pathname, href) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

// Use in app/layout.jsx: export const metadata = siteMetadata;
export const siteMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: siteConfig.themeColor };
