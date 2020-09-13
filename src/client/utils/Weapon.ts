import WeaponHash from "../enums/WeaponHash"
import network from "../modules/Network"

export default class Weapon {
    static async addComponent(weapon: WeaponHash, component: number) {
        await network.callback("addWeaponComponent", [weapon, component])
    }

    static async removeComponent(weapon: WeaponHash, component: number) {
        await network.callback("removeWeaponComponent", [weapon, component])
    }

    static async getCurrent() {
        return (await network.callback("getCurrentWeapon") as WeaponHash)
    }
}
