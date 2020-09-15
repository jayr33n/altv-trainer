import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Enum from "../utils/Enum"
import Game from "../utils/Game"
import Weather from "../enums/Weather"
import Menu from "../utils/Menu"
import CloudHat from "../enums/CloudHat"

export default class WorldMenu extends AbstractSubMenu {
    private setGameClockItem: NativeUI.UIMenuListItem
    private cloudHatOpacityItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.setGameClockItem = new NativeUI.UIMenuListItem("Game Clock Hours", undefined, new NativeUI.ItemsCollection([...Array(24).keys()])), (index?: number) => Game.setTime(index, game.getClockMinutes(), 0))
        this.addItem(this.cloudHatOpacityItem = new NativeUI.UIMenuListItem("CloudHat Opacity", undefined, new NativeUI.ItemsCollection([...Array(11).keys()])), (index?: number) => Game.setCloudHatOpacity(index / 10))
        Enum.getValues(Weather).forEach(weather => {
            let item = new NativeUI.UIMenuItem("~b~Weather~s~ " + Weather[+weather])
            this.addItem(item, () => {
                Game.setWeather(+weather)
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
            })
        })
        //Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new NativeUI.UIMenuItem("~o~CloudHat~s~ " + cloudHat), () => Game.setCloudHat(Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat]))))
        this.menuObject.MenuOpen.on(() => {
            let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
            this.cloudHatOpacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
            this.setGameClockItem.Index = game.getClockHours()
        })
    }
}
