import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Vehicle } from "../utils/vehicle"
import { Menu } from "../utils/menu"
import { VehicleClass } from "../enums/vehicleClass"
import { VehicleHash } from "../enums/vehicleHash"
import { Enum } from "../utils/enum"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"

export class VehicleSpawnerMenu extends AbstractSubMenu {
    private customVehicleItem: ui.UIMenuItem
    private classMenus: ClassMenu[] = []

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customVehicleItem = new ui.UIMenuItem("Spawn Custom Vehicle"), async () => Vehicle.create(alt.hash(await Game.getUserInput())))
        Enum.getValues(VehicleClass).forEach(vehicleClass => this.classMenus.push(new ClassMenu(this, game.getLabelText("VEH_CLASS_" + vehicleClass), +vehicleClass)))
        Enum.getValues(VehicleHash).forEach(hash => this.getVehicleClassMenu(game.getVehicleClassFromName(+hash)).addVehicle(+hash))
        this.classMenus.forEach(menu => Menu.sortMenuItems(menu.menuObject))
    }

    private getVehicleClassMenu(vehicleClass: VehicleClass) {
        return this.classMenus.find(menu => menu.vehicleClass == vehicleClass)
    }
}

class ClassMenu extends AbstractSubMenu {
    vehicleClass: VehicleClass

    constructor(parentMenu: AbstractMenu, title: string, vehicleClass: VehicleClass) {
        super(parentMenu, title)
        this.vehicleClass = vehicleClass
    }

    addVehicle(hash: VehicleHash) {
        let item = new ui.UIMenuItem(game.getLabelText(game.getDisplayNameFromVehicleModel(hash)))
        this.addItem(item, () => Vehicle.create(hash))
    }
}
