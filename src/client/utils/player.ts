import * as alt from "alt-client"
import * as game from "natives"
import { AnimationFlag } from "../enums/animationFlag"
import { PedHash } from "../enums/pedHash"
import { WeaponHash } from "../enums/weaponHash"
import { network } from "../modules/network"
import { Entity } from "./entity"
import { Game } from "./game"

export class Player extends Entity {
    static async respawn() {
        await network.callback("player:respawn")
    }

    static async heal() {
        await network.callback("player:heal")
    }

    static async setModel(hash: PedHash) {
        await network.callback("player:setModel", [hash])
    }

    static async giveWeapon(weapon: WeaponHash, equip = false, ammo = 250) {
        await network.callback("player:giveWeapon", [weapon, ammo, equip])
    }

    static async removeWeapon(weapon: WeaponHash) {
        await network.callback("player:removeWeapon", [weapon])
    }

    static async removeAllWeapons() {
        await network.callback("player:removeAllWeapons")
    }

    static async addWeaponComponent(weapon: WeaponHash, component: number) {
        await network.callback("player:addWeaponComponent", [weapon, component])
    }

    static async removeWeaponComponent(weapon: WeaponHash, component: number) {
        await network.callback("player:removeWeaponComponent", [weapon, component])
    }

    static async playAnimation(dict: string, name: string, flag = AnimationFlag.Normal) {
        await Game.loadAnimationDict(dict)
        game.taskPlayAnim(alt.Player.local.scriptID, dict, name, 8, 8, -1, flag, 0, false, false, true)
    }

    static teleportTo(coord: alt.Vector3) {
        let pos = game.getClosestMajorVehicleNode(coord.x, coord.y, 0, undefined, 3.0, 0)[1]
        game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, pos.x, pos.y, pos.z)
    }
}
