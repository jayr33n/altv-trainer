import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import VehicleWheelType from "../enums/VehicleWheelType"
import Game from "../utils/Game"
import network from "../modules/Network"
import VehicleMod from "../enums/VehicleMod"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"

export default class VehicleWheelsMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        new WheelMenu(this, "Sport", VehicleWheelType.Sport)
        new WheelMenu(this, "Muscle", VehicleWheelType.Muscle)
        new WheelMenu(this, "Lowrider", VehicleWheelType.Lowrider)
        new WheelMenu(this, "SUV", VehicleWheelType.SUV)
        new WheelMenu(this, "Off-Road", VehicleWheelType.OffRoad)
        new WheelMenu(this, "Tuner", VehicleWheelType.Tuner)
        new WheelMenu(this, "Bike", VehicleWheelType.Bike)
        new WheelMenu(this, "High End", VehicleWheelType.HighEnd)
        new WheelMenu(this, "Benny's Original", VehicleWheelType.BennysOriginal)
        new WheelMenu(this, "Benny's Bespoke", VehicleWheelType.BennysBespoke)
    }
}

class WheelMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string, type: VehicleWheelType) {
        super(parentMenu, title)
        this.menuObject.MenuOpen.on(async () => {
            let vehicle = ((this.parentMenu as VehicleWheelsMenu).parentMenu as VehicleCustomizationMenu).vehicle
            this.menuObject.Clear()
            await network.callback("setVehicleWheels", [vehicle, type, 1])
            let handle = Game.setTimedInterval(() => {
                if (game.getVehicleWheelType(vehicle.scriptID) == type) {
                    for (let _i = 0; _i <= game.getNumVehicleMods(vehicle.scriptID, VehicleMod.FrontWheels); _i++) {
                        let item = new NativeUI.UIMenuItem(_i.toString())
                        this.addItem(item, async () => {
                            await network.callback("setVehicleWheels", [vehicle, type, _i + 1])
                        })
                    }
                    alt.clearInterval(handle)
                }
            })
        })
    }
}
