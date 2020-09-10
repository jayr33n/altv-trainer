import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"

export default class WeaponMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
    }
}
