import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"

export default class Game {
    static logDebug(message: string) {
        alt.log("[Debug] " + message)
    }

    static async getUserInput(length: number) {
        game.displayOnscreenKeyboard(6, "FMMC_KEY_TIP8", "", "", "", "", "", length)
        return await new Promise((resolve) => {
            let handle = alt.everyTick(() => {
                if (game.updateOnscreenKeyboard() != 0) {
                    resolve(game.getOnscreenKeyboardResult())
                    alt.clearEveryTick(handle)
                }
            })
        })
    }

    static setTimedInterval(handler: () => void, miliseconds = 50, timeout = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }

    static selectItem(item: NativeUI.UIMenuItem) {
        item.Parent.MenuItems.forEach(item => {
            item.Enabled = true
            item.RightBadge = NativeUI.BadgeStyle.None
        })
        item.Enabled = false
        item.RightBadge = NativeUI.BadgeStyle.Car
    }

    static lockMenuItems(menu: NativeUI.Menu) {
        menu.MenuItems.forEach(item => item.Enabled = false)
    }

    static unlockMenuItems(menu: NativeUI.Menu) {
        menu.MenuItems.forEach(item => item.Enabled = true)
    }

    static sortMenuItems(menu: NativeUI.Menu) {
        menu.MenuItems.sort((a, b) => a.Text.localeCompare(b.Text))
    }
}
