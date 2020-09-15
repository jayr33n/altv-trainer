import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import AbstractMenu from "./AbstractMenu"
import Vehicle from "../utils/Vehicle"
import tick from "../modules/Tick"
import Menu from "../utils/Menu"

export default class VehicleMenu extends AbstractSubMenu {
    static vehicle: alt.Vehicle
    private vehicleCustomizationMenu: VehicleCustomizationMenu
    private repairVehicleItem: NativeUI.UIMenuItem
    private enableEngineTorqueItem: NativeUI.UIMenuCheckboxItem
    private torqueMultiplierItem: NativeUI.UIMenuDynamicListItem
    private invisibilityItem: NativeUI.UIMenuCheckboxItem
    private godmodeItem: NativeUI.UIMenuCheckboxItem
    private rainbowItem: NativeUI.UIMenuCheckboxItem
    private deleteVehicleItem: NativeUI.UIMenuItem
    private torqueMultiplier = 1

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.vehicleCustomizationMenu = new VehicleCustomizationMenu(this, "Vehicle Customization")
        this.addItem(this.repairVehicleItem = new NativeUI.UIMenuItem("Repair Vehicle"), () => Vehicle.repair(VehicleMenu.vehicle))
        this.addItem(this.enableEngineTorqueItem = new NativeUI.UIMenuCheckboxItem("Enable Torque Multiplier"), (state?: boolean) => state ? tick.register("enableEngineTorque", () => game.setVehicleCheatPowerIncrease(alt.Player.local.vehicle?.scriptID, this.torqueMultiplier), 0) : tick.clear("enableEngineTorque"))
        this.addItem(this.torqueMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Torque Multiplier", (item: NativeUI.UIMenuDynamicListItem, value: string, direction: NativeUI.ChangeDirection) => {
            direction == NativeUI.ChangeDirection.Right ? this.torqueMultiplier = +value + 5 : this.torqueMultiplier = +value - 5
            return `${this.torqueMultiplier.toFixed(2)}`
        }, undefined, () => `${this.torqueMultiplier.toFixed(2)}`))
        this.addItem(this.invisibilityItem = new NativeUI.UIMenuCheckboxItem("Vehicle Invisibility"), (state?: boolean) => Vehicle.setVisible(VehicleMenu.vehicle, !state))
        this.addItem(this.godmodeItem = new NativeUI.UIMenuCheckboxItem("Vehicle Godmode"), (state?: boolean) => Vehicle.setInvincible(VehicleMenu.vehicle, state))
        this.addItem(this.deleteVehicleItem = new NativeUI.UIMenuItem("Delete Vehicle"), () => {
            Vehicle.delete(VehicleMenu.vehicle)
            this.menuObject.GoBack()
        })
        this.deleteVehicleItem.LeftBadge = NativeUI.BadgeStyle.Alert
        this.menuObject.MenuOpen.on(() => {
            if (!alt.Player.local.vehicle) {
                VehicleMenu.vehicle = undefined
                Menu.lockMenuItems(this.menuObject)
                Menu.unlockMenuItem(this.enableEngineTorqueItem)
                Menu.unlockMenuItem(this.torqueMultiplierItem)
                Menu.unlockMenuItem(this.rainbowItem)
            }
            else if (VehicleMenu.vehicle != alt.Player.local.vehicle) {
                VehicleMenu.vehicle = alt.Player.local.vehicle
                this.invisibilityItem.Checked = !Vehicle.isVisible(VehicleMenu.vehicle)
                this.godmodeItem.Checked = Vehicle.isInvincible(VehicleMenu.vehicle)
                Menu.unlockMenuItems(this.menuObject)
            }
        })
    }
}
