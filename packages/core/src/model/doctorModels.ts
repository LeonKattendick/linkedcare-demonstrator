import { Practitioner } from "../interface/linca/fhir/Practitioner";

const spitzmaus: Practitioner = {
  resourceType: "Practitioner",
  active: true,
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.3.2.1",
    },
  ],
  name: [{ use: "official", text: "Dr. Silvia Spitzmaus", given: ["Silvia"], family: "Spitzmaus" }],
  telecom: [],
  address: [],
};

const wuerm: Practitioner = {
  resourceType: "Practitioner",
  active: true,
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.3.2.2",
    },
  ],
  name: [{ use: "official", text: "Dr. Wibke Würm", given: ["Wibke"], family: "Würm" }],
  telecom: [],
  address: [],
};

export const doctorModels = [spitzmaus, wuerm];
