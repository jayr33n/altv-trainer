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
    vehicle: alt.Vehicle
    private vehicleSpawnerMenu: VehicleSpawnerMenu
    private godmodeItem: NativeUI.UIMenuCheckboxItem
    private rainbowItem: NativeUI.UIMenuCheckboxItem
    private torqueMultiplierItem: NativeUI.UIMenuDynamicListItem
    private powerMultiplierItem: NativeUI.UIMenuDynamicListItem
    private torqueMultiplier = 1
    private powerMultiplier = 10
    private rainbowColors = [29, 38, 89, 139, 140, 70, 145]
    private colorIndex = 0

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.vehicleSpawnerMenu = new VehicleSpawnerMenu(this, "Vehicle Spawner")
        new VehicleCustomizationMenu(this, "Vehicle Customization")
        this.godmodeItem = new NativeUI.UIMenuCheckboxItem("Vehicle Godmode")
        this.rainbowItem = new NativeUI.UIMenuCheckboxItem("Rainbow Vehicle")
        this.torqueMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Torque Multiplier", (item: NativeUI.UIMenuDynamicListItem, value: string, direction: NativeUI.ChangeDirection) => {
            if (direction == NativeUI.ChangeDirection.Right) this.torqueMultiplier = (+value + 0.1)
            else this.torqueMultiplier = (+value - 0.1)
            return this.torqueMultiplier.toFixed(2).toString()
        }, undefined, () => this.torqueMultiplier.toFixed(2).toString())
        this.powerMultiplierItem = new NativeUI.UIMenuDynamicListItem("Engine Power Multiplier", (item: NativeUI.UIMenuDynamicListItem, value: string, direction: NativeUI.ChangeDirection) => {
            if (direction == NativeUI.ChangeDirection.Right) this.powerMultiplier = (+value + 1)
            else this.powerMultiplier = (+value - 1)
            return this.powerMultiplier.toFixed(2).toString()
        }, undefined, () => this.powerMultiplier.toFixed(2).toString())
        this.addItem(new NativeUI.UIMenuItem("Repair Vehicle"), () => { Vehicle.repair(this.vehicle) })
        this.addItem(this.torqueMultiplierItem)
        this.addItem(this.powerMultiplierItem)
        this.addItem(this.godmodeItem, (state?: boolean) => { Entity.setInvincible(this.vehicle, state) })
        this.addItem(this.rainbowItem)
        this.menuObject.MenuOpen.on(() => {
            if (!alt.Player.local.vehicle) {
                this.vehicle = undefined
                Game.lockMenuItems(this.menuObject)
                this.vehicleSpawnerMenu.menuItem.Enabled = true
                this.torqueMultiplierItem.Enabled = true
                this.powerMultiplierItem.Enabled = true
                this.rainbowItem.Enabled = true
            }
            else if (this.vehicle != alt.Player.local.vehicle) {
                this.vehicle = alt.Player.local.vehicle
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
        this.godmodeItem.Checked = Entity.isInvincible(this.vehicle)
    }
}
