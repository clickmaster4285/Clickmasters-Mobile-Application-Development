import type { Guide } from "./types";

const hub = "/android-development";

export const androidGuides: Guide[] = [
  {
    kind: "hub",
    path: hub,
    hubPath: hub,
    title: "Android App Development Guide | ClickMasters",
    description:
      "How native Android apps are built with Kotlin, how Play review works, and what to decide about devices, screens, and background work.",
    h1: "Android app development",
    serviceType: "Android app development",
    body: [
      "Native Android development means the app is written for Android, today almost always in Kotlin, and distributed through Google Play or a managed enterprise store. The interface is Jetpack Compose, XML views, or a mix. Android is not one phone. It is a range of screens, manufacturers, and Android versions. A layout that ignores that range will look finished on the developer's Pixel and broken on a common mid-range device.",
      "Pick native Android when you need the platform's APIs directly: a reliable background task, a custom notification, a foldable layout, Android TV, Wear OS, or a tight integration with the camera and sensors. Pick it when the audience is mostly on Android and the budget should fund one deep app. If iPhone parity is required in the same release, compare that cost with Flutter or React Native before the first sprint. The comparison is about schedule and hiring, not about a moral ranking of languages.",
      "A first release needs a minimum SDK you are willing to support, a target SDK that meets Play's current rule, and a decision about phones only versus tablets and ChromeOS. Play raises the target SDK bar on a published calendar. Missing it blocks updates. Put that date next to the release date so it is not a surprise.",
      "Compose is a good default for new UI because state and layout live in one place. Existing XML screens do not need a rewrite to start a new feature. Interoperability is supported. Rewrite a screen when the interaction is changing. Large rewrites that chase the newer toolkit, with no user-facing change, stall the release.",
      "Background work is where Android apps get into trouble. Work that must finish needs WorkManager or a foreground service with a notification the user can understand. Work that polls forever gets killed, and on recent versions it can also draw a policy warning. Design the sync around moments that matter: the user opened the app, the user submitted a form, or a push arrived. Do not design it around a timer that hopes the process stays alive.",
      "Google Play review checks the policy declarations you make: ads, data safety, permissions, target audience, and whether the app is a copy of another product. A data safety form that disagrees with the SDKs in the binary is a common rejection. So is a permission the app requests and never uses. Read the form against the dependency list before you submit, not after the email arrives.",
      "Public planning ranges for a small Android MVP often sit in a wide band similar to a single-platform iOS build, and they climb when you add payments, offline storage, or device-specific behavior. Those ranges are industry conversation, not a test this studio performed and not a quote. Device labs, accessibility, and a second language each add real time.",
      "Signing, Play App Signing, internal testing tracks, and a closed test with a few real accounts should happen before you call the app feature-complete. Screenshots, a short description, and a privacy policy URL are release tasks. Listing quality is covered on the app store optimisation guide, which applies to Play as well as Apple.",
      "ClickMasters builds native Android apps in Kotlin and can pair them with an iOS or cross-platform client. This hub explains the work. It does not present a benchmark, a star rating, or a client metric. Bring the user flows and the Android versions you must support if you want a scoped plan.",
      "Accessibility on Android includes content descriptions, touch target size, and font scale. A custom control with no content description is invisible to TalkBack. Treat that as part of done for the screen, together with the offline message and the empty state.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/android-software-development`,
    hubPath: hub,
    title: "Android Software Development | ClickMasters",
    description:
      "How Android software is structured: Kotlin modules, Compose, networking, and the Play target SDK a release has to meet.",
    h1: "Android software development",
    serviceType: "Android software development",
    body: [
      "Android software development is the engineering of an installable Android client and the contracts it depends on. The client is usually a Gradle project with an application module and, when the app grows, feature modules. Kotlin is the language to standardize on. Java still appears in older modules and in some libraries. New feature work should not add a second style without a reason.",
      "The build file is part of the product. Dependency versions, the compile SDK, the minimum SDK, and ProGuard or R8 rules decide whether a release build runs. A debug build that works and a minified release build that crashes on launch is a classic failure. Put a release build on a device early, not the night you upload an AAB.",
      "Networking belongs behind an interface the UI can call. Whether you use Retrofit, Ktor, or something else matters less than whether errors become messages. Timeouts, 401s, and validation errors are different sentences. A single 'something went wrong' toast hides the action the user should take.",
      "Local data is Room or another explicit store when the app must work offline or must not flicker on every reopen. Do not treat the network as a database you hope is fast. Decide which records are cached, for how long, and what happens when the server and the phone disagree.",
      "Configuration changes, process death, and split screens are normal on Android. UI state that lives only in a composable and nowhere else will vanish when the system kills the process. Saved state for the few fields the user just typed is part of the architecture, especially for forms.",
      "Modules help when the app has distinct areas that different people own. They hurt when every screen is its own module and the build graph is harder to explain than the product. Start with one app module and extract a feature when compile times or ownership demand it.",
      "Testing should cover the money and safety logic in unit tests, and the install-and-complete-task path on at least one physical device in the minimum and target generations you claim to support. An emulator farm is useful. It does not replace a cheap phone with a small screen and a large font.",
      "ClickMasters does this kind of Android software work. This page is an explanation of the structure, not a report of a test run on a device lab.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/publish-to-google-play`,
    hubPath: hub,
    title: "Publish to Google Play | ClickMasters",
    description:
      "The Play Console steps that sit between a finished Android build and a public release, including testing tracks and data safety.",
    h1: "Publish to Google Play",
    serviceType: "Google Play publishing",
    body: [
      "Publishing to Google Play starts before the upload. You need a Play Console account in the name of the business that should own the listing, app signing enrolled, and a package name you are willing to keep forever. The package name is not a label you can casually change later. Pick it once, and do not include a code name you will regret.",
      "The artifact Play wants for new apps is an Android App Bundle, not an old-style APK, except where a private distribution channel still requires one. Play App Signing should be on so Google can deliver the right split per device and so a lost upload key is recoverable through the console process. Guard the upload key anyway. Recovery is a delay, not a hobby.",
      "Use the testing tracks in order. Internal testing is for the team. Closed testing is for a named group and, for brand-new personal developer accounts, Play has required a closed test with real testers before production. Read the current rule for your account type when you open the console, because those requirements have changed and a blog post from two years ago will mislead you. Open testing is a public beta. Production is the store.",
      "The store listing needs a default language, a short description, a full description, an icon, a feature graphic, and phone screenshots. Tablet and Android TV screenshots are required only if you opt those form factors in. Do not opt in to form factors the app has not been designed for. A phone app declared as a TV app fails in ways that look like a policy mystery and are really a checkbox.",
      "Data safety, ads declaration, content rating questionnaire, target audience, and news or financial declarations must match the binary. If a SDK collects identifiers, the form has to say so. If the app is not for children, do not tick the child-directed boxes because they looked like a growth idea. Those boxes add Families policy rules.",
      "Release notes should say what changed in language a user can check. 'Bug fixes and performance improvements' on every build teaches people to ignore the notes. A staged rollout, even at a small percentage, gives you a chance to watch crashes before the listing is in front of everyone. Crash rate and ANR rate in the console are the signals to watch. This page does not quote a rate from our own releases.",
      "A rejected release usually points at a policy URL. Fix the cited issue and resubmit. Arguing with the first email before you read the linked policy wastes a day. If the rejection is about a permission, remove the permission or justify it in the declaration and in the in-app prompt.",
      "ClickMasters can prepare a Play release with the build. Bring the account owner, the package name if one exists, and the list of SDKs. The iOS hub covers the Apple side of the same product when you ship both.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/android-tv-app-development`,
    hubPath: hub,
    title: "Android TV App Development | ClickMasters",
    description:
      "How Android TV apps differ from phone apps: D-pad focus, the ten-foot layout, and the Play TV review checks.",
    h1: "Android TV app development",
    serviceType: "Android TV app development",
    body: [
      "An Android TV app is not a phone app shown on a television. The person is across the room, holding a remote or a gamepad, and the screen is shared. Touch assumptions fail immediately. Every actionable item needs a focus state that is obvious from the sofa. If focus can leave the screen and never return, the app is broken even if the pixels look fine in a screenshot.",
      "Leanback and Compose for TV both exist. The right choice depends on whether you are extending a phone codebase or starting a living-room product. What does not work is dropping the phone composables onto a TV emulator and calling it responsive. Typography must be readable at a distance. Density of buttons must drop. A toolbar of six icons becomes a short row of labeled actions.",
      "Navigation should follow the remote: up, down, left, right, select, back. Horizontal lists are natural for media. Nested scroll in both directions is a trap, because the user cannot tell which container has focus. Give each row a clear title and keep the selected item visible.",
      "The Google Play TV quality guidelines cover the banner asset, the launcher behavior, the overscan-safe layout, and the requirement that the app is usable without a touch screen. There is a separate TV banner in the listing. A phone icon stretched into that slot looks amateur because the shape is different. Read the current TV checklist in Play Console when you opt the app into Android TV. Requirements move, and a copied checklist from an old template will miss a field.",
      "Performance matters more on sticks and older television devices than on a flagship phone. A heavy animation on the home row will stutter on the hardware your audience actually owns. Test on at least one low-power device, not only on an emulator. This is a recommendation about the test plan, not a result from a lab we are publishing.",
      "Account sign-in on TV is painful if you only offer a tiny email form. Support a code-pairing flow or a restore path from the phone app when you have one. Playback, if that is the product, needs a predictable pause, a back behavior that does not lose the seat in the video, and captions.",
      "If the product is a phone app that someone might cast, casting is a different feature from an Android TV app. Do not promise a TV app in the store listing when you only implemented cast. The listing and the manifest should describe the same thing.",
      "ClickMasters builds Android TV clients when the product truly lives on a television. Start from the phone or cross-platform guide if the television is only a hypothetical later phase. Later phases should not be designed in the first manifest.",
    ],
  },
];
