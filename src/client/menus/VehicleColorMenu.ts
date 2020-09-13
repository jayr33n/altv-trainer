import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import Enum from "../utils/Enum"
import VehicleColor from "../enums/VehicleColor"
import Vehicle from "../utils/Vehicle"
import VehicleMenu from "./VehicleMenu"
import Menu from "../utils/Menu"

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
    private colorType: number

    constructor(parentMenu: AbstractMenu, title: string, colorType: number) {
        super(parentMenu, title)
        this.colorType = colorType
        this.menuObject.MenuOpen.on(() => Menu.selectItem(this.menuObject.MenuItems.find(item => item.Text.replace(/\s+/g, '') == VehicleColor[Vehicle.getColors(VehicleMenu.vehicle)[this.colorType]]), NativeUI.BadgeStyle.Car))
        Enum.getValues(VehicleColor).forEach(color => {
            let item = new NativeUI.UIMenuItem(VehicleColor[+color].replace(/([A-Z])/g, ' $1').trim())
            this.addItem(item, () => {
                Vehicle.setColor(VehicleMenu.vehicle, this.colorType, +color)
                Menu.selectItem(item, NativeUI.BadgeStyle.Car)
            })
        })
    }
}
