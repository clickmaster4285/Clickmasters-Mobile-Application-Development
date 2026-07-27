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
    id: "mobile-app-development",
    slug: "mobile-app-development",
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
    id: "android-app-development",
    slug: "android-app-development",
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
    id: "ios-app-development",
    slug: "ios-app-development",
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
    id: "cross-platform-app-development",
    slug: "cross-platform-app-development",
    title: "Cross-Platform Development",
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
    id: "flutter-app-development",
    slug: "flutter-app-development",
    title: "Flutter App Development",
    shortDescription: "Flutter apps with pixel-perfect UI.",
    fullDescription:
      "Google's Flutter framework for beautiful, natively compiled applications. Perfect for startups needing rapid iteration with pixel-perfect UIs that look identical on iOS and Android.",
    icon: "Droplet",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Riverpod"],
    benefits: [
      "Beautiful custom UIs",
      "Hot reload for fast iteration",
      "Excellent performance",
      "Growing ecosystem",
    ],
    process: [
      "Setup",
      "UI Development",
      "Logic Integration",
      "Testing",
      "Release",
    ],
    featured: false,
  },
  {
    id: "react-native-development",
    slug: "react-native-development",
    title: "React Native Development",
    shortDescription: "React Native apps with reusable components.",
    fullDescription:
      "Leverage your React skills for mobile. We build React Native apps that feel native, share up to 90% code between platforms, and integrate seamlessly with existing web applications.",
    icon: "Hexagon",
    technologies: [
      "React Native",
      "TypeScript",
      "Redux",
      "Native Modules",
      "Expo",
    ],
    benefits: [
      "React ecosystem reuse",
      "Fast refresh development",
      "Large community support",
      "Easy web integration",
    ],
    process: [
      "Planning",
      "Component Design",
      "Integration",
      "QA",
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
