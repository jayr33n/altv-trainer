import * as alt from "alt-client"
import * as game from "natives"

class Network {
    private callbackID = 0
    private callbacks: { [id: number]: (result: [object]) => void } = {}

    init() {
        alt.onServer("network:sendCallback", (id: number, value: any) => this.callbacks[id](value))
        alt.onServer("world:setCloudHat", (cloudHat: string) => game.loadCloudHat(cloudHat, 0))
        alt.onServer("world:setCloudHatOpacity", (opacity: number) => game.setCloudHatOpacity(opacity))
    }

    async callback(key: string, args: any[] = []) {
        return await new Promise((resolve) => {
            alt.emitServer("network:requestCallback", this.callbackID, key, args)
            this.callbacks[this.callbackID] = resolve
            this.callbackID++
        })
    }
}

const network = new Network()
export default network
