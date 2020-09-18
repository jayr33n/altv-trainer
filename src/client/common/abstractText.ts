import * as alt from "alt-client"
import Font from "../enums/font"

export default abstract class AbstractText {
    text: string
    scale: number
    font: Font
    color: alt.RGBA

    constructor(text: string, scale: number, font: number, color: alt.RGBA) {
        this.text = text
        this.scale = scale
        this.font = font
        this.color = color
    }
}
