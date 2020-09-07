import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import VehicleWheelType from "../enums/VehicleWheelType"
import Game from "../utils/Game"
import network from "../modules/Network"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import VehicleMod from "../enums/VehicleMod"

export default class VehicleWheelsMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        let wheelsMenu = [
            new WheelsMenu(this, "Sport", VehicleWheelType.Sport, 50),
            new WheelsMenu(this, "Muscle", VehicleWheelType.Muscle, 36),
            new WheelsMenu(this, "Lowrider", VehicleWheelType.Lowrider, 30),
            new WheelsMenu(this, "SUV", VehicleWheelType.SUV, 38),
            new WheelsMenu(this, "Off-Road", VehicleWheelType.OffRoad, 35),
            new WheelsMenu(this, "Tuner", VehicleWheelType.Tuner, 48),
            new WheelsMenu(this, "Bike", VehicleWheelType.Bike, 72),
            new WheelsMenu(this, "High End", VehicleWheelType.HighEnd, 40),
            new WheelsMenu(this, "Benny's Original", VehicleWheelType.BennysOriginal, 217),
            new WheelsMenu(this, "Benny's Bespoke", VehicleWheelType.BennysBespoke, 217)
        ]
        this.menuObject.MenuOpen.on(() => {
            let type = game.getVehicleWheelType((this.parentMenu as VehicleCustomizationMenu).vehicle.scriptID)
            let index = game.getVehicleMod((this.parentMenu as VehicleCustomizationMenu).vehicle.scriptID, VehicleMod.FrontWheels)
            if (index != -1)
                Game.selectItem(wheelsMenu[type].menuObject.MenuItems[index])
        })
    }
}

class WheelsMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string, type: VehicleWheelType, num: number) {
        super(parentMenu, title)
        for (let _i = 0; _i < num; _i++) {
            let item = new NativeUI.UIMenuItem(_i.toString())
            this.addItem(item, async () => {
                await network.callback("setVehicleWheels", [((this.parentMenu as VehicleWheelsMenu).parentMenu as VehicleCustomizationMenu).vehicle, type, _i + 1])
                Game.selectItem(item)
            })
        }
    }
}
