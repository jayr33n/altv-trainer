import * as alt from "alt-client"
import * as game from "natives"
import VehicleSeat from "../enums/VehicleSeat"

class Network {
    private callbackID = 0
    private callbacks: Record<number, (result: any) => void> = {}

    init() {
        alt.onServer("network:sendCallback", (id: number, value: any) => this.callbacks[id](value))
        alt.onServer("world:setCloudHat", (cloudHat: string) => game.loadCloudHat(cloudHat, 0))
        alt.onServer("world:setCloudHatOpacity", (opacity: number) => game.setCloudHatOpacity(opacity))
        alt.onServer("world:setArtificialLightsState", (state: boolean) => game.setArtificialLightsState(state))
        alt.onServer("player:teleportToEntity", (entity: alt.Entity) =>
            entity instanceof alt.Player && entity.vehicle ? game.setPedIntoVehicle(alt.Player.local.scriptID, entity.vehicle.scriptID, VehicleSeat.Free) : game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, entity.pos.x, entity.pos.y, entity.pos.z))
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
