import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import Enum from "../utils/Enum"
import VehicleColor from "../enums/VehicleColor"
import network from "../modules/Network"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import VehicleColorType from "../enums/VehicleColorType"
import Game from "../utils/Game"
import Vehicle from "../utils/Vehicle"

export default class VehicleColorMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        new ColorMenu(this, "Primary", VehicleColorType.Primary)
        new ColorMenu(this, "Secondary", VehicleColorType.Secondary)
        new ColorMenu(this, "Pearlescent", VehicleColorType.Pearlescent)
        new ColorMenu(this, "Rim", VehicleColorType.Rim)
    }
}

class ColorMenu extends AbstractSubMenu {
    private type: VehicleColorType

    constructor(parentMenu: AbstractMenu, title: string, type: VehicleColorType) {
        super(parentMenu, title)
        this.type = type
        this.menuObject.MenuOpen.on(() => {
            Game.selectItem(this.menuObject.MenuItems.find(item => item.Text.replace(/\s+/g, '') == VehicleColor[Vehicle.getColors(((this.parentMenu as VehicleColorMenu).parentMenu as VehicleCustomizationMenu).vehicle)[type]]))
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
