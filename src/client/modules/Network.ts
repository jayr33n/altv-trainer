import * as alt from "alt-client"

class Network {
    callbacks: { [id: string]: (result: object) => void } = {}

    init() {
        alt.onServer("network:sendCallback", (key, value) => {
            this.callbacks[key](value)
        })
    }

    async callback(key: string, args: any[] = []) {
        return await new Promise((resolve) => {
            alt.emitServer("network:requestCallback", key, args)
            this.callbacks[key] = resolve
        })
    }
}

const network = new Network()
export default network
