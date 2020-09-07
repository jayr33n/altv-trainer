import * as NativeUI from "../include/NativeUI/NativeUi"
import menuPool from "../modules/MenuPool"

export default abstract class AbstractMenu {
    menuObject: NativeUI.Menu

    protected constructor(title: string) {
        this.menuObject = new NativeUI.Menu("", title.toUpperCase(), new NativeUI.Point(50, -57))
        this.menuObject.SetNoBannerType()
        this.menuObject.DisableInstructionalButtons(true)
        this.menuObject.ItemSelect.on((item: NativeUI.UIMenuItem) => item.Data())
        this.menuObject.CheckboxChange.on((item: NativeUI.UIMenuCheckboxItem, state: boolean) => item.Data(state))
        this.menuObject.DynamicListChange.on((item: NativeUI.UIMenuDynamicListItem, index: number, direction: NativeUI.ChangeDirection) => item.Data(index, direction))
        menuPool.add(this.menuObject)
    }

    addItem<T extends NativeUI.UIMenuItem>(item: T, handler = () => { }) {
        item.Data = handler
        this.menuObject.AddItem(item)
    }
}
