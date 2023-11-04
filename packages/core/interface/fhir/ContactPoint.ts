export interface ContactPoint {
  system: "phone" | "email";
  value: string;
  use: "mobile" | "home" | "work";
}
