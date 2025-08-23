import type {IRuleType} from "@assets/models/pwdRules/IRuleType.ts";

export interface IRuleSet {
    length: number;
    uppercase: IRuleType
    lowercase: IRuleType
    numbers: IRuleType
    symbols: IRuleType
    genCount: number
}