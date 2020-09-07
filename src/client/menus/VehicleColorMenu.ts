import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import Enum from "../utils/Enum"
import VehicleColor from "../enums/VehicleColor"
import network from "../modules/Network"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import Game from "../utils/Game"
import Vehicle from "../utils/Vehicle"

export default class VehicleColorMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        new ColorMenu(this, "Primary", 0)
        new ColorMenu(this, "Secondary", 1)
        new ColorMenu(this, "Pearlescent", 2)
        new ColorMenu(this, "Rim", 3)
    }
}

class ColorMenu extends AbstractSubMenu {
    private type: number

    constructor(parentMenu: AbstractMenu, title: string, type: number) {
        super(parentMenu, title)
        this.type = type
        this.menuObject.MenuOpen.on(() => {
            Game.selectItem(this.menuObject.MenuItems.find(item => item.Text.replace(/\s+/g, '') == VehicleColor[Vehicle.getColors(((this.parentMenu as VehicleColorMenu).parentMenu as VehicleCustomizationMenu).vehicle)[this.type]]))
        })
        this.addColors()
    }

    addColors() {
        Enum.getValues(VehicleColor).forEach(color => {
            let item = new NativeUI.UIMenuItem(VehicleColor[+color].replace(/([A-Z])/g, ' $1').trim())
            this.addItem(item, async () => {
                await network.callback("setVehicleColor", [((this.parentMenu as VehicleColorMenu).parentMenu as VehicleCustomizationMenu).vehicle, this.type, +color])
                Game.selectItem(item)
            })
        })
    }
}
