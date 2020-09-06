import menuPool from "../modules/MenuPool"
import { Menu, UIMenuItem, UIMenuListItem, UIMenuAutoListItem, UIMenuDynamicListItem, UIMenuSliderItem, UIMenuCheckboxItem, Point } from "../include/NativeUI/NativeUi"

export default abstract class AbstractMenu {
    menuObject: Menu

    protected constructor(title: string) {
        this.menuObject = new Menu("", title.toUpperCase(), new Point(50, -57))
        this.menuObject.SetNoBannerType()
        this.menuObject.DisableInstructionalButtons(true)
        this.menuObject.ItemSelect.on((selectedItem: UIMenuItem) => selectedItem.Data())
        menuPool.add(this.menuObject)
    }

    addItem<T extends UIMenuItem>(item: T, handler = () => { }) {
        item.Data = handler
        this.menuObject.AddItem(item)
    }
}
