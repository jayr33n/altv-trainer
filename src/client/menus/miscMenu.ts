import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import * as json from "../../../package.json"
import { Font } from "../enums/font"
import { Player } from "../utils/player"
import { Text2D } from "../common/text2D"
import { Text3D } from "../common/text3D"
import { HudComponent } from "../enums/hudComponent"
import { Key } from "../enums/key"
import { tick } from "../modules/tick"
import { Enum } from "../utils/enum"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"

export class MiscMenu extends AbstractSubMenu {
    private customPropItem: ui.UIMenuItem
    private customTeleportItem: ui.UIMenuItem
    private teleportToMarkerItem: ui.UIMenuCheckboxItem
    private playerCoordsItem: ui.UIMenuCheckboxItem
    private playerSpeedItem: ui.UIMenuCheckboxItem
    private entitiesInfoItem: ui.UIMenuCheckboxItem
    private raycastInfoItem: ui.UIMenuCheckboxItem
    private hideHudItem: ui.UIMenuCheckboxItem
    private creditsItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPropItem = new ui.UIMenuItem("Spawn Custom Prop"), async () => Game.createProp(alt.hash(await Game.getUserInput()), alt.Player.local.pos, true))
        this.addUserInputItem(this.customTeleportItem = new ui.UIMenuItem("Teleport To Coordinates"), async () => {
            let x = +await Game.getUserInput()
            let y = +await Game.getUserInput()
            let z = +await Game.getUserInput()
            game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z)
        })
        this.addItem(this.teleportToMarkerItem = new ui.UIMenuCheckboxItem("Teleport To Marker", true, "This enables the ~b~F7~s~ key to be used as a shortcut to teleport around the map."))
        this.addItem(this.playerCoordsItem = new ui.UIMenuCheckboxItem("Show Player Coordinates"), (state?: boolean) =>
            state ? tick.register("misc:drawPlayerCoord", () =>
                new Text2D(`~y~x~s~ ${alt.Player.local.pos.x.toFixed(3)}` +
                    ` ~y~y~s~ ${alt.Player.local.pos.y.toFixed(3)}` +
                    ` ~y~z~s~ ${alt.Player.local.pos.z.toFixed(3)}`, [0.5, 0.95], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 220), true).drawThisFrame(), 0) : tick.clear("misc:drawPlayerCoord"))
        this.addItem(this.playerSpeedItem = new ui.UIMenuCheckboxItem("Show Player Speed"), (state?: boolean) =>
            state ? tick.register("misc:drawPlayerSpeed", () =>
                new Text2D(`~y~m/s~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID)).toFixed(3)}` +
                    ` ~y~km/h~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID) * 3.6).toFixed(3)}` +
                    ` ~y~mph~s~ ${(game.getEntitySpeed(alt.Player.local.scriptID) * 2.23694).toFixed(3)}`, [0.5, 0.9], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 220), true).drawThisFrame(), 0) : tick.clear("misc:drawPlayerSpeed"))
        this.addItem(this.entitiesInfoItem = new ui.UIMenuCheckboxItem("Show Entity Info"), (state?: boolean) =>
            state ? tick.register("misc:drawEntityInfo", () => {
                alt.Vehicle.all.forEach(vehicle => this.draw3DText(`SCRIPTID ${vehicle.scriptID}` +
                    ` - ID ${vehicle.id}` +
                    ` - TYPE ${vehicle.type}` +
                    ` - MODEL ${vehicle.model}` +
                    ` - BODY ${game.getVehicleBodyHealth(vehicle.scriptID)}` +
                    ` - ENGINE ${game.getVehicleEngineHealth(vehicle.scriptID)}` +
                    ` - PETROL TANK ${game.getVehiclePetrolTankHealth(vehicle.scriptID)}`, vehicle))
                alt.Player.all.forEach(player => this.draw3DText(`SCRIPTID ${player.scriptID}` +
                    ` - ID ${player.id} - TYPE ${player.type}` +
                    ` - MODEL ${player.model}` +
                    ` - HEALTH ${game.getEntityHealth(player.scriptID)}` +
                    ` - ARMOR ${game.getPedArmour(player.scriptID)}`, player))
            }, 0) : tick.clear("misc:drawEntityInfo"))
        this.addItem(this.raycastInfoItem = new ui.UIMenuCheckboxItem("Show Raycast Info"), (state?: boolean) =>
            state ? tick.register("misc:drawRaycastInfo", () => {
                let entity = alt.Entity.getByScriptID(game.getEntityPlayerIsFreeAimingAt(alt.Player.local.scriptID, 0)[1])
                if (!entity)
                    return
                let entityText = `~y~SCRIPTID ${entity.scriptID}` +
                    ` - ID ${entity.id}` +
                    ` - TYPE ${entity.type}` +
                    ` - POS (${entity.pos.x.toFixed(3)}` +
                    ` - ${entity.pos.y.toFixed(3)}` +
                    ` - ${entity.pos.z.toFixed(3)})` +
                    ` - ${game.isEntityDead(entity.scriptID, false) ? "DEAD" : "ALIVE"}` +
                    ` - DISTANCE ${Game.getDistanceBetweenCoords(alt.Player.local.pos, entity.pos).toFixed(3)}`
                if (entity instanceof alt.Vehicle)
                    entityText = entityText.concat(` - ${game.getVehicleDoorsLockedForPlayer(entity.scriptID, alt.Player.local.scriptID) ? "LOCKED" : "UNLOCKED"}`)
                this.draw3DText(entityText, entity)
            }, 0) : tick.clear("misc:drawRaycastInfo"))
        this.addItem(this.hideHudItem = new ui.UIMenuCheckboxItem("Hide Game Hud"), (state?: boolean) => {
            state ? tick.register("misc:hideHud", () => Enum.getValues(HudComponent).forEach(component => game.hideHudComponentThisFrame(+component)), 0) : tick.clear("misc:hideHud")
            game.displayRadar(!state)
        })
        this.addItem(this.creditsItem = new ui.UIMenuItem("About\\Credits", `Trainer made by ~b~${json.author}~s~ #1395 for ~b~alt:V~s~.`))
        this.creditsItem.LeftBadge = ui.BadgeStyle.Heart
        this.creditsItem.RightLabel = `~h~ ${json.version}`
        alt.on("keyup", (key: number) => {
            if (key == Key.F7 && this.teleportToMarkerItem.Checked) {
                let handle = game.getFirstBlipInfoId(8)
                if (game.doesBlipExist(handle))
                    Player.teleportTo(game.getBlipInfoIdCoord(handle))
            }
        })
    }

    private draw3DText(text: string, entity: alt.Entity) {
        new Text3D(text, undefined, 0.06, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 220), entity).drawThisFrame()
    }
}
