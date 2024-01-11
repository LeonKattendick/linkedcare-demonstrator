import { Organization } from "../interface/linca/fhir/Organization";

/**
 * All partOf organizations always need to be created with an external identifier.
 * The organizations are not fetched inside the application and therefore no name would be displayed.
 */

const immerdar: Organization = {
  resourceType: "Organization",
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.3.1",
    },
  ],
  name: "DGKP Susanne Allzeit",
  type: { coding: [{ code: "prov" }] },
  partOf: {
    identifier: {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.3",
    },
    display: "Pflegedienst Immerdar",
  },
};

const vogelsang: Organization = {
  resourceType: "Organization",
  identifier: [
    {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.3.2",
    },
  ],
  name: "DGKP Walter Specht",
  type: { coding: [{ code: "prov" }] },
  partOf: {
    identifier: {
      system: "urn:oid:1.2.40.0.34.5.2",
      value: "2.999.40.0.34.1.1.1",
    },
    display: "Haus Vogelsang",
  },
};

export const caregiverModels = [immerdar, vogelsang];
