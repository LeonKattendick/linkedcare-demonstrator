import { Patient } from "../interface/linca/Patient";

const guenterGuertelthier: Patient = {
  resourceType: "Patient",
  meta: {
    profile: ["http://fhir.hl7.at/linkedcare/StructureDefinition/at-core-patient"],
  },
  identifier: [{ system: "urn:oid:1.2.40.0.10.1.4.3.1", value: "2410011234" }],
  active: true,
  name: [
    {
      use: "official",
      text: "Günter Gürtelthier",
      family: "Gürtelthier",
      given: ["Günter"],
    },
  ],
  telecom: [{ system: "phone", value: "00436641234567", use: "mobile" }],
  gender: "male",
  birthDate: "2001-10-24",
  address: [
    {
      use: "home",
      type: "both",
      line: ["Musterstrasse 123/4"],
      city: "Vienna",
      postalCode: "1100",
      country: "AT",
    },
  ],
  managingOrganization: {
    identifier: {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.1",
    },
    display: "Haus Vogelsang",
  },
};

const patriziaPlatypus: Patient = {
  resourceType: "Patient",
  meta: {
    profile: ["http://fhir.hl7.at/linkedcare/StructureDefinition/at-core-patient"],
  },
  identifier: [{ system: "urn:oid:1.2.40.0.10.1.4.3.1", value: "0707711234" }],
  active: true,
  name: [
    {
      use: "official",
      text: "Patrizia Platypus",
      family: "Platypus",
      given: ["Patrizia"],
    },
  ],
  telecom: [{ system: "phone", value: "00436641234568", use: "mobile" }],
  gender: "female",
  birthDate: "1971-07-07",
  address: [
    {
      use: "home",
      type: "both",
      line: ["Musterstrasse 123/4"],
      city: "Vienna",
      postalCode: "1100",
      country: "AT",
    },
  ],
  managingOrganization: {
    identifier: {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.1",
    },
    display: "Haus Vogelsang",
  },
};

const renateRuesselOlifant: Patient = {
  resourceType: "Patient",
  meta: {
    profile: ["http://fhir.hl7.at/linkedcare/StructureDefinition/at-core-patient"],
  },
  identifier: [{ system: "urn:oid:1.2.40.0.10.1.4.3.1", value: "1238100866" }],
  active: true,
  name: [
    {
      use: "official",
      text: "Renate Rüssel-Olifant",
      family: "Rüssel-Olifant",
      given: ["Renate"],
    },
  ],
  telecom: [{ system: "phone", value: "00436641234568", use: "mobile" }],
  gender: "female",
  birthDate: "1966-08-10",
  address: [
    {
      use: "home",
      type: "both",
      line: ["Höchstädtplatz 6"],
      city: "Vienna",
      postalCode: "1200",
      country: "AT",
    },
  ],
  managingOrganization: {
    identifier: {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.3",
    },
    display: "Pflegedienst Immerdar",
  },
};

export const patientModels = [guenterGuertelthier, patriziaPlatypus, renateRuesselOlifant];
