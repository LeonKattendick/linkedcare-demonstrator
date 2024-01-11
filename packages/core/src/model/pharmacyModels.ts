import { Organization } from "../interface/linca/fhir/Organization";

const vogel: Organization = {
  resourceType: "Organization",
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.5.1.2",
    },
  ],
  name: "Apotheke 'Zum frühen Vogel'",
  type: "other",
};

export const pharmacyModels = [vogel];
