import {removeNonNumeric} from "@utils/string.ts";

export function asInt(n: string | number | undefined): number {
    if (n == undefined) return 0
    if (typeof n == 'number') return parseInt(n.toFixed(0))
    const v = parseInt(removeNonNumeric(n.toString()))

    return isNaN(v) ? 0 : v
}

