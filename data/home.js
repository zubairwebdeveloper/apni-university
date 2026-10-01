import {
  BadgeCheck, BarChart3, BedDouble, Briefcase, Bus, Code2, Coffee, Compass, FlaskConical, HeartHandshake,
  Languages, Library, Lightbulb, Megaphone, Palette, ShieldCheck, Smartphone, Target, Trophy, Wallet,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// All home-page copy lives here. Numbers, dates and claims are PLACEHOLDERS:
// edit them to match your real university before publishing.
// ─────────────────────────────────────────────────────────────────────────────

const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: img("photo-1523240795612-9a054b0db644", 1000),
  campus: img("photo-1562774053-701939374585", 900),
  study: img("photo-1522202176988-66273c2fd55f", 900),
};

export const popularSearches = ["Web Development", "Data Science", "Design", "Business"];

export const stats = [
  { value: 25000, suffix: "+", label: "Students enrolled" },
  { value: 150, suffix: "+", label: "Programs and courses" },
  { value: 50, suffix: "+", label: "Expert instructors" },
  { value: 98, suffix: "%", label: "Student satisfaction" },
];

export const about = {
  mission: "To give every learner practical, affordable and globally relevant education that leads to real careers.",
  vision: "To be the most trusted place in the region for learning skills that employers actually need.",
  points: [
    "Recognized, accredited degree and certificate programs",
    "Curriculum reviewed with an industry advisory board",
    "Project-based learning with mentor feedback",
    "Clear academic policies and transparent fees",
  ],
  values: [
    { icon: Target, title: "Excellence", text: "High standards in teaching, assessment and student support." },
    { icon: ShieldCheck, title: "Integrity", text: "Honest communication on fees, outcomes and academic conduct." },
    { icon: Lightbulb, title: "Innovation", text: "Modern tools, flexible delivery and constantly improving courses." },
  ],
};

export const programs = [
  { icon: Code2, title: "Web Development", text: "Frontend, backend and full-stack engineering with real projects.", tag: "Most popular" },
  { icon: Smartphone, title: "Mobile Apps", text: "Build and publish iOS and Android apps from idea to store." },
  { icon: BarChart3, title: "Data Science", text: "Analytics, machine learning and decision-making with data." },
  { icon: Palette, title: "Design", text: "UI/UX, branding and visual design for digital products." },
  { icon: Briefcase, title: "Business", text: "Management, finance and entrepreneurship for the modern workplace." },
  { icon: Megaphone, title: "Marketing", text: "Digital marketing, content and growth strategy that converts." },
  { icon: Languages, title: "Language", text: "English and communication skills for study, work and travel." },
];

export const admissionSteps = [
  { title: "Explore programs", text: "Browse programs and compare level, duration and fees to find your fit." },
  { title: "Apply online", text: "Send the short application form and tell us which program you want." },
  { title: "Submit documents", text: "Share your transcripts and ID. Some programs include a short entry assessment or interview." },
  { title: "Confirm your seat", text: "Pay the admission fee and receive your enrollment confirmation and orientation details." },
];

// EDIT: replace with your real admission calendar
export const keyDates = [
  { label: "Applications open", value: "1 October 2026" },
  { label: "Application deadline", value: "15 January 2027" },
  { label: "Entry assessment", value: "Late January 2027" },
  { label: "Classes begin", value: "February 2027" },
];

export const documents = [
  "Previous academic transcripts",
  "Copy of CNIC or B-Form",
  "Recent passport-size photographs",
  "Domicile certificate (if applicable)",
  "Application fee receipt",
];

export const scholarships = [
  { icon: BadgeCheck, title: "Merit-based", text: "For top performers in previous exams and the entry assessment." },
  { icon: HeartHandshake, title: "Need-based", text: "Financial support for capable students who need help with fees." },
  { icon: Trophy, title: "Talent and sports", text: "Recognition for national-level achievements in sports and the arts." },
  { icon: Wallet, title: "Family discount", text: "Reduced fees when siblings or relatives enroll together." },
];

export const facilities = [
  { icon: Library, title: "Digital library", text: "Thousands of books, journals and quiet study spaces." },
  { icon: FlaskConical, title: "Modern labs", text: "Computer, design and science labs with current equipment." },
  { icon: Compass, title: "Career center", text: "CV reviews, mock interviews and internship placement." },
  { icon: Trophy, title: "Sports and clubs", text: "Teams, societies and events beyond the classroom." },
  { icon: BedDouble, title: "Hostel", text: "Safe, comfortable accommodation near the campus." },
  { icon: Bus, title: "Transport", text: "Convenient pick-and-drop routes across the city." },
  { icon: HeartHandshake, title: "Student support", text: "Advisors, counselling and help with any academic issue." },
  { icon: Coffee, title: "Cafeteria", text: "Affordable meals and a place to meet between classes." },
];

