import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import MainMenu from "../menus/MainMenu"
import Key from "../enums/Key"

class MenuPool {
    private menus: NativeUI.Menu[] = []
    private mainMenu: MainMenu

    init() {
        this.mainMenu = new MainMenu("Main Menu")
        alt.on("keyup", (key: number) => {
            if (key == Key.M) {
                if (!this.isAnyMenuOpen())
                    this.mainMenu.menuObject.Open()
            }
        })
    }

    add(menu: NativeUI.Menu) {
        menuPool.menus.push(menu)
        //Game.logDebug("added to menu pool " + menuPool.menus.length)
    }

    remove(menu: NativeUI.Menu) {
        menuPool.menus = menuPool.menus.filter(x => x !== menu)
        //Game.logDebug("removed from menu pool " + menuPool.menus.length)
    }

    private isAnyMenuOpen() {
        let result = false
        this.menus.forEach(menu => { if (menu.Visible) result = true })
        return result
    }
}

const menuPool = new MenuPool()
export default menuPool
