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
}

export const services: Service[] = [
  {
    id: "ios-development",
    slug: "ios-development",
    title: "iOS App Development",
    shortDescription:
      "Native iPhone and iPad apps in Swift, built for App Store review.",
    fullDescription:
      "Native iOS apps using Swift and SwiftUI or UIKit, including TestFlight and App Store submission.",
    icon: "Apple",
    technologies: ["Swift", "SwiftUI", "UIKit"],
    benefits: [
      "Apple platform APIs when the product needs them",
      "A defined minimum iOS version",
      "Store listing prepared with the binary",
    ],
    process: ["Flows", "Thin slice", "TestFlight", "Review"],
    featured: true,
  },
  {
    id: "android-development",
    slug: "android-development",
    title: "Android App Development",
    shortDescription:
      "Native Android apps in Kotlin, published through Google Play.",
    fullDescription:
      "Kotlin and Jetpack Compose or views, with Play tracks, data safety, and a target SDK that meets current rules.",
    icon: "Bot",
    technologies: ["Kotlin", "Jetpack Compose", "Play Console"],
    benefits: [
      "Device and version range chosen up front",
      "Background work designed to survive",
      "Play listing matched to the binary",
    ],
    process: ["Flows", "Internal track", "Closed test", "Production"],
    featured: true,
  },
  {
    id: "cross-platform-flutter-rn",
    slug: "cross-platform-flutter-rn",
    title: "Flutter and React Native",
    shortDescription:
      "One shared codebase for iOS and Android when the product is the same job on both.",
    fullDescription:
      "Flutter or React Native for shared UI, with native modules only where the platform requires them.",
    icon: "RefreshCw",
    technologies: ["Flutter", "React Native", "Kotlin Multiplatform"],
    benefits: [
      "One feature team for both stores",
      "Native edges budgeted on purpose",
      "Two store releases still planned",
    ],
    process: ["Stack choice", "Pilot slice", "Both binaries", "Stores"],
    featured: true,
  },
  {
    id: "cost-pricing",
    slug: "cost-pricing",
    title: "App Cost and Pricing",
    shortDescription:
      "How scope, platforms, and integrations change what a mobile build costs.",
    fullDescription:
      "A planning guide for app cost. Ranges are not a quote and not a benchmark from this studio.",
    icon: "CircleDollarSign",
    technologies: ["Scope", "Phases", "Estimates"],
    benefits: [
      "Line items instead of a single slogan",
      "Now and later lists kept apart",
      "A quote only after the flows exist",
    ],
    process: ["List flows", "Mark assumptions", "Phase the work", "Quote"],
    featured: true,
  },
  {
    id: "how-to-build-an-app",
    slug: "how-to-build-an-app",
    title: "Build and App Store",
    shortDescription:
      "From the first flow list to a store listing, including app store optimisation.",
    fullDescription:
      "The sequence for a first release and the listing work that has to match the binary you submit.",
    icon: "Rocket",
    technologies: ["Product scope", "QA script", "ASO"],
    benefits: [
      "A thin slice before a wide build",
      "Store assets made from the real app",
      "Listing fields explained for both stores",
    ],
    process: ["Job sentence", "Thin slice", "QA script", "Listing"],
    featured: true,
  },
  {
    id: "solutions",
    slug: "solutions",
    title: "Industry Apps",
    shortDescription:
      "Mobile products for healthcare, banking, grocery, and local delivery.",
    fullDescription:
      "Industry guides that stay on the mobile app: clinical clients, banking clients, grocery orders, and delivery stops.",
    icon: "Building2",
    technologies: ["Healthcare", "Banking", "Delivery"],
    benefits: [
      "The mobile client, not an unrelated software catalog",
      "Operations named before screens",
      "No borrowed metrics",
    ],
    process: ["Name the job", "Name the system", "Pilot", "Widen"],
    featured: true,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured);
}