export const gallery = [
  { src: img("photo-1562774053-701939374585", 900), alt: "Main university building", span: "sm:col-span-2 sm:row-span-2" },
  { src: img("photo-1481627834876-b7833e8f5570", 700), alt: "Students in the library", span: "" },
  { src: img("photo-1523050854058-8df90110c9f1", 700), alt: "Graduation ceremony", span: "" },
  { src: img("photo-1522202176988-66273c2fd55f", 700), alt: "Students studying together", span: "" },
  { src: img("photo-1532094349884-543bc11b234d", 700), alt: "Science laboratory", span: "" },
];

export const faqs = [
  { q: "Who can apply?", a: "Anyone who meets the minimum education requirement of the program they choose. Each program page lists its own eligibility, and our admissions team can help if you are unsure." },
  { q: "What are the application deadlines?", a: "Applications for the next intake close on the date shown in the admissions section above. We recommend applying early because seats in popular programs fill quickly." },
  { q: "How much are the fees?", a: "Fees depend on the program and its duration. You will find the fee on every program page. Contact admissions to ask about payment plans and available discounts." },
  { q: "Are scholarships available?", a: "Yes. We offer merit-based, need-based, talent and sports scholarships, plus family discounts. Mention your interest in the application form and the team will guide you." },
  { q: "Can I study online or part-time?", a: "Many of our programs are flexible and can be completed alongside work or other studies. Check the delivery format listed on each program page." },
  { q: "What will I receive when I finish?", a: "You will receive the certificate or degree stated on your program page. Completed programs also come with a certificate that employers can verify." },
  { q: "Do you help with jobs and internships?", a: "Our career center supports students with CV reviews, interview practice, internships and introductions to hiring partners." },
  { q: "How can I contact admissions?", a: "Use the contact page, call our admissions desk or visit the campus during office hours. We usually reply within one working day." },
];

// ---------- fallback content shown if Firestore is empty or unreachable ----------
const day = 86400000;
export const fallbackCourses = [
  { id: null, title: "Full Stack Web Development", description: "Learn modern frontend and backend development by building real-world projects from scratch.", category: "Web Development", level: "Beginner", price: 45000, duration: 32, students: 1240, thumbnail: img("photo-1498050108023-c5249f4df085", 900) },
  { id: null, title: "Data Analysis with Python", description: "Clean, analyze and visualize data to support decisions, with hands-on case studies.", category: "Data Science", level: "Intermediate", price: 52000, duration: 28, students: 870, thumbnail: img("photo-1551288049-bebda4e38f71", 900) },
  { id: null, title: "Modern UI/UX Design", description: "Design accessible, conversion-focused digital products from research to prototype.", category: "Design", level: "Beginner", price: 38000, duration: 18, students: 620, thumbnail: img("photo-1558655146-d09347e92766", 900) },
];

export const fallbackFaculty = [
  { id: null, name: "Dr. Ayesha Khan", headline: "Professor of Computer Science", specialty: "Web Development", experience: 14, avatar: img("photo-1573496359142-b8d87734a5a2", 500) },
  { id: null, name: "Hamza Raza", headline: "Senior Data Scientist", specialty: "Data Science", experience: 9, avatar: img("photo-1507003211169-0a1dd7228f2d", 500) },
  { id: null, name: "Sara Malik", headline: "Lead Product Designer", specialty: "Design", experience: 8, avatar: img("photo-1580489944761-15a19d654956", 500) },
  { id: null, name: "Usman Tariq", headline: "Business and Strategy Mentor", specialty: "Business", experience: 12, avatar: img("photo-1500648767791-00dcc994a43e", 500) },
];

export const fallbackReviews = [
  { id: null, reviewer: "Ahmed Khan", reviewerRole: "Full Stack Developer", rating: 5, comment: "The practical projects helped me understand concepts much faster than traditional courses. I landed my first role within two months." },
  { id: null, reviewer: "Sara Ali", reviewerRole: "UI/UX Designer", rating: 5, comment: "Everything feels focused on skills that matter in the real world, and the instructors genuinely care about feedback." },
  { id: null, reviewer: "Usman Raza", reviewerRole: "Freelancer", rating: 5, comment: "The courses gave me the confidence to start taking real client projects. The community support was a big help." },
];

export const fallbackPosts = [
  { id: null, slug: null, title: "5 ways to prepare for your first semester", excerpt: "From planning your timetable to building study habits, here is how to start strong.", category: "Study Tips", coverImage: img("photo-1434030216411-0b793f4b4173", 900), createdAt: Date.now() - 4 * day },
  { id: null, slug: null, title: "Choosing a program: a simple decision guide", excerpt: "Interests, job market and learning style: a quick framework to pick the right path.", category: "Career Advice", coverImage: img("photo-1523240795612-9a054b0db644", 900), createdAt: Date.now() - 11 * day },
  { id: null, slug: null, title: "Spring 2027 admissions are open", excerpt: "Everything you need to know about dates, documents and scholarships for the new intake.", category: "Announcements", coverImage: img("photo-1562774053-701939374585", 900), createdAt: Date.now() - 18 * day },
];
