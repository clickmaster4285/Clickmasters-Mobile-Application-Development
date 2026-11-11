import type { Guide } from "./types";

const hub = "/how-to-build-an-app";

export const buildGuides: Guide[] = [
  {
    kind: "hub",
    path: hub,
    hubPath: hub,
    title: "How to Build a Mobile App | ClickMasters",
    description:
      "The sequence for building a mobile app: scope, design, a thin slice, store submission, and the listing work people leave until Friday.",
    h1: "How to build an app",
    serviceType: "Mobile app development",
    body: [
      "Building a mobile app is a sequence you can follow even if you have not done it before. Name the user and the job. Sketch the path from install to that job being done. Decide the platform. Build a thin slice that runs on a phone. Only then widen the slice. Teams that design forty screens before any screen runs will defend drawings instead of learning from a tap.",
      "The job should be one sentence a stranger understands. 'Parents book a tutor and pay in the app' is a job. 'A platform that revolutionizes learning' is not. Every feature either serves that sentence or waits. This is how scope stays small enough to reach a store.",
      "Pick the stack from the audience and the integrations, using the iOS, Android, and Flutter or React Native guides. Write the choice and the reason. Reopening the stack in the middle of layout work is one of the slowest ways to spend a budget. The cost guide explains what that reopen does to the price.",
      "Design the empty, loading, error, and success states with the happy path. A screen that only looks correct when the server returned three perfect items is not designed. Write the words for those states. Placeholder Latin hides missing decisions.",
      "The thin slice is sign-in if you need accounts, the core task, and a build you can install without the engineer sitting beside you. TestFlight or an internal Play track is the right bar. A simulator demo is not an install. The publish-to-Google-Play page and the iOS hub describe the account setup that this slice depends on.",
      "Backend work proceeds in parallel only where the contract is written. Agree the fields for the core task before two people invent them. If there is no backend team, a hosted backend is fine for a first release when the data is ordinary. Regulated or offline-heavy data needs a more deliberate store.",
      "QA is a script, not a mood. The script lists the devices, the account roles, and the steps. It includes airplane mode if you promised offline. It includes a large font. It includes a failed payment if you take money. Record what failed in tickets, not in a chat that scrolls away.",
      "Store submission needs the listing, the privacy policy, the support contact, and the review credentials. App store optimisation is the craft of that listing. Do it from the build you are submitting, not from the build you wish you had. Screenshots that show a feature you cut are a policy problem as well as a marketing problem.",
      "After the app is live, watch crashes and the one task you promised. Fix what blocks that task before you add the next idea. A public version with a broken core task will collect ratings you cannot argue with. This is operational advice. It is not a case study, and it does not cite a result from a client.",
      "ClickMasters builds this sequence with teams that want a store release rather than a pile of mockups. If you are a business owner starting from zero, the page on building an app for your business is the narrower brief. If you already know you need one codebase for both phones, start with the cross-platform hub.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/build-an-app-for-my-business`,
    hubPath: hub,
    title: "Build an App for My Business | ClickMasters",
    description:
      "How a business decides whether it needs an app, what the first version should do, and which existing tools to connect.",
    h1: "Build an app for your business",
    serviceType: "Business mobile app development",
    body: [
      "A business should build an app when people already do the job on a phone and the mobile website is failing that job. Booking, repeat orders, field work, loyalty, and anything needed offline are common reasons. A business should not build an app only because a competitor has an icon. An icon that repeats the website, with worse forms, will not be opened twice.",
      "Start from the operation you already run. If orders live in a till, a spreadsheet, or a booking tool, the app has to talk to that system or replace it on purpose. Replacing it is a different project from showing it. Say which one you mean before you talk about screens.",
      "The first version for a business is usually one role and one job: the customer reorders, or the driver collects a signature, or the patient sees the next appointment. Staff tools can follow. Putting every department in version one is how the launch date slips into the next fiscal year.",
      "Brand matters less than the task. Use your name, your colors, and your support channel. Do not spend the first release on a custom animation that delays the order flow. Customers forgive a plain screen that completes the job. They do not forgive a beautiful screen that loses the booking.",
      "Ownership should be clear in the contract: the accounts on the stores, the source code, and the data. A business that does not own the store listing is renting its own distribution. Ask the question before the work starts, not after the app is popular.",
      "Operations need a human. Someone must answer the support email on the listing, reset a stuck order, and decide what a refund does in the app. Software does not close that loop. Name the person.",
      "Cost follows the shape described in the cost guide. A business app tied to an existing till is often cheaper than a new marketplace, and it is only cheaper when the till has an interface a developer can call. Ask the vendor for documentation before you promise a date to your own staff.",
      "ClickMasters builds business apps of this shape: one job, connected to the system you already trust, shipped to the store your customers use. We will tell you if a better mobile website solves the job. This page is not a client story and it does not borrow someone else's numbers.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/hybrid-app-development`,
    hubPath: hub,
    title: "Hybrid App Development | ClickMasters",
    description:
      "What people mean by a hybrid app, how it differs from Flutter and React Native, and when a web view is enough.",
    h1: "Hybrid app development",
    serviceType: "Hybrid app development",
    body: [
      "Hybrid app development is a phrase with two meanings, and the estimate depends on which one you intend. The older meaning is a native shell around web pages, the pattern associated with Cordova and similar tools. The newer casual meaning is any shared codebase, including Flutter and React Native, which are not web views. Ask which meaning the speaker is using before you compare prices.",
      "A shell around a website is reasonable when you already have a solid mobile website and you need a store icon, push notifications, and a small amount of native chrome. It is a poor fit when the product is a highly interactive tool, an offline workflow, or something people will compare with a polished native app. The web view will feel like the website, because it is the website. Store reviewers also reject shells that add nothing to the site. There must be a native reason to install.",
      "Flutter and React Native compile to app UI rather than hosting your whole product in a browser. They belong on the cross-platform hub, not in a leftover 'hybrid' bucket. Calling them hybrid in a brief is fine if you then name the framework. Leaving the word undefined is how two vendors quote different products.",
      "Mixing a few web views inside an otherwise native or Flutter app is normal for content you already edit on the web: a long policy, a rarely used form, a CMS page. It is risky for the core task. Every web view brings cookie, login, and back-button questions. Use it at the edges.",
      "Performance, offline behavior, and accessibility follow the technology you actually picked. A web view offline is a service worker problem. A Flutter app offline is a local database problem. They are not interchangeable line items. The cost guide treats them as different scopes because they are.",
      "If a vendor promises a hybrid app in two weeks from a URL, ask to see the store listing of a previous shell they shipped and ask what native capability it added. You are checking the approach, not collecting a trophy. This studio does not rank those vendors and has not run a bake-off for this article.",
      "ClickMasters will build a shared Flutter or React Native app, a native app, or a thin shell when the shell is honestly the right scope. We will not use the word hybrid to blur those choices. If you are unsure which one you need, describe the job and the website you already have.",
      "Maintenance follows the choice. A shell breaks when the website breaks, which is simple and also means a web deploy can take down the installed app. A shared UI toolkit breaks when the toolkit and the OS disagree, which is a scheduled upgrade. Pick the kind of maintenance you can staff.",
    ],
  },
];
