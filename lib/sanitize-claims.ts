/**
 * Removes first-hand testing and fabricated-proof language from legacy copy.
 * Retained guides are written without those claims; this is a backstop.
 */
const replacements: [RegExp, string][] = [
  [/written and reviewed by working mobile engineers/gi, "written as a planning guide"],
  [/examples from shipped apps/gi, "planning examples"],
  [/original data/gi, "public planning context"],
  [/in our tests/gi, "in general practice"],
  [/our testing (showed|shows|found)/gi, "general practice suggests"],
  [/we tested/gi, "teams usually compare"],
  [/we measured/gi, "public discussions often cite"],
  [/tested & ranked/gi, "planning notes"],
  [/tested and ranked/gi, "planning notes"],
];

export function sanitizeClaims(text: string) {
  return replacements.reduce(
    (value, [pattern, next]) => value.replace(pattern, next),
    text,
  );
}
