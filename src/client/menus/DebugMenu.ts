import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import tick from "../modules/Tick"
import Text2D from "../common/Text2D"
import Font from "../enums/Font"

export default class DebugMenu extends AbstractSubMenu {
    showCoord: NativeUI.UIMenuCheckboxItem
    coordText: Text2D

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.coordText = new Text2D("", [0.5, 0.95], 0.5, Font.ChaletComprimeCologne, new alt.RGBA(255, 255, 255, 180), true)
        this.addItem(this.showCoord = new NativeUI.UIMenuCheckboxItem("Show Coordinates"), (state?: boolean) => {
            state ? tick.register("drawCoordText", () => {
                this.coordText.text = `x ${alt.Player.local.pos.x.toFixed(2)} y ${alt.Player.local.pos.y.toFixed(2)} z ${alt.Player.local.pos.z.toFixed(2)}`
                this.coordText.drawThisFrame()
            }, 0) : tick.clear("drawCoordText")
        })
    }
}
