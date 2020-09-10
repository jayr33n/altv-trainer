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
import tick from "../modules/Tick"
import AnimationFlag from "../enums/AnimationFlag"
import Menu from "../utils/Menu"

export default class PlayerMenu extends AbstractSubMenu {
    private animationsMenu: AnimationsMenu
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
        this.animationsMenu = new AnimationsMenu(this, "Animations")
        this.playerModelMenu = new PlayerModelMenu(this, "Player Model")
        this.addItem(this.revivePlayerItem = new NativeUI.UIMenuItem("Revive Player"), async () => await network.callback("respawnPlayer"))
        this.addItem(this.healPlayerItem = new NativeUI.UIMenuItem("Heal Player"), async () => await network.callback("healPlayer"))
        this.addItem(this.playerInvisibilityItem = new NativeUI.UIMenuCheckboxItem("Player Invisibility"), (state?: boolean) => game.setEntityVisible(alt.Player.local.scriptID, !state, false))
        this.addItem(this.playerGodmodeItem = new NativeUI.UIMenuCheckboxItem("Player Godmode"), (state?: boolean) => Entity.setInvincible(alt.Player.local, state))
        this.addItem(this.noRagdollItem = new NativeUI.UIMenuCheckboxItem("No Ragdoll"), (state?: boolean) => game.setPedCanRagdoll(alt.Player.local.scriptID, !state))
        this.addItem(this.superJumpItem = new NativeUI.UIMenuCheckboxItem("Super Jump"), (state?: boolean) => state ? tick.register("enableSuperJumpThisFrame", () => game.setSuperJumpThisFrame(alt.Player.local.scriptID), 0) : tick.clear("enableSuperJumpThisFrame"))
        this.addItem(this.fastRunItem = new NativeUI.UIMenuCheckboxItem("Fast Run"), (state?: boolean) => state ? game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.fastSwimItem = new NativeUI.UIMenuCheckboxItem("Fast Swim"), (state?: boolean) => state ? game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1.49) : game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1))
        this.addItem(this.thermalVisionItem = new NativeUI.UIMenuCheckboxItem("Thermal Vision"), (state?: boolean) => game.setSeethrough(state))
        this.addItem(this.nightVisionItem = new NativeUI.UIMenuCheckboxItem("Night Vision"), (state?: boolean) => game.setNightvision(state))
        this.addItem(this.suicideItem = new NativeUI.UIMenuItem("Suicide"), async () => {
            Menu.lockMenuItem(this.suicideItem)
            await Game.playAnimation("mp_suicide", "pill")
            alt.setTimeout(() => {
                Entity.kill(alt.Player.local)
                Menu.unlockMenuItem(this.suicideItem)
            }, 3200)
        })
        this.suicideItem.LeftBadge = NativeUI.BadgeStyle.Alert
    }
}

class PlayerModelMenu extends AbstractSubMenu {
    customPlayerModelItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPlayerModelItem = new NativeUI.UIMenuItem("Custom Player Model"), async () => await network.callback("setPlayerModel", [alt.hash(await Game.getUserInput())]))
        Enum.getValues(PedHash).forEach(hash => this.addItem(new NativeUI.UIMenuItem(PedHash[+hash]), async () => await network.callback("setPlayerModel", [+hash])))
    }
}

// https://alexguirre.github.io/animations-list/
class AnimationsMenu extends AbstractSubMenu {
    private customAnimationItem: NativeUI.UIMenuItem
    private animations = [
        ["anim@mp_player_intuppersalute", "idle_a"],
        ["anim@mp_player_intselfiethe_bird", "idle_a"],
        ["anim@mp_player_intupperface_palm", "idle_a"],
        ["anim@mp_player_intcelebrationmale@slow_clap", "slow_clap"],
        ["amb@world_human_cheering@male_a", "base"],
        ["gestures@m@standing@casual", "gesture_damn"],
        ["mp_player_int_upperpeace_sign", "mp_player_int_peace_sign"],
        ["oddjobs@assassinate@construction@", "unarmed_fold_arms"],
        ["random@car_thief@agitated@idle_a", "agitated_idle_a"],
        ["mp_player_int_uppergang_sign_a", "mp_player_int_gang_sign_a"],
        ["anim@amb@nightclub@mini@dance@dance_solo@female@var_a@", "high_center"],
        ["anim@amb@nightclub@mini@dance@dance_solo@female@var_a@", "high_center_down"],
        ["anim@amb@nightclub@mini@dance@dance_solo@male@var_b@", "high_right_down"],
        ["anim@amb@nightclub@mini@dance@dance_solo@male@var_a@", "low_left"]
    ]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customAnimationItem = new NativeUI.UIMenuItem("Play Custom Animation", "Requires ~b~dictionary~s~ and ~b~name~s~."), async () => {
            Game.playAnimation(await Game.getUserInput(), await Game.getUserInput())
            Menu.lockMenuItem(this.customAnimationItem)
            alt.setTimeout(() => Menu.unlockMenuItem(this.customAnimationItem), 3000)
        })
        this.animations.forEach(animation => {
            let item = new NativeUI.UIMenuItem(animation[1])
            this.addItem(item, async () => {
                await Game.playAnimation(animation[0], animation[1], AnimationFlag.EnablePlayerControl)
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
                alt.setTimeout(() => Menu.deselectItem(item), game.getAnimDuration(animation[0], animation[1]) * 1000)
            })
        })
    }
}
