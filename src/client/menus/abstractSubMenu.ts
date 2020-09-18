import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./abstractMenu"
import menuPool from "../modules/menuPool"

export default abstract class AbstractSubMenu extends AbstractMenu {
    parentMenu: AbstractMenu
    menuItem: NativeUI.UIMenuItem

    protected constructor(parentMenu: AbstractMenu, title: string) {
        super(title)
        this.parentMenu = parentMenu
        this.menuItem = new NativeUI.UIMenuItem(title)
        this.menuItem.RightLabel = "→→→"
        this.parentMenu.addItem(this.menuItem)
        this.parentMenu.menuObject.AddSubMenu(this.menuObject, this.menuItem)
    }

    protected remove() {
        this.parentMenu.menuObject.RemoveItem(this.menuItem)
        menuPool.remove(this.menuObject)
    }
}
