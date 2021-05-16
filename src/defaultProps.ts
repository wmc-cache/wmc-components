import mitt from "mitt";
export const emitter = mitt();
interface RuleProp {
  type: "required" | "email" | "custom" | "range";
  message?: string;
  validator?: () => boolean;
  min?: { length: number; message: string };
  max?: { length: number; message: string };
}
export type RulesProp = RuleProp[];


