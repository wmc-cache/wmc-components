export declare const emitter: import("mitt").Emitter;
interface RuleProp {
    type: "required" | "email" | "custom" | "range";
    message?: string;
    validator?: () => boolean;
    min?: {
        length: number;
        message: string;
    };
    max?: {
        length: number;
        message: string;
    };
}
export declare type RulesProp = RuleProp[];
export {};
