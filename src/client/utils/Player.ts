import Ped from "./Ped"
import network from "../modules/Network"
import PedHash from "../enums/PedHash"
import WeaponHash from "../enums/WeaponHash"

export default class Player extends Ped {
    static async respawn() {
        await network.callback("respawnPlayer")
    }

    static async heal() {
        await network.callback("healPlayer")
    }

    static async setModel(hash: PedHash) {
        await network.callback("setPlayerModel", [hash])
    }

    static async giveWeapon(weapon: WeaponHash, equip = false, ammo = 250) {
        await network.callback("giveWeapon", [weapon, ammo, equip])
    }

    static async removeWeapon(weapon: WeaponHash) {
        await network.callback("removeWeapon", [weapon])
    }

    static async removeAllWeapons() {
        await network.callback("removeAllWeapons")
    }
}
