import { Organization } from "../interface/linca/fhir/Organization";

const immerdar: Organization = {
  resourceType: "Organization",
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.3",
    },
  ],
  name: "Pflegedienst Immerdar",
};

const vogelsang: Organization = {
  resourceType: "Organization",
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.1",
    },
  ],
  name: "Haus Vogelsang",
};

export const organizationModels = [immerdar, vogelsang];
