import type { Guide } from "./types";

export const industryGuides: Guide[] = [
  {
    kind: "article",
    path: "/industry-healthcare/medical-mobile-app-development",
    hubPath: "/solutions",
    title: "Medical Mobile App Development | ClickMasters",
    description:
      "What a medical mobile app has to decide about data, consent, offline notes, and clinical safety before anyone picks a framework.",
    h1: "Medical mobile app development",
    serviceType: "Medical mobile app development",
    body: [
      "A medical mobile app is a phone or tablet client used in care: a patient checking an appointment, a nurse capturing a note at the bedside, a person logging a symptom they will show a clinician. It is not an electronic medical record product by another name. Record systems, billing engines, and hospital infrastructure are different projects. If your brief is 'replace the record system', say that. This page is about the mobile client and the few workflows that belong on a phone.",
      "The first design question is who holds the data and under what duty. Consumer wellness apps and clinical tools do not live under the same expectations. In the United States, a product that handles protected health information for a covered entity or its vendor will be discussed in HIPAA terms. Other countries have their own regimes. This page is not legal advice and it is not a compliance certificate. It is a list of product decisions that legal counsel and clinical owners need to see before a build is priced.",
      "Consent and identity should be obvious. The person should know which organization is asking, what will be stored, and how to stop. A biometric unlock is a convenience on top of an account, not a substitute for knowing whose record is on screen. Shared devices in a clinic need a fast lock and a visible patient context so the next note is not written into the wrong chart.",
      "Offline behavior is a clinical question. A note that disappears in a stairwell is a safety problem, not a polish problem. Decide what is allowed to live on the device, for how long, and how conflicts resolve when the device reconnects. Encrypt the local store. Assume the phone will be lost.",
      "Integrations are the schedule. A mobile client that must read appointments from an existing system needs a supported interface, test patients, and a sandbox. Promising a launch date before the sandbox exists is how healthcare apps slip. Video visits add a media vendor, a consent line, and a fallback when the camera is denied.",
      "App stores will ask about health data. The privacy labels must match the SDKs. Advertising SDKs and health data are a bad mix and sometimes a forbidden one. Leave analytics at the minimum you will actually use. Do not paste a consumer growth stack into a clinical app out of habit.",
      "Clinical safety means a named owner for content. Dosage text, triage advice, and alert thresholds should not be invented by a developer in a ticket. If the app gives advice, a clinician signs that advice. If the app only moves data, do not decorate it with advice to seem more medical.",
      "ClickMasters builds mobile clients for healthcare workflows when the data owner, the sandbox, and the safety owner are identified. We do not claim a certification on this page, and we do not publish patient outcomes. The solutions page links the other industry briefs. Electronic record catalogs and trading-style lead pages are not part of this site anymore.",
    ],
  },
  {
    kind: "article",
    path: "/industry-fintech/mobile-banking-apps",
    hubPath: "/solutions",
    title: "Mobile Banking Apps | ClickMasters",
    description:
      "What a mobile banking app must get right: identity, balances, transfers, device security, and the core system behind the screen.",
    h1: "Mobile banking apps",
    serviceType: "Mobile banking app development",
    body: [
      "A mobile banking app is the phone client for balances, payments, and account servicing. The core ledger, card processor, and identity vendor are not the app. They are the systems the app must call. A beautiful balance screen that does not reconcile to the core is a defect, not a design win. Start the brief from the core you already have, or from the vendor you have contracted, not from a mood board of other banks.",
      "Authentication is the product. Passwords, device binding, biometrics as a local unlock, step-up checks for a new payee, and a way to freeze access from another channel are ordinary expectations. The right policy is a risk decision owned by the institution. The app team implements it and refuses to weaken it for a demo. A demo account that bypasses checks has a habit of shipping.",
      "Transfers and bill pay need explicit states: drafted, submitted, pending, posted, failed. Money that looks sent and is not sent will generate support calls and, in some places, regulatory complaints. The mobile UI should use the status the core uses, in words a customer can repeat to a human. Do not invent a friendlier status that lies.",
      "Push notifications for transactions are useful and sensitive. The lock-screen text should not reveal more than the customer agreed to show. A full account number on a banner is a mistake. So is a marketing push that looks like a fraud alert. Separate those channels.",
      "Session handling on a phone is different from a branch desktop. People background the app, switch networks, and expect a transfer they already confirmed not to duplicate. Idempotent payment calls are a backend requirement the mobile team has to insist on. This is a design constraint, not a story about a bank we measured.",
      "Store listings for financial apps draw extra review. Say who the institution is. Do not imply a license you do not hold. Screenshots of fake balances that look like a promise can become a problem. Use sample data that is obviously sample data, and keep the privacy labels aligned with the fraud and analytics tools you embed.",
      "Personal finance trackers that only read data the user imports are a different, smaller product than a bank. Crypto exchanges and trading terminals are different again, and this site does not offer lead pages for them. If your product moves customer funds, name the license holder and the core. If it does not, do not dress it as a bank.",
      "ClickMasters builds the mobile client and the integration layer when the institution owns the ledger and the risk policy. Bring the API docs, the sandbox, and the step-up rules. We will not invent a balance figure for a proposal, and we will not publish someone else's download count as if it were ours.",
    ],
  },
  {
    kind: "article",
    path: "/industry-ecommerce/grocery-delivery-app",
    hubPath: "/solutions",
    title: "Grocery Delivery App Guide | ClickMasters",
    description:
      "How a grocery delivery app is scoped: catalog, substitutions, slots, shopper tools, and the live order states between them.",
    h1: "Grocery delivery apps",
    serviceType: "Grocery delivery app development",
    body: [
      "A grocery delivery app is a set of roles around a perishable order. The customer builds a basket, picks a slot, and pays. A shopper in a store substitutes items. A driver or a courier moves the bags. Support fixes the order that went wrong. If your first release tries to be all four roles in four apps, you have four products. Decide which role is yours and which role is a person with a phone and a simple tool.",
      "The catalog is the hard part, not the map. Grocery items have sizes, tax rules, age restrictions, and stock that changes while the customer is shopping. A picture and a price are not a catalog. You need a source of truth for availability at the store you will actually pick from. Promising 'live inventory' without a feed is a slogan.",
      "Substitutions are the feature that separates grocery from ordinary parcels. The customer needs a preference: contact me, pick a close item, or skip. The shopper needs a short list of allowed substitutes, not a search of the whole store under time pressure. The order total changes. The payment capture has to allow that change or you will take the wrong amount. Design the money path with the substitution path, not after it.",
      "Slots and capacity are an operations problem expressed in software. A slot that can be booked by more orders than the store can pick will miss the window and create refunds. Show fewer slots rather than pretending capacity you do not have. Delivery windows should be ranges you can keep.",
      "The customer app should show a state the operations team also sees: placed, picking, substituted, out for delivery, delivered, cancelled. A custom tracker animation does not help if the state is wrong. Push messages should fire on those transitions and should not spam the thread in between.",
      "Maps and drivers are a second product if you run your own fleet. Many grocery services start with store staff and a contracted courier, which means the app hands off a manifest rather than drawing a live car. Live location is worth it when you control the driver app and the privacy notice. It is theater when the location is updated by hand.",
      "Store review will look at payments, age-restricted items, and whether the photos are of the real service. Do not use another company's courier brand in your screenshots. This page is a scope guide. It is not a claim that we operated a grocery network or measured a delivery time.",
      "ClickMasters can build the customer client and the shopper tool when the catalog and the payment rules are known. The broader delivery page covers non-grocery orders. The solutions page is the index for industry work. If the catalog feed does not exist yet, the first milestone is the feed, not the home screen.",
    ],
  },
  {
    kind: "article",
    path: "/industry-ecommerce/delivery-app",
    hubPath: "/solutions",
    title: "Delivery App Development | ClickMasters",
    description:
      "How to scope a delivery app for orders that are not a full grocery catalog: dispatch, proof of delivery, and status.",
    h1: "Delivery app development",
    serviceType: "Delivery app development",
    body: [
      "A delivery app coordinates a pickup, a dropoff, and the person who moves the item. Food from a single kitchen, parcels from a counter, and field equipment returns are all delivery problems, and they do not need a grocery catalog. They do need addresses that geocode, a way to know the order is ready, and a way to know it arrived.",
      "Model the job as stops. A stop has a contact, an address, a window, and a completion rule. Completion might be a photo, a signature, a PIN, or a scan. Pick one for the first release. Adding four proof types before you have completed a single real route is how the driver UI becomes a form nobody finishes.",
      "Dispatch can be a person with a queue. Automatic assignment is an optimization project that needs historical trips you may not have. A first version where a coordinator assigns the next stop is honest and shippable. Write the coordinator's screen before you write a marketplace of independent drivers. Marketplaces add identity checks, payouts, and disputes.",
      "The customer needs a small set of messages: accepted, collected, nearby, delivered, failed. Failed needs a reason the coordinator can act on, such as 'no one available' or 'address not found'. A red pin with no reason creates a phone call. The app should make that call less necessary, not more.",
      "Offline mode matters for drivers in basements and rural stretches. The stop list and the proof photo should queue. Customer live maps that depend on a constant socket will look frozen in those places. Tell the customer the location is delayed rather than inventing a moving dot. Inventing position is worse than silence.",
      "Payments depend on what you deliver. A parcel the sender already paid for is different from a cash-on-delivery order, and cash on delivery is an operational policy with theft and reconciliation costs. If you do not want those costs, do not put cash in the first release because a stakeholder mentioned it once.",
      "Grocery-specific problems, including substitutions and store inventory, live on the grocery delivery page. Restaurant marketplaces that clone a national brand's entire courier economy are a larger regulated product than a local delivery operation. Scope the operation you run this quarter.",
      "ClickMasters builds driver and customer clients for a defined stop model. This page does not report a fleet's on-time rate, because we are not publishing a client's operations as if they were a benchmark. Bring the completion rule and the system that currently holds the orders.",
    ],
  },
];
