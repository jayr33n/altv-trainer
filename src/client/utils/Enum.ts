export default class Enum {
    static getKeys(e: { [id: number]: string }) {
        return Object.keys(e).filter(k => typeof e[k as any] === "number")
    }

    static getValues(e: { [id: number]: string }) {
        return this.getKeys(e).map(k => e[k as any])
    }
}
