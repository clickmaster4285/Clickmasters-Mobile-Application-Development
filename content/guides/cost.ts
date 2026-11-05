import type { Guide } from "./types";

const hub = "/cost-pricing";

export const costGuides: Guide[] = [
  {
    kind: "hub",
    path: hub,
    hubPath: hub,
    title: "Mobile App Cost Guide | ClickMasters",
    description:
      "What actually changes the cost of a mobile app, how to read a range, and what to send so an estimate can be scoped.",
    h1: "Mobile app cost",
    serviceType: "Mobile app cost planning",
    body: [
      "The cost of a mobile app is the cost of the decisions in it: how many platforms, how many roles, whether money moves, whether it works offline, and how finished the design is before engineering starts. A single number plucked from a blog is not an estimate. It is a headline. Use ranges to see which decisions are expensive, then replace the range with a scoped quote.",
      "Platform count is the first multiplier. One native app, iOS or Android, is the smallest store footprint. Two native apps cost more than one and less than double when the design and the API are shared. Flutter or React Native often costs less than two native clients for an ordinary product UI, and the savings shrink when the work is Bluetooth, a custom camera, or heavy background processing. The cross-platform guide explains that boundary. None of these comparisons are a stopwatch test we are publishing.",
      "Accounts and roles add surface. A single user type with email login is modest. A product with admins, staff, and customers is three apps wearing one icon, because each role has permissions, empty states, and support paths. If you describe 'a simple app' and then list three roles, the estimate has to follow the roles.",
      "Payments, subscriptions, and marketplaces add store rules as well as code. Apple and Google take a commission on many digital purchases and require their billing for those cases. Physical goods and some person-to-person services have different rules. Getting this wrong is a rejection, not a styling issue. The policy research belongs in the estimate.",
      "Offline use, maps, chat, video, and hardware integrations are their own line items. So is a design system that does not exist yet. If the estimate assumes a finished Figma file and you have a sketch on paper, you are comparing different projects. Say which one you mean.",
      "Public planning conversations often put a narrow first release of one platform in a wide band that starts in the tens of thousands of US dollars and runs upward as soon as payments, moderation, or regulated data appear. Two-platform products with an admin tool are commonly discussed higher. Treat every such band as a conversation starter. This studio has not published a benchmark, and a band is not a bid.",
      "A useful request for cost includes the platforms, the first-release flows written as steps, the systems you already run, the countries you will launch in, and what you will postpone. 'Like Uber' is not a scope. A paragraph that says 'a rider requests a car, a driver accepts, both see the trip' is closer, and it is still incomplete until payments and ratings are in or out.",
      "Maintenance is part of the cost and is easy to omit. Store SDK deadlines, a crashed launch on a new OS, and a dependency that stops compiling are ordinary. A budget that ends on launch day is a budget for an app that will rot. Plan a retainer or a named hypercare window with hours, not with a vibe.",
      "ClickMasters will estimate a mobile build after the scope is writable. We will not invent a precise figure from a slogan, and we will not pretend a calculator on a page measured your product. Start with the cost-to-develop page if you want the line items, or contact the studio with the flow list.",
      "Fixed bids are honest only when the scope is fixed. If you still expect to discover the product during the build, a capped discovery phase followed by a build quote is cleaner than a fake fixed price that will be renegotiated in week three.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/cost-to-develop-an-app`,
    hubPath: hub,
    title: "Cost to Develop an App | ClickMasters",
    description:
      "The line items behind the cost to develop an app: platforms, design, backend, stores, and the work people forget to list.",
    h1: "Cost to develop an app",
    serviceType: "App development cost planning",
    body: [
      "The cost to develop an app is a stack of line items, not a single craft. Product definition, interface design, client engineering, backend or integration work, QA on devices, and store submission each take time. Skipping a line item does not delete it. It moves the cost into rework or into a rejected binary.",
      "Definition is the cheapest hour and the one teams skip. A flow written in steps prevents a developer from inventing the business rule in a pull request. If nobody can say what happens when a payment fails, the build will stall on that screen anyway. Pay for the answer before the screen exists.",
      "Design cost depends on whether you need a full visual system or a small set of screens on a known kit. Custom illustration, motion, and a marketing site are separate from the app. Put them in the quote only if you want them. A beautiful marketing page does not reduce the engineering.",
      "Client engineering is the iOS, Android, or shared code. Backend cost appears when the app needs accounts, files, or rules you do not already host. Integrating an existing API is usually cheaper than inventing the system of record, and it is only cheaper if the API exists and is documented. 'We have a database' is not an API.",
      "QA is device time. A plan that says 'tested' without naming a phone, an OS version, and the flows is a plan to tap around. Include one low-end Android device if you ship Android, and the oldest iOS version you claim. Accessibility passes are part of QA if you intend to pass them. They are not free.",
      "Store accounts, annual developer fees, and review cycles are small beside engineering and easy to forget because they are calendar items. A week of review with a rejection in the middle is a week on the schedule. Put it there.",
      "People ask for a dollar figure before they have line items. The honest response is a range tied to assumptions, then a quote when the assumptions are confirmed. This page will not print a fake precise price. Ranges discussed publicly for a small first release start in the tens of thousands of dollars and move up with each line item above. That sentence is a planning warning, not our measurement.",
      "If you want the cost to develop your app, send the line items you already know and mark the ones you are unsure about. ClickMasters will say which unknowns block a quote. The app build cost page looks at the same question from the build-up of a first release.",
    ],
  },
  {
    kind: "article",
    path: `${hub}/app-build-cost`,
    hubPath: hub,
    title: "App Build Cost | ClickMasters",
    description:
      "How an app build cost is assembled for a first release, including what to postpone so the number stays honest.",
    h1: "App build cost",
    serviceType: "App build cost planning",
    body: [
      "App build cost is the price of a defined first release, not the price of the company you hope to become. Write the first release as a list of screens and states. Then write a second list called 'later'. The build cost covers the first list. If later items leak into the first list during the quote, the number was never real.",
      "A modest first release might be: create an account, complete one task, see a history, and receive a push when something changes. That product can live on one platform. Adding the second platform, an admin console, and a subscription in the same release is a different build. Estimate them as phases if you need all three, so the first store submission is not waiting on the admin console.",
      "Design reuse lowers build cost. A small component set, a limited type scale, and standard form patterns are faster than a custom control for every input. Custom controls are justified when they are the product. A custom checkbox is rarely the product.",
      "Third-party services change the cost in both directions. A hosted auth provider can be faster than building auth, and it adds a vendor, a bill, and a privacy disclosure. Include the vendor cost in the picture you show a finance partner. The engineering quote is not the whole operating cost.",
      "Uncertainty should be visible. If you do not know whether the legacy system can send webhooks, the quote should show a spike to find out, not a pretend interface. Spikes are paid work with a question and a time box. They are cheaper than building against a guess.",
      "Teams sometimes try to buy certainty with a very low fixed price and a very wide scope. The result is a change-order fight. A narrower fixed scope, or time and materials with a monthly cap, matches a product that is still moving. Pick the commercial shape that matches how many decisions are actually made.",
      "Nothing on this page is a calculator we validated against a portfolio. We are not publishing client invoices. Use the structure, then ask for a number against your list. The parent cost guide explains the decisions that move the band. The cost-to-develop page lists the professions involved, which is the same money seen by role.",
      "ClickMasters will price a first release when the 'now' list and the 'later' list are separate. If they are not separate yet, the first paid step is to separate them, not to staff a full team.",
    ],
  },
];
