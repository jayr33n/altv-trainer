import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"

export default class MainMenu extends AbstractMenu {
    constructor(title: string) {
        super(title)
        new VehicleMenu(this, "Vehicle Options")
    }
}
