import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import VehicleHash from "../enums/VehicleHash"
import Enum from "../utils/Enum"
import VehicleClass from "../enums/VehicleClass"
import Vehicle from "../utils/Vehicle"
import AbstractMenu from "./AbstractMenu"
import Menu from "../utils/Menu"
import Game from "../utils/Game"

export default class VehicleSpawnerMenu extends AbstractSubMenu {
    private customVehicleItem: NativeUI.UIMenuItem
    private classMenus: ClassMenu[] = []

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customVehicleItem = new NativeUI.UIMenuItem("Spawn Custom Vehicle"), async () => Vehicle.create(alt.hash(await Game.getUserInput())))
        Enum.getValues(VehicleClass).forEach(vehicleClass => this.classMenus.push(new ClassMenu(this, Vehicle.getLocalizedClassName(+vehicleClass), +vehicleClass)))
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
        let item = new NativeUI.UIMenuItem(Vehicle.getLocalizedDisplayName(hash))
        this.addItem(item, () => Vehicle.create(hash))
    }
}
