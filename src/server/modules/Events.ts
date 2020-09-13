import * as alt from "alt-server"

class Events {
    private callbacks: { [id: string]: (player: alt.Player, args: any[]) => any } = {}

    init() {
        alt.onClient("network:requestCallback", (player: alt.Player, id: number, key: string, args: any[]) => {
            alt.emitClient(player, "network:sendCallback", id, this.callbacks[key](player, args))
        })
        this.callbacks["spawnVehicle"] = (player, args) => {
            try {
                let vehicle = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, player.rot.x, player.rot.y, player.rot.z)
                vehicle.engineOn = true
                vehicle.numberPlateText = "trainer"
                return vehicle
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setVehicleMod"] = (player, args) => {
            try {
                let vehicle = args[0] as alt.Vehicle
                vehicle.modKit = 1
                vehicle.setMod(args[1], args[2])
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["setVehicleWheels"] = (player, args) => {
            try {
                let vehicle = args[0] as alt.Vehicle
                vehicle.modKit = 1
                vehicle.setWheels(args[1], args[2])
                vehicle.setRearWheels(args[2])
            } catch (error) { alt.logError(error) }
        }
        this.callbacks["destroyVehicle"] = (player, args) => {
            (args[0] as alt.Vehicle).destroy()
        }
        this.callbacks["repairVehicle"] = (player, args) => {
            let vehicle = args[0] as alt.Vehicle
            vehicle.bodyAdditionalHealth = vehicle.bodyHealth = vehicle.engineHealth = vehicle.petrolTankHealth = 1000
        }
        this.callbacks["setVehicleColor"] = (player, args) => {
            let vehicle = args[0] as alt.Vehicle
            switch (args[1]) {
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
        }
        this.callbacks["respawnPlayer"] = (player, args) => {
            player.spawn(player.pos.x, player.pos.y, player.pos.z, 0)
        }
        this.callbacks["healPlayer"] = (player, args) => {
            player.health = player.maxHealth
            player.armour = player.maxArmour
        }
        this.callbacks["setPlayerModel"] = (player, args) => {
            player.model = args[0]
        }
        this.callbacks["setWorldTime"] = (player, args) => {
            alt.Player.all.forEach(player => alt.emitClient(player, "world:setTime", args[0], args[1], args[2]))
        }
        this.callbacks["setWorldWeather"] = (player, args) => {
            alt.Player.all.forEach(player => alt.emitClient(player, "world:setWeather", args[0]))
        }
        this.callbacks["setWorldCloudHat"] = (player, args) => {
            alt.Player.all.forEach(player => alt.emitClient(player, "world:setCloudHat", args[0]))
        }
        this.callbacks["setWorldCloudHatOpacity"] = (player, args) => {
            alt.Player.all.forEach(player => alt.emitClient(player, "world:setCloudHatOpacity", args[0]))
        }
        this.callbacks["giveWeapon"] = (player, args) => {
            player.giveWeapon(args[0], args[1], args[2])
        }
        this.callbacks["removeWeapon"] = (player, args) => {
            player.removeWeapon(args[0])
        }
        this.callbacks["removeAllWeapons"] = (player, args) => {
            player.removeAllWeapons()
        }
        this.callbacks["addWeaponComponent"] = (player, args) => {
            player.addWeaponComponent(args[0], args[1])
        }
        this.callbacks["removeWeaponComponent"] = (player, args) => {
            player.removeWeaponComponent(args[0], args[1])
        }
    }
}

const events = new Events()
export default events
