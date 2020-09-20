import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Player } from "../utils/player"
import { Menu } from "../utils/menu"
import { AnimationFlag } from "../enums/animationFlag"
import { PedHash } from "../enums/pedHash"
import { tick } from "../modules/tick"
import { Enum } from "../utils/enum"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"

export class PlayerMenu extends AbstractSubMenu {
    private modelMenu: ModelMenu
    private animationItem: ui.UIMenuItem
    private reviveItem: ui.UIMenuItem
    private healItem: ui.UIMenuItem
    private invisibilityItem: ui.UIMenuCheckboxItem
    private godmodeItem: ui.UIMenuCheckboxItem
    private ragdollItem: ui.UIMenuCheckboxItem
    private collisionItem: ui.UIMenuCheckboxItem
    private infiniteStaminaItem: ui.UIMenuCheckboxItem
    private superJumpItem: ui.UIMenuCheckboxItem
    private fastRunItem: ui.UIMenuCheckboxItem
    private fastSwimItem: ui.UIMenuCheckboxItem
    private thermalVisionItem: ui.UIMenuCheckboxItem
    private nightVisionItem: ui.UIMenuCheckboxItem
    private suicideItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.modelMenu = new ModelMenu(this, "Ped Models")
        this.addUserInputItem(this.animationItem = new ui.UIMenuItem("Play Custom Animation", "Requires ~b~dictionary~s~ and ~b~name~s~."), async () => await this.playAnimation(await Game.getUserInput(), await Game.getUserInput(), this.animationItem))
        this.addItem(this.reviveItem = new ui.UIMenuItem("Revive Player"), () => Player.respawn())
        this.addItem(this.healItem = new ui.UIMenuItem("Heal Player"), () => Player.heal())
        this.addItem(this.invisibilityItem = new ui.UIMenuCheckboxItem("Player Invisibility"), (state?: boolean) => game.setEntityVisible(alt.Player.local.scriptID, !state, false))
        this.addItem(this.godmodeItem = new ui.UIMenuCheckboxItem("Player Godmode"), (state?: boolean) => Player.setInvincible(alt.Player.local, state))
        this.addItem(this.ragdollItem = new ui.UIMenuCheckboxItem("Disable Ragdoll"), (state?: boolean) => game.setPedCanRagdoll(alt.Player.local.scriptID, !state))
        this.addItem(this.collisionItem = new ui.UIMenuCheckboxItem("Disable Collision"), (state?: boolean) => game.setEntityCollision(alt.Player.local.scriptID, !state, true))
        this.addItem(this.infiniteStaminaItem = new ui.UIMenuCheckboxItem("Infinite Stamina"), (state?: boolean) =>
            state ? tick.register("player:infiniteStamina", () => game.resetPlayerStamina(alt.Player.local.scriptID), 0) : tick.clear("player:infiniteStamina"))
        this.addItem(this.superJumpItem = new ui.UIMenuCheckboxItem("Super Jump"), (state?: boolean) => state ? tick.register("player:superJump", () => game.setSuperJumpThisFrame(alt.Player.local.scriptID), 0) : tick.clear("player:superJump"))
        this.addItem(this.fastRunItem = new ui.UIMenuCheckboxItem("Fast Run"), (state?: boolean) => state ? game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.fastSwimItem = new ui.UIMenuCheckboxItem("Fast Swim"), (state?: boolean) => state ? game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.thermalVisionItem = new ui.UIMenuCheckboxItem("Thermal Vision"), (state?: boolean) => game.setSeethrough(state))
        this.addItem(this.nightVisionItem = new ui.UIMenuCheckboxItem("Night Vision"), (state?: boolean) => game.setNightvision(state))
        this.addItem(this.suicideItem = new ui.UIMenuItem("Suicide"), async () => {
            Menu.lockMenuItem(this.suicideItem)
            await Player.playAnimation("mp_suicide", "pill")
            alt.setTimeout(() => {
                game.setEntityHealth(alt.Player.local.scriptID, 0, 0)
                Menu.unlockMenuItem(this.suicideItem)
            }, 3200)
        })
        this.suicideItem.LeftBadge = ui.BadgeStyle.Alert
    }

    // https://alexguirre.github.io/animations-list/
    private async playAnimation(dict: string, value: string, item: ui.UIMenuItem) {
        await Player.playAnimation(dict, value, AnimationFlag.EnablePlayerControl)
        Menu.selectItem(item, ui.BadgeStyle.Tick)
        alt.setTimeout(() => Menu.deselectItem(item), game.getAnimDuration(dict, value) * 1000)
    }
}

class ModelMenu extends AbstractSubMenu {
    customItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customItem = new ui.UIMenuItem("Custom Player Model"), async () => Player.setModel(alt.hash(await Game.getUserInput())))
        Enum.getValues(PedHash).forEach(hash => this.addItem(new ui.UIMenuItem(PedHash[+hash].toUpperCase()), () => Player.setModel(+hash)))
    }
}
