import * as game from "natives"
import * as ui from "@durtyfree/altv-nativeui"
import { Menu } from "../utils/menu"
import { CloudHat } from "../enums/cloudHat"
import { TimeCycleModifier } from "../enums/timeCycleModifier"
import { Weather } from "../enums/weather"
import { tick } from "../modules/tick"
import { Enum } from "../utils/enum"
import { Game } from "../utils/game"
import { AbstractMenu } from "./abstractMenu"
import { AbstractSubMenu } from "./abstractSubMenu"

export class WorldMenu extends AbstractSubMenu {
    private gameClockItem: ui.UIMenuListItem
    private weatherMenu: WeatherMenu
    private cloudHatMenu: CloudHatMenu
    private timeCycleMenu: TimeCycleMenu
    private artificialLights: ui.UIMenuCheckboxItem
    private freezeTime: ui.UIMenuCheckboxItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.weatherMenu = new WeatherMenu(this, "World Weather")
        this.cloudHatMenu = new CloudHatMenu(this, "World Cloud Hat")
        this.timeCycleMenu = new TimeCycleMenu(this, "World Time Cycle")
        this.addItem(this.gameClockItem = new ui.UIMenuListItem("Game Clock Hours", undefined, new ui.ItemsCollection([...Array(24).keys()])), (index?: number) => Game.setTime(index, 0, 0))
        this.addItem(this.artificialLights = new ui.UIMenuCheckboxItem("Toggle Artificial Lights", true), (state?: boolean) => Game.setArtificialLightsState(!state))
        this.addItem(this.freezeTime = new ui.UIMenuCheckboxItem("Freeze Time"), (state?: boolean) => {
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
        this.freezeTime.LeftBadge = ui.BadgeStyle.Alert
    }
}

class WeatherMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        Enum.getValues(Weather).forEach(weather => {
            let item = new ui.UIMenuItem(Weather[+weather].toUpperCase())
            this.addItem(item, () => {
                Game.setWeather(+weather)
                Menu.selectItem(item, ui.BadgeStyle.Tick)
            })
        })
        this.menuObject.MenuOpen.on(() => Menu.selectItem(this.menuObject.MenuItems[Game.getCurrentWeather()], ui.BadgeStyle.Tick))
    }
}

class CloudHatMenu extends AbstractSubMenu {
    private opacityItem: ui.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.opacityItem = new ui.UIMenuListItem("Opacity", undefined, new ui.ItemsCollection([...Array(11).keys()])), (index?: number) => Game.setCloudHatOpacity(index / 10))
        Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new ui.UIMenuItem(cloudHat.toUpperCase())/*, () => Game.setCloudHat(Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat]))*/))
        this.menuObject.MenuOpen.on(() => {
            let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
            this.opacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
        })
    }
}

class TimeCycleMenu extends AbstractSubMenu {
    private customItem: ui.UIMenuItem
    private clearItem: ui.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customItem = new ui.UIMenuItem("Custom Timecycle"), async () => game.setTimecycleModifier(await Game.getUserInput()))
        this.addItem(this.clearItem = new ui.UIMenuItem("Clear Timecycle"), () => game.clearTimecycleModifier())
        Enum.getKeys(TimeCycleModifier).forEach(modifier => this.addItem(new ui.UIMenuItem(modifier.toUpperCase()), () => game.setTimecycleModifier(modifier)))
    }
}