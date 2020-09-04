import * as alt from "alt-client"
import * as NativeUI from "../include/NativeUI/NativeUi"
import MainMenu from "./MainMenu"
import Key from "../enums/Key"

export default class MenuPool {
    static menus: NativeUI.Menu[] = []
    mainMenu: MainMenu

    constructor() {
        this.mainMenu = new MainMenu("Main Menu")
        alt.on("keyup", (key: number) => {
            if (key == Key.M) {
                if (!this.isAnyMenuOpen())
                    this.mainMenu.menuObject.Open()
            }
        })
    }

    isAnyMenuOpen() {
        let result = false
        MenuPool.menus.forEach(menu => { if (menu.Visible) result = true })
        return result
    }
}
