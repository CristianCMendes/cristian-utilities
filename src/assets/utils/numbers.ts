import {removeNonNumeric} from "@utils/string.ts";

export function asInt(n: string | number | undefined): number {
    if (n == undefined) return 0
    console.log(n)
    if (typeof n == 'number') return parseInt(n.toFixed(0))
    let v = parseInt(removeNonNumeric(n))
    console.log(v)

    if (isNaN(v)) v = parseInt(removeNonNumeric(n.toString()))

    return isNaN(v) ? 0 : v
}
