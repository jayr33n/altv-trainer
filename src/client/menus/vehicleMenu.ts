import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Vehicle } from "../utils/vehicle"
import { Menu } from "../utils/menu"
import { tick } from "../modules/tick"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"
import { VehicleCustomizationMenu } from "./vehicleCustomizationMenu"

export interface VehicleObject {
    vehicle: alt.Vehicle
}

export class VehicleMenu extends AbstractSubMenu implements VehicleObject {
    vehicle: alt.Vehicle
    private vehicleCustomizationMenu: VehicleCustomizationMenu
    private repairItem: ui.UIMenuItem
    private cleanItem: ui.UIMenuItem
    private engineTorqueItem: ui.UIMenuCheckboxItem
    private torqueMultiplierItem: ui.UIMenuDynamicListItem
    private invisibilityItem: ui.UIMenuCheckboxItem
    private godmodeItem: ui.UIMenuCheckboxItem
    private turbulenceItem: ui.UIMenuCheckboxItem
    private deleteItem: ui.UIMenuItem
    private multiplier = 1

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.vehicleCustomizationMenu = new VehicleCustomizationMenu(this, "Vehicle Customization")
        this.addItem(this.repairItem = new ui.UIMenuItem("Repair Vehicle"), () => Vehicle.repair(this.vehicle))
        this.addItem(this.cleanItem = new ui.UIMenuItem("Clean Vehicle"), () => Vehicle.clean(this.vehicle))
        this.addItem(this.engineTorqueItem = new ui.UIMenuCheckboxItem("Enable Torque Multiplier"), (state?: boolean) =>
            state ? tick.register("vehicle:torqueMultiplier", () => game.setVehicleCheatPowerIncrease(alt.Player.local.vehicle?.scriptID, this.multiplier), 0) : tick.clear("vehicle:torqueMultiplier"))
        this.addItem(this.torqueMultiplierItem = new ui.UIMenuDynamicListItem("Engine Torque Multiplier", (_, value: string, direction: ui.ChangeDirection) => {
            direction == ui.ChangeDirection.Right ? this.multiplier = +value + 5 : this.multiplier = +value - 5
            return `${this.multiplier.toFixed(2)}`
        }, undefined, () => `${this.multiplier.toFixed(2)}`))
        this.addItem(this.invisibilityItem = new ui.UIMenuCheckboxItem("Vehicle Invisibility"), (state?: boolean) => game.setEntityVisible(this.vehicle.scriptID, !state, false))
        this.addItem(this.godmodeItem = new ui.UIMenuCheckboxItem("Vehicle Godmode"), (state?: boolean) => Vehicle.setInvincible(this.vehicle, state))
        this.addItem(this.turbulenceItem = new ui.UIMenuCheckboxItem("Disable Plane Turbulence"), (state?: boolean) =>
            state ? game.setPlaneTurbulenceMultiplier(this.vehicle.scriptID, 0) : game.setPlaneTurbulenceMultiplier(this.vehicle.scriptID, 1))
        this.addItem(this.deleteItem = new ui.UIMenuItem("Delete Vehicle"), () => {
            Vehicle.delete(this.vehicle)
            this.menuObject.GoBack()
        })
        this.deleteItem.LeftBadge = ui.BadgeStyle.Alert
        this.menuObject.MenuOpen.on(() => {
            if (!alt.Player.local.vehicle) {
                this.updateVehicle(undefined)
                Menu.lockMenuItems(this.menuObject)
                Menu.unlockMenuItem(this.engineTorqueItem)
                Menu.unlockMenuItem(this.torqueMultiplierItem)
            }
            else if (this.vehicle != alt.Player.local.vehicle) {
                this.updateVehicle(alt.Player.local.vehicle)
                this.invisibilityItem.Checked = !game.isEntityVisible(this.vehicle.scriptID)
                this.godmodeItem.Checked = !game.getEntityCanBeDamaged(this.vehicle.scriptID)
                this.turbulenceItem.Checked = false
                Menu.unlockMenuItems(this.menuObject)
            }
        })
    }

    private updateVehicle(vehicle: alt.Vehicle) {
        this.vehicle = vehicle
        this.vehicleCustomizationMenu.vehicle = vehicle
        this.vehicleCustomizationMenu.vehicleColorMenu.vehicle = vehicle
        this.vehicleCustomizationMenu.vehicleWheelsMenu.vehicle = vehicle
    }
}
