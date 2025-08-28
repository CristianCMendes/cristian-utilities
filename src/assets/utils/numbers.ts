import {removeNonNumeric} from "@utils/string.ts";

export function toInt(n: string | number | undefined): number {
    if (n == undefined) return 0
    if (typeof n == 'number') return parseInt(n.toFixed(0))
    const v = parseInt(removeNonNumeric(n.toString()))

    return isNaN(v) ? 0 : v
}

export function toFloat(n: string | number | undefined): number {
    if (n == undefined) return 0
    if (typeof n == 'number') return parseFloat(n.toFixed(2))
    n = n.toString().replace(',', '.')
    const v = parseFloat(removeNonNumeric(n.toString()))
    return isNaN(v) ? 0 : v
}

export function toMoney(n: number): string
export function toMoney(n: string): string
export function toMoney(n: string | number): string {
    n = Number(n)
    return n.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}