import * as ui from "@durtyfree/altv-nativeui"
import { AbstractMenu } from "./abstractMenu"

export abstract class AbstractSubMenu extends AbstractMenu {
    parentMenu: AbstractMenu
    menuItem: ui.UIMenuItem

    protected constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu.pool, title)
        this.parentMenu = parentMenu
        this.menuItem = new ui.UIMenuItem(title)
        this.menuItem.RightLabel = "→→→"
        this.parentMenu.addItem(this.menuItem)
        this.parentMenu.menuObject.AddSubMenu(this.menuObject, this.menuItem)
    }

    protected remove() {
        this.parentMenu.menuObject.RemoveItem(this.menuItem)
        this.pool.remove(this.menuObject)
    }
}
