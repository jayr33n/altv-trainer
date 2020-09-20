import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Vehicle } from "../utils/vehicle"
import { Menu } from "../utils/menu"
import { VehicleMod } from "../enums/vehicleMod"
import { Enum } from "../utils/enum"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"
import { VehicleColorMenu } from "./vehicleColorMenu"
import { VehicleObject } from "./vehicleMenu"
import { VehicleWheelsMenu } from "./vehicleWheelsMenu"

export class VehicleCustomizationMenu extends AbstractSubMenu implements VehicleObject {
    vehicle: alt.Vehicle
    vehicleColorMenu: VehicleColorMenu
    vehicleWheelsMenu: VehicleWheelsMenu
    private modMenus: ModMenu[]
    private bennysMenu: BennysMenu

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.bennysMenu = new BennysMenu(this, "Benny's Original")
        this.vehicleColorMenu = new VehicleColorMenu(this, "Colors")
        this.vehicleWheelsMenu = new VehicleWheelsMenu(this, "Wheels")
        this.modMenus = [
            new ModMenu(this, "Armor", VehicleMod.Armor),
            new ModMenu(this, "Brakes", VehicleMod.Brakes),
            new ModMenu(this, "Engine", VehicleMod.Engine),
            new ModMenu(this, "Exhaust", VehicleMod.Exhaust),
            new ModMenu(this, "Fenders", VehicleMod.Fenders),
            new ModMenu(this, "Frame", VehicleMod.Frame),
            new ModMenu(this, "Front Bumpers", VehicleMod.FrontBumpers),
            new ModMenu(this, "Grille", VehicleMod.Grille),
            new ModMenu(this, "Hood", VehicleMod.Hood),
            new ModMenu(this, "Horn", VehicleMod.Horn),
            new ModMenu(this, "Livery", VehicleMod.Livery),
            new ModMenu(this, "Rear Bumpers", VehicleMod.RearBumper),
            new ModMenu(this, "Rear Fenders", VehicleMod.RearFenders),
            new ModMenu(this, "Roof", VehicleMod.Roof),
            new ModMenu(this, "Skirts", VehicleMod.Skirts),
            new ModMenu(this, "Spoiler", VehicleMod.Spoiler),
            new ModMenu(this, "Suspension", VehicleMod.Suspension),
            new ModMenu(this, "Transmission", VehicleMod.Transmission),
        ].concat(this.bennysMenu.modMenus)
        this.menuObject.MenuOpen.on(() => {
            game.setVehicleModKit(this.vehicle.scriptID, 0)
            Enum.getValues(VehicleMod).forEach(mod => this.modMenus.find(menu => menu.mod == +mod)?.init(this.vehicle))
        })
    }
}

class BennysMenu extends AbstractSubMenu {
    modMenus: ModMenu[]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.modMenus = [
            new ModMenu(this, "Aerials", VehicleMod.Aerials),
            new ModMenu(this, "Air Filter", VehicleMod.AirFilter),
            new ModMenu(this, "Arch Cover", VehicleMod.ArchCover),
            new ModMenu(this, "Dashboard", VehicleMod.Dashboard),
            new ModMenu(this, "Details", VehicleMod.Details),
            new ModMenu(this, "Dials", VehicleMod.Dials),
            new ModMenu(this, "Door Speaker", VehicleMod.DoorSpeaker),
            new ModMenu(this, "Engine Block", VehicleMod.EngineBlock),
            new ModMenu(this, "Hydraulics", VehicleMod.Hydraulics),
            new ModMenu(this, "Ornaments", VehicleMod.Ornaments),
            new ModMenu(this, "Plaques", VehicleMod.Plaques),
            new ModMenu(this, "Plate", VehicleMod.Plate),
            new ModMenu(this, "Seats", VehicleMod.Seats),
            new ModMenu(this, "Shift Lever", VehicleMod.ShiftLever),
            new ModMenu(this, "Speakers", VehicleMod.Speakers),
            new ModMenu(this, "Steering Wheel", VehicleMod.SteeringWheel),
            new ModMenu(this, "Struts", VehicleMod.Struts),
            new ModMenu(this, "Tank", VehicleMod.Tank),
            new ModMenu(this, "Trim", VehicleMod.Trim),
            new ModMenu(this, "Trunk", VehicleMod.Trunk),
            new ModMenu(this, "Vanity", VehicleMod.Vanity),
            new ModMenu(this, "Visor", VehicleMod.Visor),
        ]
    }
}

class ModMenu extends AbstractSubMenu {
    mod: VehicleMod
    private numMods: number

    constructor(parentMenu: AbstractMenu, title: string, mod: VehicleMod) {
        super(parentMenu, title)
        this.mod = mod
    }

    init(vehicle: alt.Vehicle) {
        this.menuObject.Clear()
        this.numMods = game.getNumVehicleMods(vehicle.scriptID, this.mod)
        if (this.numMods == 0)
            Menu.lockMenuItem(this.menuItem)
        else {
            for (let _i = 0; _i <= this.numMods; _i++) {
                let item = new ui.UIMenuItem(this.menuItem.Text + " #" + _i)
                this.addItem(item, () => {
                    Vehicle.setMod(vehicle, this.mod, _i)
                    Menu.selectItem(item, ui.BadgeStyle.Car)
                })
            }
            Menu.selectItem(this.menuObject.MenuItems[game.getVehicleMod(vehicle.scriptID, this.mod) + 1], ui.BadgeStyle.Car)
        }
    }
}
