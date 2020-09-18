import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./abstractSubMenu"
import AbstractMenu from "./abstractMenu"
import Enum from "../utils/enum"
import VehicleColor from "../enums/vehicleColor"
import Vehicle from "../utils/vehicle"
import VehicleMenu from "./vehicleMenu"
import Menu from "../utils/menu"

export default class VehicleColorMenu extends AbstractSubMenu {
    private primaryColorMenu: ColorMenu
    private secondaryColorMenu: ColorMenu
    private pearlescentColorMenu: ColorMenu
    private rimColorMenu: ColorMenu

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.primaryColorMenu = new ColorMenu(this, "Primary Color", 0)
        this.secondaryColorMenu = new ColorMenu(this, "Secondary Color", 1)
        this.pearlescentColorMenu = new ColorMenu(this, "Pearlescent Color", 2)
        this.rimColorMenu = new ColorMenu(this, "Rim Color", 3)
    }
}

class ColorMenu extends AbstractSubMenu {
    private type: number

    constructor(parentMenu: AbstractMenu, title: string, type: number) {
        super(parentMenu, title)
        this.type = type
        this.menuObject.MenuOpen.on(() => Menu.selectItem(this.menuObject.MenuItems.find(item => item.Text.replace(/\s+/g, '') == VehicleColor[Vehicle.getColors(VehicleMenu.vehicle)[this.type]]), NativeUI.BadgeStyle.Car))
        Enum.getValues(VehicleColor).forEach(color => {
            let item = new NativeUI.UIMenuItem(VehicleColor[+color].replace(/([A-Z])/g, ' $1').trim())
            this.addItem(item, () => {
                Vehicle.setColor(VehicleMenu.vehicle, this.type, +color)
                Menu.selectItem(item, NativeUI.BadgeStyle.Car)
            })
        })
    }
}
