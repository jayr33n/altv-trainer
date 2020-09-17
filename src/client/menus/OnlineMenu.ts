import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import Game from "../utils/Game"

export default class OnlineMenu extends AbstractSubMenu {
    static spectatingPlayer: alt.Player
    private reloadPlayerListItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.reloadPlayerListItem = new NativeUI.UIMenuItem("Reload Player List"), () => this.reloadPlayerList())
        this.reloadPlayerListItem.LeftBadge = NativeUI.BadgeStyle.Alert
        this.menuObject.MenuOpen.on(() => this.reloadPlayerList())
    }

    private reloadPlayerList() {
        if (this.menuObject.MenuItems.length != alt.Player.all.length + 1) {
            this.menuObject.MenuItems.splice(1)
            alt.Player.all.forEach(player => new OnlinePlayerMenu(this, `ID ${player.id} - ${player.name}`, player))
        }
    }
}

class OnlinePlayerMenu extends AbstractSubMenu {
    private hwIdHashItem: NativeUI.UIMenuItem
    private hwIdExHashItem: NativeUI.UIMenuItem
    private socialIdItem: NativeUI.UIMenuItem
    private teleportToItem: NativeUI.UIMenuItem
    private teleportHereItem: NativeUI.UIMenuItem


    constructor(parentMenu: AbstractMenu, title: string, player: alt.Player) {
        super(parentMenu, title)
        this.addItem(this.hwIdHashItem = new NativeUI.UIMenuItem("HWID"))
        this.addItem(this.hwIdExHashItem = new NativeUI.UIMenuItem("HWIDEX"))
        this.addItem(this.socialIdItem = new NativeUI.UIMenuItem("SOCIALID"))
        this.addItem(this.teleportToItem = new NativeUI.UIMenuItem("Teleport To Player"), () => Game.teleportPlayertoEntity(alt.Player.local, player))
        this.addItem(this.teleportHereItem = new NativeUI.UIMenuItem("Teleport Here"), () => Game.teleportPlayertoEntity(player, alt.Player.local))
        this.getIdentifiers(player)
    }

    private async getIdentifiers(player: alt.Player) {
        let identifiers = await Game.getPlayerIdentifiers(player)
        this.hwIdHashItem.RightLabel = identifiers[0]
        this.hwIdExHashItem.RightLabel = identifiers[1]
        this.socialIdItem.RightLabel = identifiers[2]
    }
}
