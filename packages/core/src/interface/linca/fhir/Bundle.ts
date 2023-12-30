import { Resource } from "./Resource";

export interface Bundle<T extends Resource> extends Resource {
  resourceType: "Bundle";
  total?: number;
  entry?: {
    fullUrl: string;
    resource: T;
  }[];
}
