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

export default class VehicleSpawnerMenu extends AbstractSubMenu {
    vehicleMenus: VehicleClassMenu[]

    constructor(parentMenu: NativeUI.Menu, title: string) {
        super(parentMenu, title)
        this.vehicleMenus = [
            new VehicleClassMenu(this.menuObject, "Compacts", VehicleClass.Compacts),
            new VehicleClassMenu(this.menuObject, "Sedans", VehicleClass.Sedans),
            new VehicleClassMenu(this.menuObject, "SUVs", VehicleClass.SUVs),
            new VehicleClassMenu(this.menuObject, "Coupes", VehicleClass.Coupes),
            new VehicleClassMenu(this.menuObject, "Muscle", VehicleClass.Muscle),
            new VehicleClassMenu(this.menuObject, "Sports Classics", VehicleClass.SportsClassics),
            new VehicleClassMenu(this.menuObject, "Sports", VehicleClass.Sports),
            new VehicleClassMenu(this.menuObject, "Super", VehicleClass.Super),
            new VehicleClassMenu(this.menuObject, "Motorcycles", VehicleClass.Motorcycles),
            new VehicleClassMenu(this.menuObject, "Off Road", VehicleClass.OffRoad),
            new VehicleClassMenu(this.menuObject, "Industrial", VehicleClass.Industrial),
            new VehicleClassMenu(this.menuObject, "Utility", VehicleClass.Utility),
            new VehicleClassMenu(this.menuObject, "Vans", VehicleClass.Vans),
            new VehicleClassMenu(this.menuObject, "Cycles", VehicleClass.Cycles),
            new VehicleClassMenu(this.menuObject, "Boats", VehicleClass.Boats),
            new VehicleClassMenu(this.menuObject, "Helicopters", VehicleClass.Helicopters),
            new VehicleClassMenu(this.menuObject, "Planes", VehicleClass.Planes),
            new VehicleClassMenu(this.menuObject, "Service", VehicleClass.Service),
            new VehicleClassMenu(this.menuObject, "Emergency", VehicleClass.Emergency),
            new VehicleClassMenu(this.menuObject, "Military", VehicleClass.Military),
            new VehicleClassMenu(this.menuObject, "Commercial", VehicleClass.Commercial),
            new VehicleClassMenu(this.menuObject, "Trains", VehicleClass.Trains),
        ]
        this.addVehicles()
    }

    getMenuFromVehicleClass(vehicleClass: VehicleClass) {
        return this.vehicleMenus.find(menu => menu.vehicleClass == vehicleClass)
    }

    addVehicles() {
        Enum.getValues(VehicleHashes).forEach(hash => {
            this.getMenuFromVehicleClass(game.getVehicleClassFromName(+hash))?.addVehicle(+hash)
        })
    }
}

class VehicleClassMenu extends AbstractSubMenu {
    vehicleClass: VehicleClass

    constructor(parentMenu: NativeUI.Menu, title: string, vehicleClass: VehicleClass) {
        super(parentMenu, title)
        this.vehicleClass = vehicleClass
    }

    addVehicle(hash: number) {
        this.addItem(new NativeUI.UIMenuItem(game.getLabelText(game.getDisplayNameFromVehicleModel(hash))), async () => {
            await network.callback("destroyVehicle", [alt.Player.local.vehicle])
            let vehicle = (<alt.Vehicle>await network.callback("spawnVehicle", [hash]))
            let handle = Game.setTimedInterval(() => {
                if (vehicle.scriptID) {
                    game.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, VehicleSeat.Driver)
                    alt.clearInterval(handle)
                }
            }, 100)
        })
    }
}
