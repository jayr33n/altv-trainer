import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Enum from "../utils/Enum"
import PedHash from "../enums/PedHash"
import Game from "../utils/Game"
import tick from "../modules/Tick"
import AnimationFlag from "../enums/AnimationFlag"
import Menu from "../utils/Menu"
import Player from "../utils/Player"

export default class PlayerMenu extends AbstractSubMenu {
    private modelMenu: ModelMenu
    private animationItem: NativeUI.UIMenuItem
    private reviveItem: NativeUI.UIMenuItem
    private healItem: NativeUI.UIMenuItem
    private invisibilityItem: NativeUI.UIMenuCheckboxItem
    private godmodeItem: NativeUI.UIMenuCheckboxItem
    private ragdollItem: NativeUI.UIMenuCheckboxItem
    private collisionItem: NativeUI.UIMenuCheckboxItem
    private infiniteStaminaItem: NativeUI.UIMenuCheckboxItem
    private superJumpItem: NativeUI.UIMenuCheckboxItem
    private fastRunItem: NativeUI.UIMenuCheckboxItem
    private fastSwimItem: NativeUI.UIMenuCheckboxItem
    private thermalVisionItem: NativeUI.UIMenuCheckboxItem
    private nightVisionItem: NativeUI.UIMenuCheckboxItem
    private suicideItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.modelMenu = new ModelMenu(this, "Ped Models")
        this.addUserInputItem(this.animationItem = new NativeUI.UIMenuItem("Play Custom Animation", "Requires ~b~dictionary~s~ and ~b~name~s~."), async () => await this.playAnimation(await Game.getUserInput(), await Game.getUserInput(), this.animationItem))
        this.addItem(this.reviveItem = new NativeUI.UIMenuItem("Revive Player"), () => Player.respawn())
        this.addItem(this.healItem = new NativeUI.UIMenuItem("Heal Player"), () => Player.heal())
        this.addItem(this.invisibilityItem = new NativeUI.UIMenuCheckboxItem("Player Invisibility"), (state?: boolean) => game.setEntityVisible(alt.Player.local.scriptID, !state, false))
        this.addItem(this.godmodeItem = new NativeUI.UIMenuCheckboxItem("Player Godmode"), (state?: boolean) => Player.setInvincible(alt.Player.local, state))
        this.addItem(this.ragdollItem = new NativeUI.UIMenuCheckboxItem("Disable Ragdoll"), (state?: boolean) => game.setPedCanRagdoll(alt.Player.local.scriptID, !state))
        this.addItem(this.collisionItem = new NativeUI.UIMenuCheckboxItem("Disable Collision"), (state?: boolean) => game.setEntityCollision(alt.Player.local.scriptID, !state, true))
        this.addItem(this.infiniteStaminaItem = new NativeUI.UIMenuCheckboxItem("Infinite Stamina"), (state?: boolean) =>
            state ? tick.register("player:infiniteStamina", () => game.resetPlayerStamina(alt.Player.local.scriptID), 0) : tick.clear("player:infiniteStamina"))
        this.addItem(this.superJumpItem = new NativeUI.UIMenuCheckboxItem("Super Jump"), (state?: boolean) => state ? tick.register("player:superJump", () => game.setSuperJumpThisFrame(alt.Player.local.scriptID), 0) : tick.clear("player:superJump"))
        this.addItem(this.fastRunItem = new NativeUI.UIMenuCheckboxItem("Fast Run"), (state?: boolean) => state ? game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.fastSwimItem = new NativeUI.UIMenuCheckboxItem("Fast Swim"), (state?: boolean) => state ? game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.thermalVisionItem = new NativeUI.UIMenuCheckboxItem("Thermal Vision"), (state?: boolean) => game.setSeethrough(state))
        this.addItem(this.nightVisionItem = new NativeUI.UIMenuCheckboxItem("Night Vision"), (state?: boolean) => game.setNightvision(state))
        this.addItem(this.suicideItem = new NativeUI.UIMenuItem("Suicide"), async () => {
            Menu.lockMenuItem(this.suicideItem)
            await Player.playAnimation("mp_suicide", "pill")
            alt.setTimeout(() => {
                game.setEntityHealth(alt.Player.local.scriptID, 0, 0)
                Menu.unlockMenuItem(this.suicideItem)
            }, 3200)
        })
        this.suicideItem.LeftBadge = NativeUI.BadgeStyle.Alert
    }

    // https://alexguirre.github.io/animations-list/
    private async playAnimation(dict: string, value: string, item: NativeUI.UIMenuItem) {
        await Player.playAnimation(dict, value, AnimationFlag.EnablePlayerControl)
        Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
        alt.setTimeout(() => Menu.deselectItem(item), game.getAnimDuration(dict, value) * 1000)
    }
}

class ModelMenu extends AbstractSubMenu {
    customItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customItem = new NativeUI.UIMenuItem("Custom Player Model"), async () => Player.setModel(alt.hash(await Game.getUserInput())))
        Enum.getValues(PedHash).forEach(hash => this.addItem(new NativeUI.UIMenuItem(PedHash[+hash].toUpperCase()), () => Player.setModel(+hash)))
    }
}
