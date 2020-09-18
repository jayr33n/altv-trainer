import AbstractMenu from "./abstractMenu"
import VehicleMenu from "./vehicleMenu"
import PlayerMenu from "./playerMenu"
import WorldMenu from "./worldMenu"
import OnlineMenu from "./onlineMenu"
import WeaponMenu from "./weaponMenu"
import VehicleSpawnerMenu from "./vehicleSpawnerMenu"
import MiscMenu from "./miscMenu"

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
