export type Guide = {
  kind: "hub" | "article";
  path: string;
  title: string;
  description: string;
  h1: string;
  serviceType: string;
  hubPath: string;
  body: string[];
};
