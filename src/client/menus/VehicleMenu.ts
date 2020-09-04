import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import VehicleSpawnerMenu from "./VehicleSpawnerMenu"

export default class VehicleMenu extends AbstractSubMenu {
    vehicleSpawner: VehicleSpawnerMenu

    constructor(parentMenu: NativeUI.Menu, title: string) {
        super(parentMenu, title)
        this.vehicleSpawner = new VehicleSpawnerMenu(this.menuObject, "Vehicle Spawner")
    }
}
