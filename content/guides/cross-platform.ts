import type { Guide } from "./types";

const hub = "/cross-platform-flutter-rn";

export const crossPlatformGuides: Guide[] = [
  {
    kind: "hub",
    path: hub,
    hubPath: hub,
    title: "Flutter and React Native Guide | ClickMasters",
    description:
      "When a shared Flutter or React Native codebase fits, where native code still appears, and how to choose between them.",
    h1: "Flutter and React Native",
    serviceType: "Cross-platform app development",
    body: [
      "Cross-platform mobile development means one team maintains a shared codebase that ships to iOS and Android. The two stacks this studio actually uses for that job are Flutter and React Native. Both produce real apps, installed from the stores, not a shortcut that wraps a website. Both still contain native projects. You will open Xcode and Android Studio. The promise is shared UI and shared business logic, not the disappearance of Apple and Google.",
      "Flutter draws its own widgets with the Skia or Impeller renderer and is written in Dart. The UI looks the same on both platforms unless you deliberately branch. That consistency is an advantage when the product has a custom visual language, and it is a disadvantage when you wanted the app to mimic every system control. React Native hosts native views and is written in JavaScript or TypeScript. It feels familiar to teams that already ship React on the web. It also means the bridge, the new architecture, and the native modules are part of your life whenever a library lags a platform release.",
      "Choose a shared codebase when the product is the same job on both phones, the design can live with a shared component set, and you would rather hire one application team than two. Choose native when the product is mostly Apple frameworks, mostly Android system integration, or a game-like custom renderer with a platform engine. Choosing Flutter because a slide said it is a percentage faster is not a decision. Name the screens that must be identical and the screens that must be native, then pick.",
      "The expensive part of cross-platform work is the edge: in-app purchase, background location, Bluetooth, a custom camera, rich text, and anything that depends on a beta operating system. Budget native module time for those edges on day one. Teams that pretend the edge does not exist discover it when the store rejection arrives. A plugin that worked last year may not support the OS version you must target this year. Check maintenance, not just GitHub stars.",
      "Navigation, forms, and offline storage should be designed once. Platform theming can still differ: the back gesture on iOS, the predictive back on Android, the status bar, and the permission copy. A shared design system that ignores those differences feels foreign on both phones. Share the tokens and the layout rules. Allow a thin platform layer for behavior people already know.",
      "Release engineering doubles even when the code is shared. You still need two store listings, two sets of screenshots, two signing setups, and two review processes. The app store optimisation guide covers the listings. The iOS and Android hubs cover the parts that stay native. Cross-platform does not cut that operational work in half. It cuts the feature implementation, which is the larger share only when the features are ordinary.",
      "Kotlin Multiplatform is a third pattern: share the logic, keep the UI native. It fits a team that already has strong Swift and Kotlin UI skills and wants one source for networking and rules. It is a poor fit if you hoped to avoid native UI entirely. The dedicated page describes that split.",
      "Public chatter about cost often says a shared codebase lands both stores for less than two native builds. That is directionally true for content-shaped products and untrue for products that are mostly platform integration. It is not a figure we measured in a lab. Ask for an estimate that lists which modules are shared and which are native.",
      "ClickMasters ships Flutter and React Native apps and will say so when native is the better scope. This hub is a decision guide. It is not a bake-off we ran, and it does not rank agencies or tools we did not evaluate.",
      "A fair pilot is one vertical slice on both platforms: sign-in, the core task, and a store build. If that slice is already painful, a larger shared app will be more painful. If the slice is calm, you have evidence about this product, which is the only evidence that counts.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/flutter-mobile-app-development`,
    hubPath: hub,
    title: "Flutter Mobile App Development | ClickMasters",
    description:
      "How a Flutter mobile app is put together in Dart, what stays in the native shells, and how releases reach both stores.",
    h1: "Flutter mobile app development",
    serviceType: "Flutter app development",
    body: [
      "Flutter mobile app development uses Dart and Flutter's widget tree to build the iOS and Android interfaces from one project. The `ios` and `android` directories are still real native apps. They hold permissions, icons, entitlements, and any channel that calls Swift or Kotlin. Ignoring those folders is how teams fail the first signing attempt.",
      "State management should be chosen and then left alone. The framework does not require a particular library. It does require that one screen not invent a second pattern. Widget tests cover logic that is awkward to tap through, and an integration test should walk the main task on both platforms before you trust a release branch.",
      "Flutter's rendering is an advantage for custom graphics and a responsibility for accessibility. Semantic labels do not appear by magic on a highly custom control. Add them. Respect text scale. A layout that overflows at a large font is a bug on both stores at once, which is the downside of sharing pixels.",
      "Packages from pub.dev need a maintainer and a recent release that mentions the iOS and Android versions you support. A package abandoned before null safety, or before the latest embedding, will become your native code. Plan either to adopt it fully or to write the channel yourself. Do not discover that in the week of submission.",
      "Build flavors or flavors-by-dart-define separate development and production endpoints, icons, and bundle identifiers. Shipping a build that talks to a staging API is an avoidable incident. Name the flavor in the CI job so a human is not choosing it from memory.",
      "Impeller and the older renderer have had device-specific issues over time. When a screen flickers on one GPU family, treat it as a platform bug to reproduce, not as a reason to rewrite the app. Pin a Flutter version in CI. Upgrading Flutter is a task with release notes, not a background refresh.",
      "The App Store and Play still review the native binary Flutter produces. Declare the SDKs you include. A crash reporter and an analytics plugin are SDKs. The privacy labels must mention them. Flutter does not exempt you from that paperwork.",
      "ClickMasters builds Flutter apps when one design should land on both phones. This page explains the shape of the work. It is not a performance table from a device we instrumented for publication.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/react-native-apps`,
    hubPath: hub,
    title: "React Native Apps | ClickMasters",
    description:
      "How React Native apps share JavaScript UI across iOS and Android, and where native modules and the new architecture matter.",
    h1: "React Native apps",
    serviceType: "React Native development",
    body: [
      "A React Native app is a native iOS app and a native Android app that render a tree of React components. TypeScript is the sensible default. The JavaScript bundle runs in the Hermes engine on both platforms in current templates. UI that maps to native controls can feel at home on each phone. UI that fights the platform, with custom gestures on every row, will feel custom on both, for better or worse.",
      "The new architecture, with Fabric and TurboModules, is the path current releases expect. Older libraries that depend on the legacy bridge need a check before you adopt them. 'It has a lot of stars' is not a compatibility test. Read the issue tracker for the OS versions you must ship, and try the library in a sample binary.",
      "Navigation, safe areas, keyboards, and lists are the everyday bugs. A flat list that cannot recycle will stutter on a mid-range Android phone long before it stutters on a simulator. Test lists with real amounts of data. An empty demo list hides the problem you will have in production.",
      "Native modules are how you reach an API React Native does not wrap. Write them when the product needs them, and keep the surface small: a typed function in, a result or an error out. A module that exposes an entire vendor SDK into JavaScript becomes untestable. Prefer a maintained library when one is healthy. Own the code when the vendor is central to the product.",
      "Over-the-air updates for the JavaScript bundle, through a service or your own pipeline, can ship a UI fix without a store review. They cannot ship a native change, a permission change, or a new entitlement. If you use them, version the native shell and refuse to load a bundle that does not match. A bad bundle is a crash you cannot roll back through the store until the next binary.",
      "CI should produce an iOS archive and an Android bundle from the same commit. Manual archive steps on one developer's laptop will not match the lockfile a week later. Pin Node, pin the React Native version, and treat upgrades as scheduled work because they touch native files.",
      "React Native is a strong fit for teams that already think in React and need both stores. It is a weak fit if nobody wants to open Xcode when a pod breaks. The native folders are not optional expertise. They are smaller than a fully native app, and they are still mandatory.",
      "ClickMasters builds React Native apps and the native edges those apps need. Nothing here is a claim that we timed a particular list against a particular phone for this article.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/kotlin-multiplatform`,
    hubPath: hub,
    title: "Kotlin Multiplatform for Mobile | ClickMasters",
    description:
      "When Kotlin Multiplatform should share mobile logic while SwiftUI and Compose keep their own interfaces.",
    h1: "Kotlin Multiplatform",
    serviceType: "Kotlin Multiplatform development",
    body: [
      "Kotlin Multiplatform, in a mobile product, usually means the networking, the validation, and the local data rules are written in Kotlin once and called from Swift and from Android. The interfaces stay native: SwiftUI or UIKit on Apple platforms, Compose or views on Android. You are not sharing pixels. You are sharing the decisions that must not drift, such as how a price is rounded or how a token refresh works.",
      "That split fits a team with native UI skills on both sides and a fear of two slightly different business rules. It does not fit a team trying to avoid hiring for iOS or Android. Someone still builds each interface. Someone still owns the Xcode project and the Gradle project. The shared module is a library both apps depend on, with a release cadence of its own.",
      "The boundary should be boring. Pass simple data in and out. Do not leak coroutines or a Kotlin type that Swift cannot express cleanly if a simpler DTO would do. The iOS interop has improved, and it still rewards a small API. A shared module that tries to own navigation will fight both UI toolkits.",
      "Testing the shared code is the payoff. The same cases run once. Keep the platform tests focused on the interface and on the glue. If every rule is reimplemented in Swift 'just to be sure', you have paid for two stacks and a third.",
      "Tooling is the risk. Gradle, the Kotlin version, and the iOS framework export need a person who will maintain them. A prototype that only one engineer can build is not a strategy. Document the exact commands that produce the Apple framework and the Android artifact, and run those commands in CI.",
      "Compare this option with Flutter or React Native when what you wanted to share was the UI. Multiplatform will disappoint you there on purpose. Compare it with two fully separate codebases when the shared logic is small. A shared module for three functions is overhead.",
      "ClickMasters uses Kotlin Multiplatform when the logic must match and the interfaces should stay native. This note is architectural. It is not a benchmark of binary size or of compile times on our machines.",
      "If you already have a Kotlin Android app and a Swift iOS app that disagree in small, expensive ways, a shared module for the disagreeing rules is a reasonable migration. Migrate one rule, ship it, and then decide whether to continue. A big-bang extraction of the whole domain is how these projects stall.",
    ],
  },
];
