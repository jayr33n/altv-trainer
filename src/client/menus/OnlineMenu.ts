import AbstractSubMenu from "./AbstractSubMenu"
import AbstractMenu from "./AbstractMenu"

export default class OnlineMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
    }
}
