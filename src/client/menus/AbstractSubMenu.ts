import AbstractMenu from "./AbstractMenu"
import * as NativeUI from "../include/NativeUI/NativeUi"

export default abstract class AbstractSubMenu extends AbstractMenu {
    parentMenu: NativeUI.Menu
    menuItem: NativeUI.UIMenuItem

    constructor(parentMenu: NativeUI.Menu, title: string) {
        super(title)
        this.menuItem = new NativeUI.UIMenuItem(title)
        this.menuItem.RightLabel = "→→→"
        this.parentMenu.AddItem(this.menuItem)
        this.parentMenu.AddSubMenu(this.menuObject, this.menuItem)
    }
}
