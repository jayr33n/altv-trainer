import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Entity from "../utils/Entity"
import network from "../modules/Network"
import Enum from "../utils/Enum"
import PedHash from "../enums/PedHash"
import Game from "../utils/Game"

export default class PlayerMenu extends AbstractSubMenu {
    private playerModelMenu: PlayerModelMenu
    private revivePlayerItem: NativeUI.UIMenuItem
    private healPlayerItem: NativeUI.UIMenuItem
    private playerInvisibilityItem: NativeUI.UIMenuCheckboxItem
    private playerGodmodeItem: NativeUI.UIMenuCheckboxItem
    private noRagdollItem: NativeUI.UIMenuCheckboxItem
    private superJumpItem: NativeUI.UIMenuCheckboxItem
    private fastRunItem: NativeUI.UIMenuCheckboxItem
    private fastSwimItem: NativeUI.UIMenuCheckboxItem
    private thermalVisionItem: NativeUI.UIMenuCheckboxItem
    private nightVisionItem: NativeUI.UIMenuCheckboxItem
    private suicideItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.playerModelMenu = new PlayerModelMenu(this, "Player Model")
        this.addItem(this.revivePlayerItem = new NativeUI.UIMenuItem("Revive Player"), async () => await network.callback("respawnPlayer"))
        this.addItem(this.healPlayerItem = new NativeUI.UIMenuItem("Heal Player"), async () => await network.callback("healPlayer"))
        this.addItem(this.playerInvisibilityItem = new NativeUI.UIMenuCheckboxItem("Player Invisibility"), (state?: boolean) => game.setEntityVisible(alt.Player.local.scriptID, !state, false))
        this.addItem(this.playerGodmodeItem = new NativeUI.UIMenuCheckboxItem("Player Godmode"), (state?: boolean) => Entity.setInvincible(alt.Player.local, state))
        this.addItem(this.noRagdollItem = new NativeUI.UIMenuCheckboxItem("No Ragdoll"), (state?: boolean) => game.setPedCanRagdoll(alt.Player.local.scriptID, !state))
        this.addItem(this.superJumpItem = new NativeUI.UIMenuCheckboxItem("Super Jump"))
        this.addItem(this.fastRunItem = new NativeUI.UIMenuCheckboxItem("Fast Run"), (state?: boolean) => {
            if (state) game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1.49)
            else game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1)
        })
        this.addItem(this.fastSwimItem = new NativeUI.UIMenuCheckboxItem("Fast Swim"), (state?: boolean) => {
            if (state) game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1.49)
            else game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1)
        })
        this.addItem(this.thermalVisionItem = new NativeUI.UIMenuCheckboxItem("Thermal Vision"), (state?: boolean) => game.setSeethrough(state))
        this.addItem(this.nightVisionItem = new NativeUI.UIMenuCheckboxItem("Night Vision"), (state?: boolean) => game.setNightvision(state))
        this.addItem(this.suicideItem = new NativeUI.UIMenuItem("Suicide"), async () => {
            Game.lockMenuItem(this.suicideItem)
            await Game.playAnimation("mp_suicide", "pill")
            alt.setTimeout(() => {
                Entity.kill(alt.Player.local)
                Game.unlockMenuItem(this.suicideItem)
            }, 3200)
        })
        this.suicideItem.LeftBadge = NativeUI.BadgeStyle.Alert
        alt.everyTick(() => {
            if (this.superJumpItem.Checked)
                game.setSuperJumpThisFrame(alt.Player.local.scriptID)
        })
    }
}

class PlayerModelMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addModels()
    }

    addModels() {
        Enum.getValues(PedHash).forEach(hash => this.addItem(new NativeUI.UIMenuItem(PedHash[+hash]), async () => network.callback("setPlayerModel", [+hash])))
    }
}
