export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  technologies: string[];
  benefits: string[];
  process: string[];
  featured: boolean;
  stats?: { label: string; value: string }[];
}

export const services: Service[] = [
  {
    id: "general-mobile-app-development",
    slug: "general-mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "End-to-end mobile products for iOS and Android users.",
    fullDescription:
      "We build high-performance mobile applications that users love. From concept to launch, our end-to-end mobile app development services cover strategy, design, engineering, and deployment — scalable, secure, and intuitive mobile experiences.",
    icon: "Smartphone",
    technologies: [
      "Swift",
      "Kotlin",
      "React Native",
      "Flutter",
      "Firebase",
      "Node.js",
    ],
    benefits: [
      "Single codebase options for faster delivery",
      "Native performance when needed",
      "Scalable architecture for millions of users",
      "Continuous support and maintenance",
    ],
    process: [
      "Discovery",
      "Design",
      "Development",
      "Testing",
      "Launch",
      "Optimize",
    ],
    featured: true,
    stats: [
      { label: "Apps Launched", value: "150+" },
      { label: "Avg Rating", value: "4.9★" },
      { label: "Users Served", value: "40M+" },
    ],
  },
  {
    id: "android-development",
    slug: "android-development",
    title: "Android App Development",
    shortDescription: "Native Android apps with strong performance.",
    fullDescription:
      "Specialized Android development using Kotlin and Java. Material Design, battery-conscious performance, and seamless scaling across thousands of devices.",
    icon: "Bot",
    technologies: ["Kotlin", "Java", "Jetpack Compose", "Firebase", "Room DB"],
    benefits: [
      "Pure native Android experience",
      "Optimized for all screen sizes",
      "Play Store optimization",
      "Background task optimization",
    ],
    process: [
      "Requirements",
      "Architecture",
      "Development",
      "Testing",
      "Deployment",
    ],
    featured: true,
  },
  {
    id: "ios-development",
    slug: "ios-development",
    title: "iOS App Development",
    shortDescription: "Native iOS apps built for the Apple ecosystem.",
    fullDescription:
      "Expert iOS development using Swift and SwiftUI. We build apps that feel right at home on iPhone and iPad, with smooth animations, deep platform integration, and App Store compliance.",
    icon: "Apple",
    technologies: ["Swift", "SwiftUI", "UIKit", "Core Data", "CloudKit"],
    benefits: [
      "Pure native iOS experience",
      "Apple HIG-aligned design",
      "App Store optimization",
      "Seamless iCloud integration",
    ],
    process: ["Discovery", "Design", "Development", "App Review", "Launch"],
    featured: true,
  },
  {
    id: "cross-platform-flutter-rn",
    slug: "cross-platform-flutter-rn",
    title: "Cross-Platform App Development",
    shortDescription: "Shared-codebase apps for faster delivery.",
    fullDescription:
      "Reach both iOS and Android with a single codebase. We use React Native and Flutter to deliver consistent experiences while reducing development time and cost by up to 40%.",
    icon: "RefreshCw",
    technologies: [
      "React Native",
      "Flutter",
      "TypeScript",
      "Redux",
      "Firebase",
    ],
    benefits: [
      "Write once, run anywhere",
      "Faster time-to-market",
      "Consistent UI across platforms",
      "Lower development costs",
    ],
    process: [
      "Strategy",
      "Design System",
      "Development",
      "Testing",
      "Dual Launch",
    ],
    featured: true,
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Intuitive product experiences designed around users.",
    fullDescription:
      "We design clear, accessible user experiences and polished interfaces for mobile and web products, from research and wireframes through interactive prototypes and design systems.",
    icon: "PanelsTopLeft",
    technologies: ["Figma", "Prototyping", "Design Systems", "Accessibility"],
    benefits: [
      "User-focused product flows",
      "Consistent interface patterns",
      "Accessible visual design",
      "Validated interactive prototypes",
    ],
    process: [
      "Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Design Handoff",
    ],
    featured: false,
  },
  {
    id: "web-pwa-development",
    slug: "web-pwa-development",
    title: "Web & PWA Development",
    shortDescription: "Responsive web apps and installable experiences.",
    fullDescription:
      "We build responsive web applications and progressive web apps that work across devices, support installable experiences, and integrate with your existing services.",
    icon: "Hexagon",
    technologies: ["Next.js", "TypeScript", "Progressive Web Apps", "APIs"],
    benefits: [
      "Responsive across screen sizes",
      "Installable app-like experience",
      "Integration with existing services",
      "Accessible, maintainable interfaces",
    ],
    process: [
      "Discovery",
      "UX & Architecture",
      "Development",
      "Testing",
      "Deployment",
    ],
    featured: false,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}
