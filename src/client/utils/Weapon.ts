import WeaponHash from "../enums/WeaponHash"
import network from "../modules/Network"

export default class Weapon {
    static async addComponent(weapon: WeaponHash, component: number) {
        await network.callback("weapon:addComponent", [weapon, component])
    }

    static async removeComponent(weapon: WeaponHash, component: number) {
        await network.callback("weapon:removeComponent", [weapon, component])
    }
}
