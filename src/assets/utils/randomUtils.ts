export function randomUtils() {
    function roll({min = 1, max = 20}: { min: number, max: number }): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandom<T>({values}: { values: T[] }): T {
        return values[roll({min: 0, max: values.length - 1})]
    }

    return {getRandomNumber: roll, getRandomItem: getRandom}
}