import * as alt from "alt-client"
import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Player } from "../utils/player"
import { AmmoType } from "../enums/ammoType"
import { WeaponHash } from "../enums/weaponHash"
import { Enum } from "../utils/enum"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"
import { WeaponCustomizationMenu } from "./weaponCustomizationMenu"

export class WeaponMenu extends AbstractSubMenu {
    private weaponCustomizationMenu: WeaponCustomizationMenu
    private giveWeaponItem: ui.UIMenuItem
    private removeWeaponItem: ui.UIMenuItem
    private giveAllWeaponsItem: ui.UIMenuItem
    private refillAmmoItem: ui.UIMenuItem
    private infiniteAmmoItem: ui.UIMenuCheckboxItem
    private noReloadItem: ui.UIMenuCheckboxItem
    private removeAllWeaponsItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.weaponCustomizationMenu = new WeaponCustomizationMenu(this, "Weapon Customization")
        this.addUserInputItem(this.giveWeaponItem = new ui.UIMenuItem("Give Weapon"), async () => Player.giveWeapon(alt.hash(await Game.getUserInput()), true))
        this.addUserInputItem(this.removeWeaponItem = new ui.UIMenuItem("Remove Weapon"), async () => Player.removeWeapon(alt.hash(await Game.getUserInput())))
        this.addItem(this.giveAllWeaponsItem = new ui.UIMenuItem("Give All Weapons"), () => Enum.getValues(WeaponHash).forEach(weaponHash => Player.giveWeapon(+weaponHash)))
        this.addItem(this.refillAmmoItem = new ui.UIMenuItem("Refill Ammo"), () => Enum.getValues(AmmoType).forEach(type => game.setPedAmmoByType(alt.Player.local.scriptID, +type, 250)))
        this.addItem(this.infiniteAmmoItem = new ui.UIMenuCheckboxItem("Infinite Ammo"), (state?: boolean) => Enum.getValues(WeaponHash).forEach(weaponHash => game.setPedInfiniteAmmo(alt.Player.local.scriptID, state, +weaponHash)))
        this.addItem(this.noReloadItem = new ui.UIMenuCheckboxItem("No Reload"), (state?: boolean) => game.setPedInfiniteAmmoClip(alt.Player.local.scriptID, state))
        this.addItem(this.removeAllWeaponsItem = new ui.UIMenuItem("Remove All Weapons"), () => Player.removeAllWeapons())
        this.removeAllWeaponsItem.LeftBadge = ui.BadgeStyle.Alert
    }
}
