import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import network from "../modules/Network"
import Enum from "../utils/Enum"
import Game from "../utils/Game"
import Weather from "../enums/Weather"
import CloudHat from "../enums/CloudHat"
import DebugMenu from "./DebugMenu"
import MainMenu from "./MainMenu"
import tick from "../modules/Tick"
import Key from "../enums/Key"
import Menu from "../utils/Menu"

export default class WorldMenu extends AbstractSubMenu {
    private debugMenu: DebugMenu
    private propMenu: PropMenu
    private weatherMenu: WeatherMenu
    private cloudHatMenu: CloudHatMenu
    private teleportMenu: TeleportMenu
    private teleportToMarkerItem: NativeUI.UIMenuCheckboxItem
    private setTimeItem: NativeUI.UIMenuListItem
    private creditsItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.debugMenu = new DebugMenu(this, "Debug Options")
        this.propMenu = new PropMenu(this, "Prop Options")
        this.weatherMenu = new WeatherMenu(this, "World Weather")
        this.cloudHatMenu = new CloudHatMenu(this, "World Cloud Hat")
        this.teleportMenu = new TeleportMenu(this, "Teleport Presets")
        this.addItem(this.teleportToMarkerItem = new NativeUI.UIMenuCheckboxItem("Teleport To Marker", false, "This enables the ~b~F7~s~ key to be used as a shortcut to teleport around the map."))
        this.addItem(this.setTimeItem = new NativeUI.UIMenuListItem("World Time Hours", undefined, new NativeUI.ItemsCollection([...Array(24).keys()])), async (index?: number) => {
            await network.callback("setWorldTime", [index, 0, 0])
        })
        this.addItem(this.creditsItem = new NativeUI.UIMenuItem("About\\Credits", "Trainer made by ~b~Jayreen~s~ #1395 for ~b~alt:V~s~."))
        this.creditsItem.LeftBadge = NativeUI.BadgeStyle.Heart
        this.creditsItem.RightLabel = "~h~" + MainMenu.release
        this.menuObject.MenuOpen.on(() => this.updateItems())
        alt.on("keyup", (key: number) => {
            if (key == Key.F7) {
                if (this.teleportToMarkerItem.Checked) {
                    let handle = game.getFirstBlipInfoId(8)
                    if (game.doesBlipExist(handle)) {
                        let blip = game.getBlipInfoIdCoord(handle)
                        let pos = game.getClosestMajorVehicleNode(blip.x, blip.y, 0, undefined, 3.0, 0)[1]
                        game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, pos.x, pos.y, pos.z)
                    }
                }
            }
        })
    }

    updateItems() {
        let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
        this.cloudHatMenu.cloudHatOpacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
        this.setTimeItem.Index = game.getClockHours()
        Menu.selectItem(this.weatherMenu.menuObject.MenuItems[Game.getCurrentWeather()], NativeUI.BadgeStyle.Tick)
    }
}

class WeatherMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        Enum.getValues(Weather).forEach(weather => {
            let item = new NativeUI.UIMenuItem(Weather[+weather])
            this.addItem(item, async () => {
                await network.callback("setWorldWeather", [+weather])
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
            })
        })
    }
}

class CloudHatMenu extends AbstractSubMenu {
    cloudHatOpacityItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.cloudHatOpacityItem = new NativeUI.UIMenuListItem("Opacity", undefined, new NativeUI.ItemsCollection([...Array(11).keys()])), async (index?: number) => {
            await network.callback("setWorldCloudHatOpacity", [index / 10])
        })
        Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new NativeUI.UIMenuItem(cloudHat), async () => {
            //await network.callback("setWorldCloudHat", [Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat])])
        }))
    }
}

class TeleportMenu extends AbstractSubMenu {
    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
    }
}

class PropMenu extends AbstractSubMenu {
    private customPropItem: NativeUI.UIMenuItem
    private props = [
        "prop_air_conelight"
    ]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPropItem = new NativeUI.UIMenuItem("Spawn Custom Prop"), async () => {
            await Game.createProp(alt.hash(await Game.getUserInput()), alt.Player.local.pos, true)
        })
        this.props.forEach(prop => this.addItem(new NativeUI.UIMenuItem(prop), async () => await Game.createProp(alt.hash(prop), alt.Player.local.pos, true)))
    }
}
