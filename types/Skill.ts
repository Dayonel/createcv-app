import { Empty } from "./Empty";
import { Key } from "./Key";

export type Skill = {
  value: string;
} & Key & Empty;
