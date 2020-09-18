import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractSubMenu from "./abstractSubMenu"
import AbstractMenu from "./abstractMenu"
import Game from "../utils/game"
import Enum from "../utils/enum"
import WeaponHash from "../enums/weaponHash"
import WeaponCustomizationMenu from "./weaponCustomizationMenu"
import Player from "../utils/player"
import AmmoType from "../enums/ammoType"

export default class WeaponMenu extends AbstractSubMenu {
    private weaponCustomizationMenu: WeaponCustomizationMenu
    private giveWeaponItem: NativeUI.UIMenuItem
    private removeWeaponItem: NativeUI.UIMenuItem
    private giveAllWeaponsItem: NativeUI.UIMenuItem
    private refillAmmoItem: NativeUI.UIMenuItem
    private infiniteAmmoItem: NativeUI.UIMenuCheckboxItem
    private noReloadItem: NativeUI.UIMenuCheckboxItem
    private removeAllWeaponsItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.weaponCustomizationMenu = new WeaponCustomizationMenu(this, "Weapon Customization")
        this.addUserInputItem(this.giveWeaponItem = new NativeUI.UIMenuItem("Give Weapon"), async () => Player.giveWeapon(alt.hash(await Game.getUserInput()), true))
        this.addUserInputItem(this.removeWeaponItem = new NativeUI.UIMenuItem("Remove Weapon"), async () => Player.removeWeapon(alt.hash(await Game.getUserInput())))
        this.addItem(this.giveAllWeaponsItem = new NativeUI.UIMenuItem("Give All Weapons"), () => Enum.getValues(WeaponHash).forEach(weaponHash => Player.giveWeapon(+weaponHash)))
        this.addItem(this.refillAmmoItem = new NativeUI.UIMenuItem("Refill Ammo"), () => Enum.getValues(AmmoType).forEach(type => game.setPedAmmoByType(alt.Player.local.scriptID, +type, 250)))
        this.addItem(this.infiniteAmmoItem = new NativeUI.UIMenuCheckboxItem("Infinite Ammo"), (state?: boolean) => Enum.getValues(WeaponHash).forEach(weaponHash => game.setPedInfiniteAmmo(alt.Player.local.scriptID, state, +weaponHash)))
        this.addItem(this.noReloadItem = new NativeUI.UIMenuCheckboxItem("No Reload"), (state?: boolean) => game.setPedInfiniteAmmoClip(alt.Player.local.scriptID, state))
        this.addItem(this.removeAllWeaponsItem = new NativeUI.UIMenuItem("Remove All Weapons"), () => Player.removeAllWeapons())
        this.removeAllWeaponsItem.LeftBadge = NativeUI.BadgeStyle.Alert
    }
}
