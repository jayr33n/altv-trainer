import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./abstractSubMenu"
import VehicleCustomizationMenu from "./vehicleCustomizationMenu"
import AbstractMenu from "./abstractMenu"
import Vehicle from "../utils/vehicle"
import tick from "../modules/tick"
import Menu from "../utils/menu"

export default class VehicleMenu extends AbstractSubMenu {
    static vehicle: alt.Vehicle
    private vehicleCustomizationMenu: VehicleCustomizationMenu
    private repairItem: NativeUI.UIMenuItem
    private cleanItem: NativeUI.UIMenuItem
    private engineTorqueItem: NativeUI.UIMenuCheckboxItem
    private torqueMultiplierItem: NativeUI.UIMenuDynamicListItem
    private invisibilityItem: NativeUI.UIMenuCheckboxItem
    private godmodeItem: NativeUI.UIMenuCheckboxItem
    private turbulenceItem: NativeUI.UIMenuCheckboxItem
    private deleteItem: NativeUI.UIMenuItem
    private multiplier = 1

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.vehicleCustomizationMenu = new VehicleCustomizationMenu(this, "Vehicle Customization")
        this.addItem(this.repairItem = new NativeUI.UIMenuItem("Repair Vehicle"), () => Vehicle.repair(VehicleMenu.vehicle))
        this.addItem(this.cleanItem = new NativeUI.UIMenuItem("Clean Vehicle"), () => Vehicle.clean(VehicleMenu.vehicle))
        this.addItem(this.engineTorqueItem = new NativeUI.UIMenuCheckboxItem("Enable Torque Multiplier"), (state?: boolean) =>
            state ? tick.register("vehicle:torqueMultiplier", () => game.setVehicleCheatPowerIncrease(alt.Player.local.vehicle?.scriptID, this.multiplier), 0) : tick.clear("vehicle:torqueMultiplier"))
        this.addItem(this.torqueMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Torque Multiplier", (_, value: string, direction: NativeUI.ChangeDirection) => {
            direction == NativeUI.ChangeDirection.Right ? this.multiplier = +value + 5 : this.multiplier = +value - 5
            return `${this.multiplier.toFixed(2)}`
        }, undefined, () => `${this.multiplier.toFixed(2)}`))
        this.addItem(this.invisibilityItem = new NativeUI.UIMenuCheckboxItem("Vehicle Invisibility"), (state?: boolean) => game.setEntityVisible(VehicleMenu.vehicle.scriptID, !state, false))
        this.addItem(this.godmodeItem = new NativeUI.UIMenuCheckboxItem("Vehicle Godmode"), (state?: boolean) => Vehicle.setInvincible(VehicleMenu.vehicle, state))
        this.addItem(this.turbulenceItem = new NativeUI.UIMenuCheckboxItem("Disable Plane Turbulence"), (state?: boolean) =>
            state ? game.setPlaneTurbulenceMultiplier(VehicleMenu.vehicle.scriptID, 0) : game.setPlaneTurbulenceMultiplier(VehicleMenu.vehicle.scriptID, 1))
        this.addItem(this.deleteItem = new NativeUI.UIMenuItem("Delete Vehicle"), () => {
            Vehicle.delete(VehicleMenu.vehicle)
            this.menuObject.GoBack()
        })
        this.deleteItem.LeftBadge = NativeUI.BadgeStyle.Alert
        this.menuObject.MenuOpen.on(() => {
            if (!alt.Player.local.vehicle) {
                VehicleMenu.vehicle = undefined
                Menu.lockMenuItems(this.menuObject)
                Menu.unlockMenuItem(this.engineTorqueItem)
                Menu.unlockMenuItem(this.torqueMultiplierItem)
            }
            else if (VehicleMenu.vehicle != alt.Player.local.vehicle) {
                VehicleMenu.vehicle = alt.Player.local.vehicle
                this.invisibilityItem.Checked = !game.isEntityVisible(VehicleMenu.vehicle.scriptID)
                this.godmodeItem.Checked = !game.getEntityCanBeDamaged(VehicleMenu.vehicle.scriptID)
                this.turbulenceItem.Checked = false
                Menu.unlockMenuItems(this.menuObject)
            }
        })
    }
}
