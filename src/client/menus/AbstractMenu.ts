import menuPool from "../modules/MenuPool"
import { Menu, UIMenuItem, Point, UIMenuCheckboxItem, UIMenuDynamicListItem, ChangeDirection } from "../include/NativeUI/NativeUi"

export default abstract class AbstractMenu {
    menuObject: Menu

    protected constructor(title: string) {
        this.menuObject = new Menu("", title.toUpperCase(), new Point(50, -57))
        this.menuObject.SetNoBannerType()
        this.menuObject.DisableInstructionalButtons(true)
        this.menuObject.ItemSelect.on((item: UIMenuItem) => item.Data())
        this.menuObject.CheckboxChange.on((item: UIMenuCheckboxItem, state: boolean) => item.Data(state))
        this.menuObject.DynamicListChange.on((item: UIMenuDynamicListItem, index: number, direction: ChangeDirection) => item.Data(index, direction))
        menuPool.add(this.menuObject)
    }

    addItem<T extends UIMenuItem>(item: T, handler = () => { }) {
        item.Data = handler
        this.menuObject.AddItem(item)
    }
}
