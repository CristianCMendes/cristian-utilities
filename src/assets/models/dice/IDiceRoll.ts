import type {DiceType} from "@assets/models/dice/DiceType.ts";

export interface IDiceRoll {
    dice: DiceType,
    roll: number,
}