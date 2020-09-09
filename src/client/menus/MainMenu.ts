import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"
import PlayerMenu from "./PlayerMenu"
import WorldMenu from "./WorldMenu"

export default class MainMenu extends AbstractMenu {
    static release = "1.0.0"
    private playerMenu: PlayerMenu
    private vehicleMenu: VehicleMenu
    private WorldMenu: WorldMenu

    constructor(title: string) {
        super(title)
        this.playerMenu = new PlayerMenu(this, "Player Options")
        this.vehicleMenu = new VehicleMenu(this, "Vehicle Options")
        this.WorldMenu = new WorldMenu(this, "World Options")
    }
}
