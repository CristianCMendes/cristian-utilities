import type {IRuleSet} from "@assets/models/pwdRules/IRuleSet.ts";
import {useMemo, useState} from "react";

const charmap = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+{}|[]:;\"'<>,.?/~`=-"

export const usePwdGen = () => {
    const [currentPwd, setCurrentPwd] = useState("");
    const [currentRules, setCurrentRules] = useState<IRuleSet | undefined>()

    const metLength = useMemo(() => {
        if (currentRules == undefined) return false
        return currentPwd.length >= currentRules.length
    }, [currentPwd, currentRules?.length]);

    const metUppercase = useMemo(() => {
        if (currentRules == undefined) return false
        const uppercaseRule = currentRules.uppercase
        if (!uppercaseRule.active) return true
        if (uppercaseRule.size == undefined || uppercaseRule.size == 0) return true
        const uppercaseCount = currentPwd.match(/[A-Z]/g)?.length ?? 0
        return uppercaseCount >= uppercaseRule.size
    }, [currentPwd, currentRules?.uppercase]);

    const metLowercase = useMemo(() => {
        if (currentRules == undefined) return false
        const lowercaseRule = currentRules.lowercase
        if (!lowercaseRule.active) return true
        if (lowercaseRule.size == undefined || lowercaseRule.size == 0) return true
        const lowercaseCount = currentPwd.match(/[a-z]/g)?.length ?? 0
        return lowercaseCount >= lowercaseRule.size
    }, [currentPwd, currentRules?.lowercase]);

    const metNumbers = useMemo(() => {
        if (currentRules == undefined) return false
        const numbersRule = currentRules.numbers
        if (!numbersRule.active) return true
        if (numbersRule.size == undefined || numbersRule.size == 0) return true
        const numbersCount = currentPwd.match(/[0-9]/g)?.length ?? 0
        return numbersCount >= numbersRule.size
    }, [currentPwd, currentRules?.numbers]);

    const escapeForCharClass = (s: string) => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

    const metSymbols = useMemo(() => {
        if (currentRules == undefined) return false
        const symbolsRule = currentRules.symbols
        if (!symbolsRule.active) return true
        if (symbolsRule.size == undefined || symbolsRule.size == 0) return true
        const cls = escapeForCharClass(symbols)
        const symbolsCount = currentPwd.match(new RegExp(`[${cls}]`, 'g'))?.length ?? 0
        return symbolsCount >= symbolsRule.size
    }, [currentPwd, currentRules?.symbols]);
    
    const generatePwd = () => {
        if (currentRules == undefined) return
        const lower = charmap
        const upper = charmap.toUpperCase()
        const num = numbers
        const sym = symbols

        const pick = (pool: string) => pool[Math.floor(Math.random() * pool.length)]

        let required: string[] = []
        if (currentRules.lowercase.active && (currentRules.lowercase.size ?? 0) > 0) {
            for (let i = 0; i < (currentRules.lowercase.size ?? 0); i++) required.push(pick(lower))
        }
        if (currentRules.uppercase.active && (currentRules.uppercase.size ?? 0) > 0) {
            for (let i = 0; i < (currentRules.uppercase.size ?? 0); i++) required.push(pick(upper))
        }
        if (currentRules.numbers.active && (currentRules.numbers.size ?? 0) > 0) {
            for (let i = 0; i < (currentRules.numbers.size ?? 0); i++) required.push(pick(num))
        }
        if (currentRules.symbols.active && (currentRules.symbols.size ?? 0) > 0) {
            for (let i = 0; i < (currentRules.symbols.size ?? 0); i++) required.push(pick(sym))
        }

        if (required.length > currentRules.length) {
            required = required.slice(0, currentRules.length)
        }

        let pool = ""
        if (currentRules.lowercase.active) pool += lower
        if (currentRules.uppercase.active) pool += upper
        if (currentRules.numbers.active) pool += num
        if (currentRules.symbols.active) pool += sym
        if (pool.length === 0) pool = lower // fallback

        while (required.length < currentRules.length) {
            required.push(pick(pool))
        }

        for (let i = required.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[required[i], required[j]] = [required[j], required[i]]
        }

        setCurrentPwd(required.join(''))
    }

    const setRules = (r: IRuleSet | undefined) => setCurrentRules(r)

    const metAll = metLength && metUppercase && metLowercase && metNumbers && metSymbols

    const generatePwds = (count: number): string[] => {
        const prevRules = currentRules
        const out: string[] = []
        for (let i = 0; i < Math.max(0, count); i++) {
            if (prevRules == undefined) break
            const lower = charmap
            const upper = charmap.toUpperCase()
            const num = numbers
            const sym = symbols
            const pick = (pool: string) => pool[Math.floor(Math.random() * pool.length)]

            let required: string[] = []
            if (prevRules.lowercase.active && (prevRules.lowercase.size ?? 0) > 0) {
                for (let j = 0; j < (prevRules.lowercase.size ?? 0); j++) required.push(pick(lower))
            }
            if (prevRules.uppercase.active && (prevRules.uppercase.size ?? 0) > 0) {
                for (let j = 0; j < (prevRules.uppercase.size ?? 0); j++) required.push(pick(upper))
            }
            if (prevRules.numbers.active && (prevRules.numbers.size ?? 0) > 0) {
                for (let j = 0; j < (prevRules.numbers.size ?? 0); j++) required.push(pick(num))
            }
            if (prevRules.symbols.active && (prevRules.symbols.size ?? 0) > 0) {
                for (let j = 0; j < (prevRules.symbols.size ?? 0); j++) required.push(pick(sym))
            }
            if (required.length > prevRules.length) required = required.slice(0, prevRules.length)
            let pool = ""
            if (prevRules.lowercase.active) pool += lower
            if (prevRules.uppercase.active) pool += upper
            if (prevRules.numbers.active) pool += num
            if (prevRules.symbols.active) pool += sym
            if (pool.length === 0) pool = lower
            while (required.length < prevRules.length) required.push(pick(pool))
            for (let k = required.length - 1; k > 0; k--) {
                const j = Math.floor(Math.random() * (k + 1))
                ;[required[k], required[j]] = [required[j], required[k]]
            }
            out.push(required.join(''))
        }
        return out
    }

    return {
        currentPwd,
        setRules,
        generatePwd,
        generatePwds,
        metLength,
        metUppercase,
        metLowercase,
        metNumbers,
        metSymbols,
        metAll,
    }
}

