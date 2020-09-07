import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import VehicleSpawnerMenu from "./VehicleSpawnerMenu"
import VehicleCustomizationMenu from "./VehicleCustomizationMenu"
import AbstractMenu from "./AbstractMenu"
import Game from "../utils/Game"
import Entity from "../utils/Entity"
import Vehicle from "../utils/Vehicle"
import network from "../modules/Network"

export default class VehicleMenu extends AbstractSubMenu {
    static vehicle: alt.Vehicle

    private vehicleSpawnerMenu: VehicleSpawnerMenu
    private vehicleCustomizationMenu: VehicleCustomizationMenu
    private repairVehicleItem: NativeUI.UIMenuItem
    private torqueMultiplierItem: NativeUI.UIMenuDynamicListItem
    private powerMultiplierItem: NativeUI.UIMenuDynamicListItem
    private invisibilityItem: NativeUI.UIMenuCheckboxItem
    private godmodeItem: NativeUI.UIMenuCheckboxItem
    private rainbowItem: NativeUI.UIMenuCheckboxItem
    private torqueMultiplier = 1
    private powerMultiplier = 5
    private colorIndex = 0
    private rainbowColors = [29, 38, 89, 139, 140, 70, 145]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.vehicleSpawnerMenu = new VehicleSpawnerMenu(this, "Vehicle Spawner")
        this.vehicleCustomizationMenu = new VehicleCustomizationMenu(this, "Vehicle Customization")
        this.addItem(this.repairVehicleItem = new NativeUI.UIMenuItem("Repair Vehicle"), () => Vehicle.repair(VehicleMenu.vehicle))
        this.addItem(this.torqueMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Torque Multiplier", (item: NativeUI.UIMenuDynamicListItem, value: string, direction: NativeUI.ChangeDirection) => {
            if (direction == NativeUI.ChangeDirection.Right) this.torqueMultiplier = (+value + 0.1)
            else this.torqueMultiplier = (+value - 0.1)
            return this.torqueMultiplier.toFixed(2).toString()
        }, undefined, () => this.torqueMultiplier.toFixed(2).toString()))
        this.addItem(this.powerMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Power Multiplier", (item: NativeUI.UIMenuDynamicListItem, value: string, direction: NativeUI.ChangeDirection) => {
            if (direction == NativeUI.ChangeDirection.Right) this.powerMultiplier = (+value + 1)
            else this.powerMultiplier = (+value - 1)
            return this.powerMultiplier.toFixed(2).toString()
        }, undefined, () => this.powerMultiplier.toFixed(2).toString()))
        this.addItem(this.invisibilityItem = new NativeUI.UIMenuCheckboxItem("Vehicle Invisibility"), (state?: boolean) => {
            let isPlayerVisible = game.isEntityVisible(alt.Player.local.scriptID)
            game.setEntityVisible(VehicleMenu.vehicle.scriptID, !state, false)
            game.setEntityVisible(alt.Player.local.scriptID, isPlayerVisible, false)
        })
        this.addItem(this.godmodeItem = new NativeUI.UIMenuCheckboxItem("Vehicle Godmode"), (state?: boolean) => Entity.setInvincible(VehicleMenu.vehicle, state))
        this.addItem(this.rainbowItem = new NativeUI.UIMenuCheckboxItem("Rainbow Vehicle"))
        this.menuObject.MenuOpen.on(() => {
            if (!alt.Player.local.vehicle) {
                VehicleMenu.vehicle = undefined
                Game.lockMenuItems(this.menuObject)
                Game.unlockMenuItem(this.vehicleSpawnerMenu.menuItem)
                Game.unlockMenuItem(this.torqueMultiplierItem)
                Game.unlockMenuItem(this.powerMultiplierItem)
                Game.unlockMenuItem(this.rainbowItem)
            }
            else if (VehicleMenu.vehicle != alt.Player.local.vehicle) {
                VehicleMenu.vehicle = alt.Player.local.vehicle
                this.updateItems()
                Game.unlockMenuItems(this.menuObject)
            }
        })
        alt.everyTick(() => {
            if (alt.Player.local.vehicle) {
                game.setVehicleCheatPowerIncrease(alt.Player.local.vehicle.scriptID, this.torqueMultiplier)
                game.modifyVehicleTopSpeed(alt.Player.local.vehicle.scriptID, this.powerMultiplier)
            }
        })
        alt.setInterval(async () => {
            if (alt.Player.local.vehicle && this.rainbowItem.Checked) {
                if (this.colorIndex >= this.rainbowColors.length) this.colorIndex = 0
                await network.callback("setVehicleColor", [alt.Player.local.vehicle, 0, this.rainbowColors[this.colorIndex]])
                await network.callback("setVehicleColor", [alt.Player.local.vehicle, 1, this.rainbowColors[this.colorIndex]])
                this.colorIndex++
            }
        }, 500)
    }

    updateItems() {
        this.invisibilityItem.Checked = !game.isEntityVisible(VehicleMenu.vehicle.scriptID)
        this.godmodeItem.Checked = Entity.isInvincible(VehicleMenu.vehicle)
    }
}
