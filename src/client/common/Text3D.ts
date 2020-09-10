import * as alt from "alt-client"
import * as game from "natives"
import AbstractText from "./AbstractText"
import Font from "../enums/Font"

export default class Text3D extends AbstractText {
    position: alt.Vector3
    attachedTo: alt.Entity

    constructor(text: string, position: alt.Vector3, scale: number, font: Font, color: alt.RGBA, attachedTo: alt.Entity) {
        super(text, scale, font, color)
        this.position = position
        this.attachedTo = attachedTo
    }

    drawThisFrame() {
        let p = game.getGameplayCamCoord()
        let dist = game.getDistanceBetweenCoords(p.x, p.y, p.z, this.position.x, this.position.y, this.position.z, true)
        let scale = (1 / dist) * 20
        let fov = (1 / game.getGameplayCamFov()) * 100
        scale = scale * fov
        game.setTextCentre(true)
        game.setTextScale(0, this.scale * scale)
        game.setTextColour(this.color.r, this.color.g, this.color.b, this.color.a)
        game.setTextFont(this.font)
        game.setTextOutline()
        game.setDrawOrigin(this.position.x, this.position.y, this.position.z, 0)
        game.beginTextCommandDisplayText("STRING")
        game.addTextComponentSubstringPlayerName(this.text)
        game.endTextCommandDisplayText(0, 0, 0)
        game.clearDrawOrigin()
    }
}
