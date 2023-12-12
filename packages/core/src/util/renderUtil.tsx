import { Address } from "../interface/linca/fhir/Address";

export const renderBirthDate = (b: string) => {
  return b;
};

export const renderAddress = (a: Address) => {
  return `${a.line.join(" ")}, ${a.postalCode} ${a.city}, ${a.country}`;
};
