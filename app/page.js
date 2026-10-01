import AboutSection from "@/components/home/AboutSection";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import CampusSection from "@/components/home/CampusSection";
import CareersBand from "@/components/home/CareersBand";
import ContactCta from "@/components/home/ContactCta";
import FacultySection from "@/components/home/FacultySection";
import FaqSection from "@/components/home/FaqSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import NewsSection from "@/components/home/NewsSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";
import StatsBand from "@/components/home/StatsBand";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { siteConfig } from "@/config/site";
import { faqs } from "@/data/home";
import { getHomeData } from "@/lib/home/getHomeData";

export const metadata = {
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

// Re-fetch Firestore data at most every 5 minutes instead of on every request.
export const revalidate = 300;

const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export default async function HomePage() {
  const { courses, faculty, reviews, posts } = await getHomeData();
  const c = siteConfig.contact;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address: { "@type": "PostalAddress", streetAddress: c.address },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: c.phone,
      email: c.admissionsEmail,
      contactType: "admissions",
    },
    sameAs: Object.values(siteConfig.links).filter(Boolean),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <AnnouncementBar />
      <main className="overflow-x-clip">
        <Hero />
        <StatsBand />
        <AboutSection />
        <ProgramsSection />
        <FeaturedCourses courses={courses} />
        <AdmissionsSection />
        <ScholarshipsSection />
        <CampusSection />
        <FacultySection faculty={faculty} />
        <TestimonialsSection reviews={reviews} />
        <NewsSection posts={posts} />
        <FaqSection />
        <CareersBand />
        <ContactCta />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json(faqSchema) }}
      />
    </>
  );
}
