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
import Ped from "../utils/Ped"

export default class MiscMenu extends AbstractSubMenu {
    private customPropItem: NativeUI.UIMenuItem
    private customTeleportItem: NativeUI.UIMenuItem
    private teleportToMarkerItem: NativeUI.UIMenuCheckboxItem
    private showCoord: NativeUI.UIMenuCheckboxItem
    private creditsItem: NativeUI.UIMenuItem
    private coordText: Text2D

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPropItem = new NativeUI.UIMenuItem("Spawn Custom Prop"), async () => Game.createProp(alt.hash(await Game.getUserInput()), alt.Player.local.pos, true))
        this.addUserInputItem(this.customTeleportItem = new NativeUI.UIMenuItem("Teleport To Coordinates"), async () => {
            let x = +await Game.getUserInput()
            let y = +await Game.getUserInput()
            let z = +await Game.getUserInput()
            game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z)
        })
        this.addItem(this.teleportToMarkerItem = new NativeUI.UIMenuCheckboxItem("Teleport To Marker", false, "This enables the ~b~F7~s~ key to be used as a shortcut to teleport around the map."))
        this.coordText = new Text2D("", [0.5, 0.95], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 180), true)
        this.addItem(this.showCoord = new NativeUI.UIMenuCheckboxItem("Show Coordinates"), (state?: boolean) => {
            state ? tick.register("drawCoordText", () => {
                this.coordText.text = `x ${alt.Player.local.pos.x.toFixed(2)} y ${alt.Player.local.pos.y.toFixed(2)} z ${alt.Player.local.pos.z.toFixed(2)}`
                this.coordText.drawThisFrame()
            }, 0) : tick.clear("drawCoordText")
        })
        this.addItem(this.creditsItem = new NativeUI.UIMenuItem("About\\Credits", "Trainer made by ~b~Jayreen~s~ #1395 for ~b~alt:V~s~."))
        this.creditsItem.LeftBadge = NativeUI.BadgeStyle.Heart
        this.creditsItem.RightLabel = "~h~ 1.0.0"
        alt.on("keyup", (key: number) => {
            if (key == Key.F7 && this.teleportToMarkerItem.Checked) {
                let handle = game.getFirstBlipInfoId(8)
                if (game.doesBlipExist(handle))
                    Ped.teleportTo(alt.Player.local, game.getBlipInfoIdCoord(handle))
            }
        })
    }
}
