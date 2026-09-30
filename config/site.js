export const siteConfig = {
  name: "Apna University",
  description:
    "A modern platform to build, learn, and grow — built with Next.js and Firebase.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og.png",
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Instructors", href: "/instructors" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  footerLinks: {
    product: [
      { label: "Courses", href: "/courses" },
      { label: "Pricing", href: "/pricing" },
      { label: "Instructors", href: "/instructors" },
      { label: "Skills", href: "/skills" },
      { label: "Careers", href: "/careers" },
    ],
    resources: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};
