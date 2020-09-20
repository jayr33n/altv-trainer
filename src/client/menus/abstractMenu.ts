import * as ui from "@durtyfree/altv-nativeui"
import { AbstractMenuPool } from "../modules/menuPool"

export abstract class AbstractMenu {
    pool: AbstractMenuPool
    menuObject: ui.Menu

    protected constructor(pool: AbstractMenuPool, title: string) {
        this.pool = pool
        this.menuObject = new ui.Menu("", title.toUpperCase(), new ui.Point(50, -57))
        this.menuObject.SetNoBannerType()
        this.menuObject.DisableInstructionalButtons(true)
        this.menuObject.ItemSelect.on((item: ui.UIMenuItem) => item.Data())
        this.menuObject.CheckboxChange.on((item: ui.UIMenuCheckboxItem, state: boolean) => item.Data(state))
        this.menuObject.DynamicListChange.on((item: ui.UIMenuDynamicListItem, index: number, direction: ui.ChangeDirection) => item.Data(index, direction))
        this.menuObject.ListChange.on((item: ui.UIMenuListItem, index: number) => item.Data(index))
        this.pool.add(this.menuObject)
    }

    addItem<T extends ui.UIMenuItem>(item: T, handler = () => { }) {
        item.Data = handler
        this.menuObject.AddItem(item)
    }

    addUserInputItem<T extends ui.UIMenuItem>(item: T, handler: () => void) {
        item.RightLabel = "[ ... ]"
        this.addItem(item, handler)
    }
}
