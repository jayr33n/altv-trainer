import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"
import Player from "../utils/Player"

export default class OnlineMenu extends AbstractSubMenu {
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
            alt.Player.all.forEach(player => new OnlinePlayerMenu(this, `${player.id} ${player.name}`, player))
        }
    }
}

class OnlinePlayerMenu extends AbstractSubMenu {
    private teleportToItem: NativeUI.UIMenuItem
    private teleportHereItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string, player: alt.Player) {
        super(parentMenu, title)
        this.addItem(this.teleportToItem = new NativeUI.UIMenuItem("Teleport To"), () => Player.teleportToEntity(alt.Player.local, player))
        this.addItem(this.teleportHereItem = new NativeUI.UIMenuItem("Teleport Here"), () => Player.teleportToEntity(player, alt.Player.local))
    }
}
