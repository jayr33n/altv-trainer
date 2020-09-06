import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import VehicleHashes from "../enums/VehicleHashes"
import Enum from "../utils/Enum"
import network from "../modules/Network"
import Game from "../utils/Game"
import VehicleSeat from "../enums/VehicleSeat"
import VehicleClass from "../enums/VehicleClass"
import Vehicle from "../utils/Vehicle"
import AbstractMenu from "./AbstractMenu"

export default class VehicleSpawnerMenu extends AbstractSubMenu {
    private classMenus: ClassMenu[]
    setIntoVehicle: NativeUI.UIMenuCheckboxItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.classMenus = [
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Compacts), VehicleClass.Compacts),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Sedans), VehicleClass.Sedans),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.SUVs), VehicleClass.SUVs),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Coupes), VehicleClass.Coupes),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Muscle), VehicleClass.Muscle),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.SportsClassics), VehicleClass.SportsClassics),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Sports), VehicleClass.Sports),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Super), VehicleClass.Super),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Motorcycles), VehicleClass.Motorcycles),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.OffRoad), VehicleClass.OffRoad),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Industrial), VehicleClass.Industrial),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Utility), VehicleClass.Utility),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Vans), VehicleClass.Vans),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Cycles), VehicleClass.Cycles),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Boats), VehicleClass.Boats),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Helicopters), VehicleClass.Helicopters),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Planes), VehicleClass.Planes),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Service), VehicleClass.Service),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Emergency), VehicleClass.Emergency),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Military), VehicleClass.Military),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Commercial), VehicleClass.Commercial),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.Trains), VehicleClass.Trains),
            new ClassMenu(this, Vehicle.getLocalizedClassName(VehicleClass.OpenWheel), VehicleClass.OpenWheel),
        ]
        this.addClassMenus()
        this.addItem(this.setIntoVehicle = new NativeUI.UIMenuCheckboxItem("Set As Driver", true))
        this.setIntoVehicle.LeftBadge = NativeUI.BadgeStyle.Alert
    }

    private getMenuFromVehicleClass(vehicleClass: VehicleClass) {
        return this.classMenus.find(menu => menu.vehicleClass == vehicleClass)
    }

    private addClassMenus() {
        Enum.getValues(VehicleHashes).forEach(hash => {
            this.getMenuFromVehicleClass(game.getVehicleClassFromName(+hash)).addVehicle(+hash)
        })
        this.classMenus.forEach(menu => Game.sortMenuItems(menu.menuObject))
    }
}

class ClassMenu extends AbstractSubMenu {
    vehicleClass: VehicleClass

    constructor(parentMenu: AbstractMenu, title: string, vehicleClass: VehicleClass) {
        super(parentMenu, title)
        this.vehicleClass = vehicleClass
    }

    addVehicle(hash: number) {
        this.addItem(new NativeUI.UIMenuItem(Vehicle.getDisplayNameFromModel(hash)), async () => {
            let setIntoVehicle = (this.parentMenu as VehicleSpawnerMenu).setIntoVehicle.Checked
            if (setIntoVehicle)
                await network.callback("destroyVehicle", [alt.Player.local.vehicle])
            let vehicle = <alt.Vehicle>await network.callback("spawnVehicle", [hash])
            let handle = Game.setTimedInterval(async () => {
                if (vehicle?.scriptID) {
                    if (setIntoVehicle)
                        game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver)
                    alt.clearInterval(handle)
                }
            })
        })
    }
}
