import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Enum from "../utils/Enum"
import Game from "../utils/Game"
import Weather from "../enums/Weather"
import Menu from "../utils/Menu"
import CloudHat from "../enums/CloudHat"
import TimeCycleModifier from "../enums/TimecycleModifier"

export default class WorldMenu extends AbstractSubMenu {
    private setGameClockItem: NativeUI.UIMenuListItem
    private weatherMenu: WeatherMenu
    private cloudHatMenu: CloudHatMenu
    private timeCycleMenu: TimeCycleMenu

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.weatherMenu = new WeatherMenu(this, "World Weather")
        this.cloudHatMenu = new CloudHatMenu(this, "World Cloud Hat")
        this.timeCycleMenu = new TimeCycleMenu(this, "World Time Cycle")
        this.addItem(this.setGameClockItem = new NativeUI.UIMenuListItem("Game Clock Hours", undefined, new NativeUI.ItemsCollection([...Array(24).keys()])), (index?: number) => Game.setTime(index, game.getClockMinutes(), 0))
    }
}

class WeatherMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        Enum.getValues(Weather).forEach(weather => {
            let item = new NativeUI.UIMenuItem(Weather[+weather])
            this.addItem(item, () => {
                Game.setWeather(+weather)
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
            })
        })
        this.menuObject.MenuOpen.on(() => Menu.selectItem(this.menuObject.MenuItems[Game.getCurrentWeather()], NativeUI.BadgeStyle.Tick))
    }
}

class CloudHatMenu extends AbstractSubMenu {
    private cloudHatOpacityItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.cloudHatOpacityItem = new NativeUI.UIMenuListItem("CloudHat Opacity", undefined, new NativeUI.ItemsCollection([...Array(11).keys()])), (index?: number) => Game.setCloudHatOpacity(index / 10))
        Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new NativeUI.UIMenuItem(cloudHat)/*, () => Game.setCloudHat(Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat]))*/))
        this.menuObject.MenuOpen.on(() => {
            let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
            this.cloudHatOpacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
        })
    }
}

class TimeCycleMenu extends AbstractSubMenu {
    private customTimeCycleItem: NativeUI.UIMenuItem
    private clearTimeCycleItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customTimeCycleItem = new NativeUI.UIMenuItem("Custom Timecycle"), async () => game.setTimecycleModifier(await Game.getUserInput()))
        this.addItem(this.clearTimeCycleItem = new NativeUI.UIMenuItem("Clear Timecycle"), () => game.clearTimecycleModifier())
        Enum.getKeys(TimeCycleModifier).forEach(modifier => this.addItem(new NativeUI.UIMenuItem(modifier), () => game.setTimecycleModifier(modifier)))
    }
}