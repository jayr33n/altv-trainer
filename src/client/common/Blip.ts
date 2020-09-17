import * as alt from "alt-client"
import * as game from "natives"
import BlipDisplayType from "../enums/BlipDisplayType"

// https://wiki.gtanet.work/index.php?title=Blips
export default class Blip {
    private _name: string
    private _sprite: number
    private _scale: number
    private _color: number
    private _display: BlipDisplayType
    private _isShortRange: boolean
    private _isHeadingEnabled: boolean
    handle: number
    position: alt.Vector3
    attachedTo: alt.Entity

    constructor(name: string, sprite: number, scale: number, color: number, display: BlipDisplayType, isShortRange: boolean, isHeadingEnabled: boolean, position: alt.Vector3, attachedTo: alt.Entity) {
        if (attachedTo) {
            this.handle = game.addBlipForEntity(attachedTo.scriptID)
            this.attachedTo = attachedTo
        }
        else {
            this.handle = game.addBlipForCoord(position.x, position.y, position.z)
            this.position = position
        }
        this.name = name
        this.sprite = sprite
        this.scale = scale
        this.color = color
        this.display = display
        this.isShortRange = isShortRange
        this.isHeadingEnabled = isHeadingEnabled
    }

    get name() {
        return this._name
    }

    set name(value) {
        game.beginTextCommandSetBlipName("STRING")
        game.addTextComponentSubstringPlayerName(value)
        game.endTextCommandSetBlipName(this.handle)
        this._name = value
    }

    get sprite() {
        return this._sprite
    }

    set sprite(value) {
        game.setBlipSprite(this.handle, value)
        this._sprite = value
    }

    get scale() {
        return this._scale
    }

    set scale(value) {
        game.setBlipScale(this.handle, value)
        this._scale = value
    }

    get color() {
        return this._color
    }

    set color(value) {
        game.setBlipColour(this.handle, value)
        this._color = value
    }

    get display() {
        return this._display
    }

    set display(value) {
        game.setBlipDisplay(this.handle, value)
        this._display = value
    }

    get isShortRange() {
        return this._isShortRange
    }

    set isShortRange(value) {
        game.setBlipAsShortRange(this.handle, value)
        this._isShortRange = value
    }

    get isHeadingEnabled() {
        return this._isHeadingEnabled
    }

    set isHeadingEnabled(value) {
        game.showHeadingIndicatorOnBlip(this.handle, value)
        this._isHeadingEnabled = value
    }

    delete() {
        game.removeBlip(this.handle)
    }
}
