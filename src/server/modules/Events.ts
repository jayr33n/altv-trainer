import * as alt from "alt-server"

class Events {
    callbacks: { [id: string]: (player: alt.Player, args: any[]) => any } = {}

    init() {
        alt.onClient("network:requestCallback", (player: alt.Player, key: string, args: any[]) => alt.emitClient(player, "network:sendCallback", key, this.callbacks[key](player, args)))
        this.callbacks["spawnVehicle"] = (player, args) => {
            let vehicle = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, player.rot.x, player.rot.y, player.rot.z)
            vehicle.engineOn = true
            return vehicle
        }
        this.callbacks["destroyVehicle"] = (player, args) => {
            let vehicle = <alt.Vehicle>args[0]
            if (vehicle)
                vehicle.destroy()
        }
    }
}

const events = new Events()
export default events
