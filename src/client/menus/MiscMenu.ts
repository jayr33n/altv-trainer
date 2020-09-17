import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import tick from "../modules/Tick"
import Text2D from "../common/Text2D"
import Font from "../enums/Font"
import Game from "../utils/Game"
import Key from "../enums/Key"
import Player from "../utils/Player"
import Enum from "../utils/Enum"
import HudComponent from "../enums/HudComponent"
import Text3D from "../common/Text3D"

export default class MiscMenu extends AbstractSubMenu {
    private customPropItem: NativeUI.UIMenuItem
    private customTeleportItem: NativeUI.UIMenuItem
    private teleportToMarkerItem: NativeUI.UIMenuCheckboxItem
    private playerCoordsItem: NativeUI.UIMenuCheckboxItem
    private playerSpeedItem: NativeUI.UIMenuCheckboxItem
    private entitiesInfoItem: NativeUI.UIMenuCheckboxItem
    private raycastInfoItem: NativeUI.UIMenuCheckboxItem
    private hideHudItem: NativeUI.UIMenuCheckboxItem
    private creditsItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPropItem = new NativeUI.UIMenuItem("Spawn Custom Prop"), async () => Game.createProp(alt.hash(await Game.getUserInput()), alt.Player.local.pos, true))
        this.addUserInputItem(this.customTeleportItem = new NativeUI.UIMenuItem("Teleport To Coordinates"), async () => {
            let x = +await Game.getUserInput()
            let y = +await Game.getUserInput()
            let z = +await Game.getUserInput()
            game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z)
        })
        this.addItem(this.teleportToMarkerItem = new NativeUI.UIMenuCheckboxItem("Teleport To Marker", true, "This enables the ~b~F7~s~ key to be used as a shortcut to teleport around the map."))
        this.addItem(this.playerCoordsItem = new NativeUI.UIMenuCheckboxItem("Show Player Coordinates"), (state?: boolean) => state ? tick.register("misc:drawPlayerCoord", () => new Text2D(`~y~x~s~ ${alt.Player.local.pos.x.toFixed(3)} ~y~y~s~ ${alt.Player.local.pos.y.toFixed(3)} ~y~z~s~ ${alt.Player.local.pos.z.toFixed(3)}`, [0.5, 0.95], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 180), true).drawThisFrame(), 0) : tick.clear("misc:drawPlayerCoord"))
        this.addItem(this.playerSpeedItem = new NativeUI.UIMenuCheckboxItem("Show Player Speed"), (state?: boolean) => state ? tick.register("misc:drawPlayerSpeed", () => new Text2D(`~y~m/s~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID)).toFixed(3)} ~y~km/h~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID) * 3.6).toFixed(3)} ~y~mph~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID) * 2.23694).toFixed(3)}`, [0.5, 0.9], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 180), true).drawThisFrame(), 0) : tick.clear("misc:drawPlayerSpeed"))
        this.addItem(this.entitiesInfoItem = new NativeUI.UIMenuCheckboxItem("Show Entity Info"), (state?: boolean) => state ? tick.register("misc:drawEntityInfo", () => {
            alt.Vehicle.all.forEach(vehicle => this.draw3DText(`SCRIPTID ${vehicle.scriptID} - ID ${vehicle.id} - TYPE ${vehicle.type} - MODEL ${vehicle.model} - BODY ${game.getVehicleBodyHealth(vehicle.scriptID)} - ENGINE ${game.getVehicleEngineHealth(vehicle.scriptID)} - PETROL TANK ${game.getVehiclePetrolTankHealth(vehicle.scriptID)}`, vehicle))
            alt.Player.all.forEach(player => this.draw3DText(`SCRIPTID ${player.scriptID} - ID ${player.id} - TYPE ${player.type} - MODEL ${player.model} - HEALTH ${game.getEntityHealth(player.scriptID)} - ARMOR ${game.getPedArmour(player.scriptID)}`, player))
        }, 0) : tick.clear("misc:drawEntityInfo"))
        this.addItem(this.raycastInfoItem = new NativeUI.UIMenuCheckboxItem("Show Raycast Info"), (state?: boolean) => state ? tick.register("misc:drawRaycastInfo", () => {
            let entity = alt.Entity.getByScriptID(game.getEntityPlayerIsFreeAimingAt(alt.Player.local.scriptID, 0)[1])
            if (entity)
                this.draw3DText(`~y~SCRIPTID ${entity.scriptID} - ID ${entity.id} - TYPE ${entity.type} - POS (${entity.pos.x.toFixed(3)} - ${entity.pos.y.toFixed(3)} - ${entity.pos.z.toFixed(3)}) - ${game.isEntityDead(entity.scriptID, false) ? "DEAD" : "ALIVE"} - DISTANCE ${Game.getDistanceBetweenCoords(alt.Player.local.pos, entity.pos).toFixed(3)}`, entity)
        }, 0) : tick.clear("misc:drawRaycastInfo"))
        this.addItem(this.hideHudItem = new NativeUI.UIMenuCheckboxItem("Hide Game Hud"), (state?: boolean) => {
            state ? tick.register("misc:hideHud", () => Enum.getValues(HudComponent).forEach(component => game.hideHudComponentThisFrame(+component)), 0) : tick.clear("misc:hideHud")
            game.displayRadar(!state)
        })
        this.addItem(this.creditsItem = new NativeUI.UIMenuItem("About\\Credits", "Trainer made by ~b~Jayreen~s~ #1395 for ~b~alt:V~s~."))
        this.creditsItem.LeftBadge = NativeUI.BadgeStyle.Heart
        this.creditsItem.RightLabel = "~h~ 1.0.0"
        alt.on("keyup", (key: number) => {
            if (key == Key.F7 && this.teleportToMarkerItem.Checked) {
                let handle = game.getFirstBlipInfoId(8)
                if (game.doesBlipExist(handle))
                    Player.teleportTo(alt.Player.local, game.getBlipInfoIdCoord(handle))
            }
        })
    }

    private draw3DText(text: string, entity: alt.Entity) {
        new Text3D(text, null, 0.06, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 180), entity).drawThisFrame()
    }
}
