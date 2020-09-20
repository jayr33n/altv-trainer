import * as alt from "alt-client"
import * as ui from "@durtyfree/altv-nativeui"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"

export class OnlineMenu extends AbstractSubMenu {
    static spectatingPlayer: alt.Player
    private reloadPlayerListItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.reloadPlayerListItem = new ui.UIMenuItem("Reload Player List"), () => this.reloadPlayerList())
        this.reloadPlayerListItem.LeftBadge = ui.BadgeStyle.Alert
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
    private hwIdHashItem: ui.UIMenuItem
    private hwIdExHashItem: ui.UIMenuItem
    private socialIdItem: ui.UIMenuItem
    private teleportToItem: ui.UIMenuItem
    private teleportHereItem: ui.UIMenuItem


    constructor(parentMenu: AbstractMenu, title: string, player: alt.Player) {
        super(parentMenu, title)
        this.addItem(this.hwIdHashItem = new ui.UIMenuItem("HWID"))
        this.addItem(this.hwIdExHashItem = new ui.UIMenuItem("HWIDEX"))
        this.addItem(this.socialIdItem = new ui.UIMenuItem("SOCIALID"))
        this.addItem(this.teleportToItem = new ui.UIMenuItem("Teleport To Player"), () => Game.teleportPlayertoEntity(alt.Player.local, player))
        this.addItem(this.teleportHereItem = new ui.UIMenuItem("Teleport Here"), () => Game.teleportPlayertoEntity(player, alt.Player.local))
        this.getIdentifiers(player)
    }

    private async getIdentifiers(player: alt.Player) {
        let identifiers = await Game.getPlayerIdentifiers(player)
        this.hwIdHashItem.RightLabel = identifiers[0]
        this.hwIdExHashItem.RightLabel = identifiers[1]
        this.socialIdItem.RightLabel = identifiers[2]
    }
}
