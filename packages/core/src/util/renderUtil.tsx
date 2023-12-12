import dayjs from "dayjs";
import { Address } from "../interface/linca/fhir/Address";

export const renderBirthDate = (b: string) => {
  return dayjs(b).format("DD.MM.YYYY");
};

export const renderAddress = (a: Address) => {
  return `${a.line.join(" ")}, ${a.postalCode} ${a.city}, ${a.country}`;
};
