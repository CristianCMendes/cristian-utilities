export type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100" | "d1000"

export const DiceTypes: DiceType[] = [
    "d4", "d6", "d8", "d10", "d12", "d20", "d100", "d1000"
]

export const DiceTypeValue: Record<DiceType, number> = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100,
    d1000: 1000,
}
