import * as alt from "alt-client"
import * as game from "natives"
import VehicleClass from "../enums/VehicleClass"

export default class Vehicle {
    static installModKit(vehicle: alt.Vehicle) {
        game.setVehicleModKit(vehicle.scriptID, 0)
    }

    static getColors(vehicle: alt.Vehicle) {
        let colors = game.getVehicleColours(vehicle.scriptID, 0, 0)
        let extra = game.getVehicleExtraColours(vehicle.scriptID, 0, 0)
        return [colors[1], colors[2], extra[1], extra[2]]
    }

    static getLocalizedClassName(vehicleClass: VehicleClass) {
        return game.getLabelText("VEH_CLASS_" + vehicleClass)
    }

    static getDisplayNameFromModel(hash: number) {
        return game.getLabelText(game.getDisplayNameFromVehicleModel(hash))
    }
}
