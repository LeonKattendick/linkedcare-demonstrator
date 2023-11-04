import { Identifier } from "./Identifier";

export interface Reference<_> {
  reference?: string;
  identifier?: Identifier;
  display: string;
}
