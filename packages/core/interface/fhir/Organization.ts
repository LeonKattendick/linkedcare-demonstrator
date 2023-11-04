import { Identifier } from "./Identifier";
import { Resource } from "./Resource";

export interface Organization extends Resource {
  identifier: Identifier[];
  display: string;
}
