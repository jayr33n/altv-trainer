import * as alt from "alt-client"
import * as game from "natives"
import network from "../modules/Network"
import PedHash from "../enums/PedHash"
import WeaponHash from "../enums/WeaponHash"
import Entity from "./Entity"
import AnimationFlag from "../enums/AnimationFlag"
import Game from "./Game"

export default class Player extends Entity {
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

    static async playAnimation(player: alt.Entity, dict: string, name: string, flag = AnimationFlag.Normal) {
        await Game.loadAnimationDict(dict)
        game.taskPlayAnim(player.scriptID, dict, name, 8, 8, -1, flag, 0, false, false, true)
    }

    static teleportTo(player: alt.Entity, coord: alt.Vector3) {
        let pos = game.getClosestMajorVehicleNode(coord.x, coord.y, 0, undefined, 3.0, 0)[1]
        game.setPedCoordsKeepVehicle(player.scriptID, pos.x, pos.y, pos.z)
    }

    static async teleportToEntity(entity: alt.Player, to: alt.Entity) {
        await network.callback("player:teleportToEntity", [entity, to])
    }
}
