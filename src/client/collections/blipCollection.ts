import { Blip } from "../common/blip"

export class BlipCollection {
    private blips: Record<number, Blip> = {}

    add(id: number, blip: Blip) {
        if (this.blips[id])
            throw new Error("id already exists")
        this.blips[id] = blip
    }

    get(id: number) {
        return this.blips[id]
    }

    remove(id: number) {
        if (this.blips[id]) {
            this.blips[id].delete()
            delete this.blips[id]
        }
    }

    clear() {
        for (let id in this.blips)
            this.remove(+id)
    }
}
