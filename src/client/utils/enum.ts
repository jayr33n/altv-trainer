export default class Enum {
    static getKeys(e: { [id: number]: string }) {
        return Object.keys(e).filter(k => typeof e[k as any] === "number")
    }

    static getValues(e: { [id: number]: string }) {
        return this.getKeys(e).map(k => e[k as any])
    }

    static getStringKeys(e: { [id: string]: string }) {
        return Object.keys(e)
    }

    static getStringValues(e: { [id: string]: string }) {
        return Object.values(e)
    }
}
