import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"
import PlayerMenu from "./PlayerMenu"

export default class MainMenu extends AbstractMenu {
    private playerMenu: PlayerMenu
    private vehicleMenu: VehicleMenu

    constructor(title: string) {
        super(title)
        this.playerMenu = new PlayerMenu(this, "Player Options")
        this.vehicleMenu = new VehicleMenu(this, "Vehicle Options")
    }
}
