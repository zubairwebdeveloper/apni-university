import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  ClipboardList,
  CreditCard,
  ExternalLink,
  FileText,
  FolderTree,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Library,
  MessageSquareQuote,
  PlayCircle,
  Settings,
  Ticket,
  UserCog,
  Users,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Dashboard Navigation
|--------------------------------------------------------------------------
| Admin dashboard ke liye saare LMS management links available hain.
|--------------------------------------------------------------------------
*/

export const NAV_SECTIONS = [
  // --------------------------------------------------
  // MAIN
  // --------------------------------------------------
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        soon: false,
      },
    ],
  },

  // --------------------------------------------------
  // CONTENT
  // --------------------------------------------------
  {
    title: "Content",
    items: [
      {
        label: "Courses",
        href: "/dashboard/courses",
        icon: BookOpen,
        soon: false,
      },
      {
        label: "Categories",
        href: "/dashboard/categories",
        icon: FolderTree,
        soon: false,
      },
      {
        label: "Lessons",
        href: "/dashboard/lessons",
        icon: PlayCircle,
        soon: false,
      },
      {
        label: "Instructors",
        href: "/dashboard/instructors",
        icon: GraduationCap,
        soon: false,
      },
      {
        label: "Blog",
        href: "/dashboard/blog",
        icon: FileText,
        soon: false,
      },
      {
        label: "Careers",
        href: "/dashboard/careers",
        icon: Briefcase,
        soon: false,
      },
    ],
  },

  // --------------------------------------------------
  // PEOPLE
  // --------------------------------------------------
  {
    title: "People",
    items: [
      {
        label: "Students",
        href: "/dashboard/students",
        icon: Users,
        soon: false,
      },
      {
        label: "Enrollments",
        href: "/dashboard/enrollments",
        icon: ClipboardList,
        soon: false,
      },
      {
        label: "Users & Roles",
        href: "/dashboard/users",
        icon: UserCog,
        soon: false,
      },
    ],
  },

  // --------------------------------------------------
  // BUSINESS
  // --------------------------------------------------
  {
    title: "Business",
    items: [
      {
        label: "Reviews",
        href: "/dashboard/reviews",
        icon: MessageSquareQuote,
        soon: false,
      },
      {
        label: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
        soon: false,
      },
      {
        label: "Coupons",
        href: "/dashboard/coupons",
        icon: Ticket,
        soon: false,
      },
      {
        label: "Certificates",
        href: "/dashboard/certificates",
        icon: Award,
        soon: false,
      },
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
        soon: false,
      },
    ],
  },

  // --------------------------------------------------
  // SYSTEM
  // --------------------------------------------------
  {
    title: "System",
    items: [
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
        soon: false,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        soon: false,
      },
    ],
  },
];

// --------------------------------------------------
// FOOTER
// --------------------------------------------------

export const NAV_FOOTER = [
  {
    label: "View Website",
    href: "/",
    icon: ExternalLink,
    soon: false,
  },
  {
    label: "Help Center",
    href: "/help",
    icon: LifeBuoy,
    soon: false,
  },
  {
    label: "Course Catalog",
    href: "/courses",
    icon: Library,
    soon: false,
  },
];

// --------------------------------------------------
// ALL NAVIGATION
// --------------------------------------------------

export function getNavSections() {
  return NAV_SECTIONS;
}

// --------------------------------------------------
// FLAT NAVIGATION
// --------------------------------------------------

export const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

// --------------------------------------------------
// ACTIVE NAVIGATION
// --------------------------------------------------

export const isNavActive = (pathname, href) =>
  href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

// --------------------------------------------------
// CURRENT NAV ITEM
// --------------------------------------------------

export const findNavItem = (pathname) =>
  NAV_SECTIONS.flatMap((section) => section.items).find((item) =>
    isNavActive(pathname, item.href),
  );
