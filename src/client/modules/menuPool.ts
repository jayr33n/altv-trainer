import * as alt from "alt-client"
import * as ui from "@durtyfree/altv-nativeui"
import { Key } from "../enums/key"
import { MainMenu } from "../menus/mainMenu"

export abstract class AbstractMenuPool {
    protected menus: ui.Menu[] = []

    add(menu: ui.Menu) {
        this.menus.push(menu)
    }

    remove(menu: ui.Menu) {
        this.menus = this.menus.filter(x => x !== menu)
    }

    protected isAnyMenuOpen() {
        let result = false
        this.menus.forEach(menu => {
            if (menu.Visible)
                result = true
        })
        return result
    }
}

class MenuPool extends AbstractMenuPool {
    init() {
        let mainMenu = new MainMenu(this, "Main Menu")
        alt.on("keyup", (key: number) => {
            if (key == Key.M) {
                if (!this.isAnyMenuOpen())
                    mainMenu.menuObject.Open()
            }
        })
    }
}

export const menuPool = new MenuPool()
