import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"

export default class MainMenu extends AbstractMenu {
    vehicleMenu: VehicleMenu

    constructor(title: string) {
        super(title)
        this.vehicleMenu = new VehicleMenu(this.menuObject, "Vehicle Options")
    }
}
