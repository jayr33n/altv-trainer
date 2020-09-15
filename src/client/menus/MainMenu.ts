import AbstractMenu from "./AbstractMenu"
import VehicleMenu from "./VehicleMenu"
import PlayerMenu from "./PlayerMenu"
import WorldMenu from "./WorldMenu"
import OnlineMenu from "./OnlineMenu"
import WeaponMenu from "./WeaponMenu"
import VehicleSpawnerMenu from "./VehicleSpawnerMenu"
import MiscMenu from "./MiscMenu"

export default class MainMenu extends AbstractMenu {
    private onlineMenu: OnlineMenu
    private playerMenu: PlayerMenu
    private vehicleMenu: VehicleMenu
    private vehicleSpawnerMenu: VehicleSpawnerMenu
    private weaponMenu: WeaponMenu
    private WorldMenu: WorldMenu
    private miscMenu: MiscMenu

    constructor(title: string) {
        super(title)
        this.onlineMenu = new OnlineMenu(this, "Online Options")
        this.playerMenu = new PlayerMenu(this, "Player Options")
        this.vehicleMenu = new VehicleMenu(this, "Vehicle Options")
        this.vehicleSpawnerMenu = new VehicleSpawnerMenu(this, "Vehicle Spawner")
        this.weaponMenu = new WeaponMenu(this, "Weapon Options")
        this.WorldMenu = new WorldMenu(this, "World Options")
        this.miscMenu = new MiscMenu(this, "Misc Options")
    }
}
