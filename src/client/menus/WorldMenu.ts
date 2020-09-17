import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Enum from "../utils/Enum"
import Game from "../utils/Game"
import Weather from "../enums/Weather"
import Menu from "../utils/Menu"
import CloudHat from "../enums/CloudHat"
import TimeCycleModifier from "../enums/TimeCycleModifier"
import tick from "../modules/Tick"

export default class WorldMenu extends AbstractSubMenu {
    private gameClockItem: NativeUI.UIMenuListItem
    private weatherMenu: WeatherMenu
    private cloudHatMenu: CloudHatMenu
    private timeCycleMenu: TimeCycleMenu
    private artificialLights: NativeUI.UIMenuCheckboxItem
    private freezeTime: NativeUI.UIMenuCheckboxItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.weatherMenu = new WeatherMenu(this, "World Weather")
        this.cloudHatMenu = new CloudHatMenu(this, "World Cloud Hat")
        this.timeCycleMenu = new TimeCycleMenu(this, "World Time Cycle")
        this.addItem(this.gameClockItem = new NativeUI.UIMenuListItem("Game Clock Hours", undefined, new NativeUI.ItemsCollection([...Array(24).keys()])), (index?: number) => Game.setTime(index, 0, 0))
        this.addItem(this.artificialLights = new NativeUI.UIMenuCheckboxItem("Toggle Artificial Lights", true), (state?: boolean) => Game.setArtificialLightsState(!state))
        this.addItem(this.freezeTime = new NativeUI.UIMenuCheckboxItem("Freeze Time"), (state?: boolean) => {
            if (state) {
                let time = [game.getClockHours(), game.getClockMinutes(), game.getClockSeconds()]
                tick.register("world:freezeTime", () => Game.setTime(time[0], time[1], time[2]), 500)
                this.freezeTime.Description = `Time frozen at ~y~${time[0]}:${time[1]}:${time[2]}`
            }
            else {
                tick.clear("world:freezeTime")
                this.freezeTime.Description = ""
            }
        })
        this.freezeTime.LeftBadge = NativeUI.BadgeStyle.Alert
    }
}

class WeatherMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        Enum.getValues(Weather).forEach(weather => {
            let item = new NativeUI.UIMenuItem(Weather[+weather].toUpperCase())
            this.addItem(item, () => {
                Game.setWeather(+weather)
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
            })
        })
        this.menuObject.MenuOpen.on(() => Menu.selectItem(this.menuObject.MenuItems[Game.getCurrentWeather()], NativeUI.BadgeStyle.Tick))
    }
}

class CloudHatMenu extends AbstractSubMenu {
    private opacityItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.opacityItem = new NativeUI.UIMenuListItem("Opacity", undefined, new NativeUI.ItemsCollection([...Array(11).keys()])), (index?: number) => Game.setCloudHatOpacity(index / 10))
        Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new NativeUI.UIMenuItem(cloudHat.toUpperCase())/*, () => Game.setCloudHat(Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat]))*/))
        this.menuObject.MenuOpen.on(() => {
            let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
            this.opacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
        })
    }
}

class TimeCycleMenu extends AbstractSubMenu {
    private customItem: NativeUI.UIMenuItem
    private clearItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customItem = new NativeUI.UIMenuItem("Custom Timecycle"), async () => game.setTimecycleModifier(await Game.getUserInput()))
        this.addItem(this.clearItem = new NativeUI.UIMenuItem("Clear Timecycle"), () => game.clearTimecycleModifier())
        Enum.getKeys(TimeCycleModifier).forEach(modifier => this.addItem(new NativeUI.UIMenuItem(modifier.toUpperCase()), () => game.setTimecycleModifier(modifier)))
    }
}