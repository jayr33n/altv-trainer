import * as NativeUI from "../include/NativeUI/NativeUi"
import menuPool from "../modules/MenuPool"

export default abstract class AbstractMenu {
    menuObject: NativeUI.Menu

    constructor(title: string) {
        this.menuObject = new NativeUI.Menu("", title, new NativeUI.Point(50, -57))
        this.menuObject.SetNoBannerType()
        this.menuObject.DisableInstructionalButtons(true)
        this.menuObject.ItemSelect.on((selectedItem: NativeUI.UIMenuItem) => { if (selectedItem.Data) selectedItem.Data() })
        menuPool.menus.push(this.menuObject)
    }

    addItem<T extends NativeUI.UIMenuItem>(item: T, handler: () => void) {
        item.Data = handler
        this.menuObject.AddItem(item)
    }
}
