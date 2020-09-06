import AbstractSubMenu from "./AbstractSubMenu"
import VehicleSpawnerMenu from "./VehicleSpawnerMenu"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import AbstractMenu from "./AbstractMenu"

export default class VehicleMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        new VehicleSpawnerMenu(this, "Vehicle Spawner")
        new VehicleCustomizationMenu(this, "Vehicle Customization")
    }
}
