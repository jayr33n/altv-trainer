import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import MainMenu from "../menus/mainMenu"
import Key from "../enums/key"

class MenuPool {
    private menus: NativeUI.Menu[] = []

    init() {
        let mainMenu = new MainMenu("Main Menu")
        alt.on("keyup", (key: number) => {
            if (key == Key.M) {
                if (!this.isAnyMenuOpen())
                    mainMenu.menuObject.Open()
            }
        })
    }

    add(menu: NativeUI.Menu) {
        menuPool.menus.push(menu)
    }

    remove(menu: NativeUI.Menu) {
        menuPool.menus = menuPool.menus.filter(x => x !== menu)
    }

    private isAnyMenuOpen() {
        let result = false
        this.menus.forEach(menu => {
            if (menu.Visible)
                result = true
        })
        return result
    }
}

const menuPool = new MenuPool()
export default menuPool
