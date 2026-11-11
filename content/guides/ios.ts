import type { Guide } from "./types";

const hub = "/ios-development";

export const iosGuides: Guide[] = [
  {
    kind: "hub",
    path: hub,
    hubPath: hub,
    title: "iOS App Development Guide | ClickMasters",
    description:
      "How native iOS apps are planned in Swift and SwiftUI, what App Store review checks, and when iPhone-only is the right scope.",
    h1: "iOS app development",
    serviceType: "iOS app development",
    body: [
      "Native iOS development means the app is written for Apple's platforms, usually in Swift, and shipped through App Store Connect. The interface is built with SwiftUI, UIKit, or a mix of both. The phone, the iPad, and sometimes Apple Watch or Apple TV are separate targets. They share a language, but they do not share a layout. A screen that feels right on an iPhone 16 can feel empty on an iPad unless the layout is designed for the larger canvas.",
      "Choose native iOS when the product depends on Apple frameworks: HealthKit, StoreKit, Apple Pay, Live Activities, widgets, or tight camera and audio work. Choose it when the audience is mostly on iPhone and the budget should buy one polished app instead of two thinner ones. If the same product must launch on Android in the same season, read the Flutter and React Native guide before locking the stack. Cross-platform is a scope decision, not a quality judgment.",
      "A practical first release usually includes accounts, a core task the user came for, push notifications, a way to recover a password, and a basic settings screen. Offline behavior should be explicit. If the app is useless without a network, say so in the interface. If a draft, a cart, or a clinical note must survive a subway ride, that persistence is part of the build, not a later nice-to-have. Analytics, crash reporting, and a privacy nutrition label are release work, not marketing work.",
      "App Store review is a checklist with human judgment behind it. Apple rejects apps that crash on launch, that ask for permissions before explaining why, that hide subscription terms, or that look like a thin website wrapper with no native function. Review times vary. Plan a buffer of several days, and plan a second submission. The first binary is rarely the one that stays in review if the metadata, the demo account, or the privacy answers are incomplete.",
      "SwiftUI is the default for new screens because the code tracks the view state more directly. UIKit still matters for mature controls, for complex text input, and for libraries that have not moved. A mixed app is normal. The mistake is rewriting a working UIKit flow only to look modern. Rewrite a screen when the behavior is changing, not when the fashion of the framework changes.",
      "Cost is a scope question. Public planning conversations often place a small single-platform iOS MVP in a broad band from the mid five figures upward, and a product with payments, roles, and an admin tool much higher. Those bands are not a measurement from this studio and they are not a quote. Hardware matrix, design completeness, and third-party reviews (health, finance, kids) move the number more than the hourly rate does. Ask for a scoped estimate after the flows are listed.",
      "Signing and devices are part of the schedule. An Apple Developer Program account, certificates, provisioning, and TestFlight seats should exist before the first external demo. Waiting until the last week turns a code-complete build into a blocked one. The same is true of App Store screenshots, the subtitle, the keywords field, and the support URL. Store listing work is described on the app store optimisation page.",
      "ClickMasters builds native iOS apps and can also ship the Android or cross-platform companion when the product needs it. This page is a planning guide. It does not report a lab test, a private benchmark, or a client result. If you want a plan for a specific product, write with the flows, the must-have integrations, and the date you need a TestFlight build.",
      "Accessibility is not a final pass. Dynamic Type, VoiceOver labels, and sufficient contrast are cheaper when the components are built with them. Apple reviewers and real users both notice when a custom control has no accessibility label. Treat that as acceptance criteria for each screen, alongside the empty state and the error state.",
      "A useful discovery conversation covers six items: who the user is, the one job the first release must do, the data you already have, the systems the app must call, the countries you will sell in, and what 'done' means for the App Store version. With that list, an iOS build can be sequenced. Without it, the team estimates a fantasy product.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/swift-app-development`,
    hubPath: hub,
    title: "Swift App Development | ClickMasters",
    description:
      "What Swift and SwiftUI are used for in an iPhone app, how modules are split, and what to decide before writing the first screen.",
    h1: "Swift app development",
    serviceType: "Swift app development",
    body: [
      "Swift is Apple's language for iOS, iPadOS, macOS, watchOS, and tvOS. A Swift app is not only the screens. It is the model of the data, the networking, the persistence, and the way errors reach the user. SwiftUI describes the interface as a function of state. When the state changes, the screen updates. That model is clear when the state is small and it gets muddy when every screen reaches into a global singleton.",
      "Before the first view, decide where state lives. A small app can keep a few observable models near the features that use them. A larger app needs a boundary between the interface and the API client so a screen can be built against fake data. That boundary is what lets you demo a flow before the backend exists, and it is what lets you change a JSON field without touching every button.",
      "Concurrency in Swift uses async/await. Network calls, disk reads, and decoding should not block the main actor, because the main actor is the interface. The user-facing failure mode is a frozen scroll, not an elegant stack trace. Structure the work so a cancelled task, a timeout, and an offline device each have a sentence the user can understand.",
      "Packages and modules keep a growing app from becoming one target that takes minutes to compile and that nobody wants to edit. A feature module can own its screens and its tests. A shared module can own design tokens, the API client, and logging. Do not create modules for fashion. Create one when two features would otherwise import each other's private types.",
      "Testing a Swift app is a mix of unit tests for pricing, permissions, and parsing, and UI tests for the few flows that must not break: sign-in, the core task, and purchase or submission. A thousand snapshot tests of static screens do not replace one test that walks the happy path on a device. This is a description of a sensible test mix, not a claim that we ran a benchmark on a particular suite.",
      "Interoperability with Objective-C still appears in older codebases and in some Apple APIs. Bridging is fine. Rewriting a stable Objective-C library as a first task is usually not. Wrap it, call it from Swift, and replace it when the behavior must change.",
      "Shipping Swift code includes a minimum iOS version. Supporting too many years multiplies the layout bugs and blocks newer APIs. Pick a floor from the devices your audience still uses, write it down, and stop debating it in every ticket. The App Store page for the product should match that floor so people on older phones are not offered an install that will not run.",
      "ClickMasters writes Swift for native Apple apps. Use this page to prepare a build, then contact the studio with the screens you need and the systems they must talk to. Nothing on this page is a first-hand performance test.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/develop-ios-app`,
    hubPath: hub,
    title: "Develop an iOS App | ClickMasters",
    description:
      "A practical sequence for developing an iOS app, from the flow list and TestFlight plan through App Store submission.",
    h1: "Develop an iOS app",
    serviceType: "iOS app development",
    body: [
      "Developing an iOS app is a sequence, not a mood board. Start with the flows written as steps a person takes: open the app, create an account, finish the one job, get a result, come back tomorrow. If a step has no data source, it is not ready to estimate. If a step depends on a vendor you have not contracted, that contract is on the critical path beside the code.",
      "Design the iPhone screens at the width people will use, including a large text size. Then decide whether the iPad is in the first release. An iPad app that is a stretched phone layout feels unfinished because it is unfinished. Shipping iPhone first is a legitimate plan when the tablet audience is small. Write that decision down so it is not reopened in week six.",
      "Build a walking skeleton early: sign-in, one real screen backed by a real or stubbed API, and a TestFlight install on a phone that is not the developer's. That build proves certificates, push, and the review notes you will need later. It is a better milestone than a large deck of screens that only run in the simulator.",
      "Permissions should be requested in context. The camera prompt belongs on the action that needs the camera, with a sentence that says why. The same is true of location, contacts, and tracking. Apple’s privacy manifests and nutrition labels must match the SDKs you actually link. An analytics SDK added 'just in case' is a disclosure you have to defend.",
      "The App Store listing needs a name, a subtitle, a description, keywords, screenshots for the required sizes, a support URL, and a privacy policy URL. The binary needs a version, release notes, and a demo account if the app logs in. Reviewers will not email your team to invent a password. Put the credentials in the review notes.",
      "After release, plan the first patch. Crash logs, a broken empty state, and a confusing subscription screen are normal. The team that disappears on launch day leaves the rating to chance. A short hypercare window, with a named person watching crashes, is part of developing the app, not a separate product.",
      "If Android is a committed requirement, decide now whether this iOS app is the pattern the other platform will follow or whether a shared codebase would have been cheaper. Changing that decision after the iOS design system is custom and deep is expensive. The cross-platform guide describes the tradeoff without pretending one stack wins every brief.",
      "ClickMasters can develop the iOS app with you from the flow list through a store submission. This guide does not describe a test we performed. It describes the work that has to happen for an iPhone app to be reviewable and usable.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/app-store-optimization`,
    hubPath: hub,
    title: "App Store Optimisation | ClickMasters",
    description:
      "How App Store and Google Play listings are structured: title, screenshots, keywords, reviews, and what optimisation cannot fix.",
    h1: "App store optimisation",
    serviceType: "App store optimisation",
    body: [
      "App store optimisation, often shortened to ASO, is the work of making a store listing accurate and easy to understand. On Apple's App Store the fields people actually see are the name, subtitle, icon, screenshots, and preview video. Keywords are a hidden field with a character limit. On Google Play the short description and the long description are indexed more directly, and the title still carries weight. The two stores are not the same form with different logos.",
      "Start from the words a person types, not from the words the company uses internally. If someone looks for 'mileage log' and the title only says a brand name, the listing depends on the brand being known. A small product usually needs the job in the title or subtitle. A known brand can spend that space on a different message. Either way, the first screenshot should show the product doing the job, with a short caption, not a slogan about innovation.",
      "Screenshot sets fail when they are a tour of every menu. Three to five frames that follow the main task are easier to scan on a phone. Use the device sizes the store currently requires and check them on a real phone, because a caption that fits a desktop mock is often truncated on the store. Localized listings matter when you sell in more than one language. A machine-translated subtitle can change the meaning of a purchase.",
      "Ratings are an outcome of the product and of when you ask. Asking for a review after a failure, or before the person has done anything, trains people to ignore the prompt or to leave a low score. Apple and Google both limit how naggy the prompt can be. A listing cannot outrun a crash on launch. Fix the crash before you buy ads that send strangers to that listing.",
      "Custom product pages and store experiments exist on both platforms, with different rules and different reporting. Use them when you have enough traffic for a comparison to mean something. A test with a handful of views will wander. This page does not report an experiment we ran. It describes how the tools are meant to be used.",
      "Keywords rot. A term that matched the product last year may now describe a different category, or a competitor may have made it uselessly broad. Review the listing when you ship a major feature, when you enter a country, and when the conversion from store view to install drops. Conversion here means the store's own reporting, not a number invented for a sales deck.",
      "ASO does not replace a clear first-run experience. If the screenshots promise a result the app hides behind a subscription with no explanation, the listing and the product are in conflict, and review teams notice. Write the listing from the build you are actually submitting.",
      "The iOS and Android hubs describe how the binaries are built. This page sits beside them because a shipped binary with a confusing listing is only half released. ClickMasters can help with the product and with the listing copy. Ask for a review of the current title, subtitle, and first three screenshots if you already have an app in market.",
    ],
  },
];
