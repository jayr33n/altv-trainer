import * as ui from "@durtyfree/altv-nativeui"

export class Menu {
    static selectItem(item: ui.UIMenuItem, badge: ui.BadgeStyle) {
        item.Parent.MenuItems.forEach(item => this.deselectItem(item))
        item.Enabled = false
        item.RightBadge = badge
    }

    static deselectItem(item: ui.UIMenuItem) {
        item.Enabled = true
        item.RightBadge = ui.BadgeStyle.None
    }

    static lockMenuItem(menuItem: ui.UIMenuItem) {
        if (menuItem)
            menuItem.Enabled = false
    }

    static unlockMenuItem(menuItem: ui.UIMenuItem) {
        if (menuItem)
            menuItem.Enabled = true
    }

    static lockMenuItems(menu: ui.Menu) {
        menu.MenuItems.forEach(item => this.lockMenuItem(item))
    }

    static unlockMenuItems(menu: ui.Menu) {
        menu.MenuItems.forEach(item => this.unlockMenuItem(item))
    }

    static sortMenuItems(menu: ui.Menu) {
        menu.MenuItems.sort((a, b) => a.Text.localeCompare(b.Text))
    }
}
