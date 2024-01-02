import dayjs from "dayjs";
import { Address } from "../interface/linca/fhir/Address";

export const renderBirthDate = (b: string | undefined) => {
  return dayjs(b).format("DD.MM.YYYY");
};

export const renderAddress = (a: Address | undefined) => {
  if (!a) return "";
  return `${a.line.join(" ")}, ${a.postalCode} ${a.city}, ${a.country}`;
};
