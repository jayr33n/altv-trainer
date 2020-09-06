import * as alt from "alt-server"

export default class Vehicle {
    static installModkit(vehicle: alt.Vehicle) {
        vehicle.modKit = 1
    }
}
