const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const images = {
  campus: img("photo-1541339907198-e08756dedf3f"),
  graduation: img("photo-1523050854058-8df90110c9f1"),
  students: img("photo-1522202176988-66273c2fd55f"),
  study: img("photo-1498243691581-b145c3f54a5a"),
};

export const stats = [
  { label: "Students", value: "12,000+" },
  { label: "Faculty members", value: "600+" },
  { label: "Degree programs", value: "45" },
  { label: "Graduates employed within 6 months", value: "88%" },
];

export const courses = [
  { name: "BS Computer Science", duration: "4 years", desc: "Programming, algorithms, databases, AI and software engineering." },
  { name: "BS Software Engineering", duration: "4 years", desc: "Build, test and ship real software in team projects." },
  { name: "BBA (Business Administration)", duration: "4 years", desc: "Management, marketing, finance and entrepreneurship." },
  { name: "BS Electrical Engineering", duration: "4 years", desc: "Circuits, power systems, electronics and embedded systems." },
  { name: "BS Data Science", duration: "4 years", desc: "Statistics, machine learning, data visualization and big data." },
  { name: "MS Computer Science", duration: "2 years", desc: "Research-focused postgraduate degree with a thesis option." },
];

export const skills = [
  { title: "Web Development", items: ["HTML, CSS, JavaScript", "React and Next.js", "Node.js and REST APIs"] },
  { title: "Data and AI", items: ["Python and SQL", "Machine learning basics", "Data visualization"] },
  { title: "Communication", items: ["Technical writing", "Presentations", "Teamwork and leadership"] },
  { title: "Professional Tools", items: ["Git and GitHub", "Agile and Scrum", "Project management"] },
];

export const careers = [
  { role: "Software Engineer", note: "Work at product companies, startups and software houses." },
  { role: "Data Analyst / Data Scientist", note: "Turn data into decisions in banks, telecom and e-commerce." },
  { role: "Business Analyst", note: "Bridge the gap between business needs and technical teams." },
  { role: "Freelancer / Entrepreneur", note: "Our incubation center helps students launch their own ventures." },
  { role: "Researcher / Lecturer", note: "Continue to MS or PhD and join academia." },
];
