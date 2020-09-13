import * as alt from "alt-client"
import * as game from "natives"
import VehicleClass from "../enums/VehicleClass"
import network from "../modules/Network"
import VehicleSeat from "../enums/VehicleSeat"
import Entity from "./Entity"
import VehicleColor from "../enums/VehicleColor"
import VehicleMod from "../enums/VehicleMod"
import VehicleHash from "../enums/VehicleHash"
import VehicleWheelType from "../enums/VehicleWheelType"
import tick from "../modules/Tick"
import Game from "./Game"

export default class Vehicle extends Entity {
    static getColors(vehicle: alt.Vehicle) {
        let colors = game.getVehicleColours(vehicle.scriptID, 0, 0)
        let extra = game.getVehicleExtraColours(vehicle.scriptID, 0, 0)
        return [colors[1], colors[2], extra[1], extra[2]]
    }

    static async setColor(vehicle: alt.Vehicle, type: number, color: VehicleColor) {
        await network.callback("setVehicleColor", [vehicle, type, color])
    }

    static async setMod(vehicle: alt.Vehicle, mod: VehicleMod, index: number) {
        await network.callback("setVehicleMod", [vehicle, mod, index])
    }

    static async setWheels(vehicle: alt.Vehicle, wheelType: VehicleWheelType, index: number) {
        await network.callback("setVehicleWheels", [vehicle, wheelType, index + 1])
    }

    static async repair(vehicle: alt.Vehicle) {
        game.setVehicleFixed(vehicle.scriptID)
        await network.callback("repairVehicle", [vehicle])
    }

    static async create(hash: VehicleHash, driver: boolean) {
        if (!Game.isCreatingVehicle) {
            Game.isCreatingVehicle = true
            if (driver && alt.Player.local.vehicle)
                await this.delete(alt.Player.local.vehicle)
            let vehicle = await network.callback("spawnVehicle", [hash]) as alt.Vehicle
            if (driver)
                tick.register("setPedIntoVehicle", () => {
                    if (vehicle?.scriptID) {
                        game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver)
                        tick.clear("setPedIntoVehicle")
                        Game.isCreatingVehicle = false
                    }
                }, 50, 3000, () => Game.isCreatingVehicle = false)
        }
    }

    static async delete(vehicle: alt.Vehicle) {
        await network.callback("destroyVehicle", [vehicle])
    }

    static getLocalizedClassName(vehicleClass: VehicleClass) {
        return game.getLabelText("VEH_CLASS_" + vehicleClass)
    }

    static getLocalizedDisplayName(hash: number) {
        return game.getLabelText(game.getDisplayNameFromVehicleModel(hash))
    }
}
