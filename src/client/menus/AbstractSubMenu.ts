import AbstractMenu from "./AbstractMenu"
import menuPool from "../modules/MenuPool"
import { UIMenuItem } from "../include/NativeUI/NativeUi"

export default abstract class AbstractSubMenu extends AbstractMenu {
    parentMenu: AbstractMenu
    menuItem: UIMenuItem

    protected constructor(parentMenu: AbstractMenu, title: string) {
        super(title)
        this.parentMenu = parentMenu
        this.menuItem = new UIMenuItem(title)
        this.menuItem.RightLabel = "→→→"
        this.parentMenu.addItem(this.menuItem)
        this.parentMenu.menuObject.AddSubMenu(this.menuObject, this.menuItem)
    }

    protected remove() {
        this.parentMenu.menuObject.RemoveItem(this.menuItem)
        menuPool.remove(this.menuObject)
    }
}
