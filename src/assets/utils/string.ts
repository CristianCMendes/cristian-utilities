type tipoPrimitivos = 'number' | 'string'

export function removeNonNumeric(str: string): string
export function removeNonNumeric(str: string, tipo: 'string'): string
export function removeNonNumeric(str: string, tipo: 'number'): number
export function removeNonNumeric(str: string, tipo: tipoPrimitivos = 'string') {
    const cleaned = str
        .replace(/[^\d-]/g, '')
        .replace(/(?!^)-/g, '')
    const val = cleaned === '-' ? '' : cleaned

    if (tipo === 'number') {
        return Number(val)
    }

    return val
}
