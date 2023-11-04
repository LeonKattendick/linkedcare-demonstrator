export interface Address {
  use: "home";
  type: "both";
  line: string[]; // street name, number of street, floor, additional information
  city: string;
  postalCode: string;
  country: string;
}
