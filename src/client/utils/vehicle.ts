import * as alt from "alt-client"
import * as game from "natives"
import { VehicleColor } from "../enums/vehicleColor"
import { VehicleHash } from "../enums/vehicleHash"
import { VehicleMod } from "../enums/vehicleMod"
import { VehicleSeat } from "../enums/vehicleSeat"
import { VehicleWheelType } from "../enums/vehicleWheelType"
import { network } from "../modules/network"
import { tick } from "../modules/tick"
import { Entity } from "./entity"
import { Game } from "./game"

export class Vehicle extends Entity {
    static getColors(vehicle: alt.Vehicle) {
        let colors = game.getVehicleColours(vehicle.scriptID, 0, 0)
        let extra = game.getVehicleExtraColours(vehicle.scriptID, 0, 0)
        return [colors[1], colors[2], extra[1], extra[2]]
    }

    static async setColor(vehicle: alt.Vehicle, type: number, color: VehicleColor) {
        await network.callback("vehicle:setColor", [vehicle, type, color])
    }

    static async setMod(vehicle: alt.Vehicle, mod: VehicleMod, index: number) {
        await network.callback("vehicle:setMod", [vehicle, mod, index])
    }

    static async setWheels(vehicle: alt.Vehicle, wheelType: VehicleWheelType, index: number, isBike: boolean) {
        await network.callback("vehicle:setWheels", [vehicle, wheelType, index + 1, isBike])
    }

    static async repair(vehicle: alt.Vehicle) {
        game.setVehicleFixed(vehicle.scriptID)
        await network.callback("vehicle:repair", [vehicle])
    }

    static async clean(vehicle: alt.Vehicle) {
        await network.callback("vehicle:clean", [vehicle])
    }

    static async create(hash: VehicleHash) {
        if (!Game.isCreatingVehicle) {
            Game.isCreatingVehicle = true
            if (alt.Player.local.vehicle)
                await this.delete(alt.Player.local.vehicle)
            let vehicle = await network.callback("vehicle:create", [hash]) as alt.Vehicle
            tick.register("vehicle:setPedInto", () => {
                if (vehicle?.scriptID) {
                    game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver)
                    tick.clear("vehicle:setPedInto")
                    Game.isCreatingVehicle = false
                }
            }, 50, 3000, () => Game.isCreatingVehicle = false)
        }
    }

    static async delete(vehicle: alt.Vehicle) {
        await network.callback("vehicle:delete", [vehicle])
    }
}
