import {removeNonNumeric} from "@utils/string.ts";

export function asInt(n: string | number | undefined): number {
    console.log(n)

    if (n == undefined) return 0

    if (typeof n == 'number') return parseInt(n.toFixed(0))
    let v = parseInt(removeNonNumeric(n))

    if (isNaN(v)) v = parseInt(removeNonNumeric(v.toString()))

    return isNaN(v) ? 0 : v
}
