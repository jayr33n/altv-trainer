import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"
import PlayerMenu from "./PlayerMenu"
import WorldMenu from "./WorldMenu"
import DebugMenu from "./DebugMenu"
import OnlineMenu from "./OnlineMenu"
import WeaponMenu from "./WeaponMenu"
import VehicleSpawnerMenu from "./VehicleSpawnerMenu"

export default class MainMenu extends AbstractMenu {
    static release = "1.0.0"
    private onlineMenu: OnlineMenu
    private playerMenu: PlayerMenu
    private vehicleMenu: VehicleMenu
    private vehicleSpawnerMenu: VehicleSpawnerMenu
    private weaponMenu: WeaponMenu
    private WorldMenu: WorldMenu
    private debugMenu: DebugMenu

    constructor(title: string) {
        super(title)
        this.onlineMenu = new OnlineMenu(this, "Online Options")
        this.playerMenu = new PlayerMenu(this, "Player Options")
        this.vehicleMenu = new VehicleMenu(this, "Vehicle Options")
        this.vehicleSpawnerMenu = new VehicleSpawnerMenu(this, "Vehicle Spawner")
        this.weaponMenu = new WeaponMenu(this, "Weapon Options")
        this.WorldMenu = new WorldMenu(this, "World Options")
        this.debugMenu = new DebugMenu(this, "Debug Options")
    }
}
