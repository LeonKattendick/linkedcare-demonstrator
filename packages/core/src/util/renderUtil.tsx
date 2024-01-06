import dayjs from "dayjs";
import { Address } from "../interface/linca/fhir/Address";
import { Dosage } from "../interface/linca/fhir/Dosage";

export const renderBirthDate = (b: string | undefined) => {
  return dayjs(b).format("DD.MM.YYYY");
};

export const renderAddress = (a: Address | undefined) => {
  if (!a) return "";
  return `${a.line.join(" ")}, ${a.postalCode} ${a.city}, ${a.country}`;
};

export const renderDosage = (d: Dosage) => {
  return "";
};
