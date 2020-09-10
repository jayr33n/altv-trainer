import * as alt from "alt-server"

class Events {
    private callbacks: { [id: string]: (player: alt.Player, args: any[]) => any } = {}

    init() {
        alt.onClient("network:requestCallback", (player: alt.Player, key: string, args: any[]) => alt.emitClient(player, "network:sendCallback", key, this.callbacks[key](player, args)))
        this.callbacks["spawnVehicle"] = (player, args) => {
            try {
                let vehicle = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, player.rot.x, player.rot.y, player.rot.z)
                vehicle.engineOn = true
                return vehicle
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["destroyVehicle"] = (player, args) => {
            try {
                (<alt.Vehicle>args[0]).destroy()
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setVehicleMod"] = (player, args) => {
            try {
                let vehicle = <alt.Vehicle>args[0]
                vehicle.modKit = 1
                vehicle.setMod(args[1], args[2])
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setVehicleColor"] = (player, args) => {
            try {
                let vehicle = <alt.Vehicle>args[0]
                let colorType = args[1]
                switch (colorType) {
                    case 0:
                        vehicle.primaryColor = args[2]
                        break
                    case 1:
                        vehicle.secondaryColor = args[2]
                        break
                    case 2:
                        vehicle.pearlColor = args[2]
                        break
                    case 3:
                        vehicle.wheelColor = args[2]
                        break
                    default:
                        throw new Error()
                }
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setVehicleWheels"] = (player, args) => {
            try {
                let vehicle = <alt.Vehicle>args[0]
                vehicle.modKit = 1
                vehicle.setWheels(args[1], args[2])
                vehicle.setRearWheels(args[2])
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["respawnPlayer"] = (player, args) => player.spawn(player.pos.x, player.pos.y, player.pos.z, 0)
        this.callbacks["healPlayer"] = (player, args) => {
            player.health = player.maxHealth
            player.armour = player.maxArmour
        }
        this.callbacks["setPlayerModel"] = (player, args) => {
            try {
                player.model = args[0]
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setWorldTime"] = (player, args) => alt.Player.all.forEach(player => alt.emitClient(player, "world:setTime", args[0], args[1], args[2]))
        this.callbacks["setWorldWeather"] = (player, args) => alt.Player.all.forEach(player => alt.emitClient(player, "world:setWeather", args[0]))
        this.callbacks["setWorldCloudHat"] = (player, args) => alt.Player.all.forEach(player => alt.emitClient(player, "world:setCloudHat", args[0]))
        this.callbacks["setWorldCloudHatOpacity"] = (player, args) => alt.Player.all.forEach(player => alt.emitClient(player, "world:setCloudHatOpacity", args[0]))
    }
}

const events = new Events()
export default events
