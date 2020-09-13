import * as alt from "alt-client"
import * as game from "natives"
import * as NativeUI from "../include/NativeUI/NativeUi"
import AbstractMenu from "./AbstractMenu"
import AbstractSubMenu from "./AbstractSubMenu"
import Enum from "../utils/Enum"
import Game from "../utils/Game"
import Weather from "../enums/Weather"
import CloudHat from "../enums/CloudHat"
import Key from "../enums/Key"
import Menu from "../utils/Menu"
import menuPool from "../modules/MenuPool"
import DebugMenu from "./DebugMenu"

export default class WorldMenu extends AbstractSubMenu {
    private propMenu: PropMenu
    private weatherMenu: WeatherMenu
    private cloudHatMenu: CloudHatMenu
    private teleportMenu: TeleportMenu
    private debugMenu: DebugMenu
    private creditsItem: NativeUI.UIMenuItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.propMenu = new PropMenu(this, "World Objects")
        this.weatherMenu = new WeatherMenu(this, "World Time And Weather")
        this.cloudHatMenu = new CloudHatMenu(this, "World Cloud Hat")
        this.teleportMenu = new TeleportMenu(this, "Teleport Options")
        this.debugMenu = new DebugMenu(this, "Debug Options")
        this.addItem(this.creditsItem = new NativeUI.UIMenuItem("About\\Credits", "Trainer made by ~b~Jayreen~s~ #1395 for ~b~alt:V~s~."))
        this.creditsItem.LeftBadge = NativeUI.BadgeStyle.Heart
        this.creditsItem.RightLabel = "~h~" + menuPool.release
        alt.on("keyup", (key: number) => {
            if (key == Key.F7 && this.teleportMenu.teleportToMarkerItem.Checked) {
                let handle = game.getFirstBlipInfoId(8)
                if (game.doesBlipExist(handle)) {
                    let blip = game.getBlipInfoIdCoord(handle)
                    let pos = game.getClosestMajorVehicleNode(blip.x, blip.y, 0, undefined, 3.0, 0)[1]
                    game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, pos.x, pos.y, pos.z)
                }
            }
        })
    }
}

class WeatherMenu extends AbstractSubMenu {
    private setTimeItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.setTimeItem = new NativeUI.UIMenuListItem("Time Hours", undefined, new NativeUI.ItemsCollection([...Array(24).keys()])), (index?: number) => Game.setTime(index, game.getClockMinutes(), 0))
        Enum.getValues(Weather).forEach(weather => {
            let item = new NativeUI.UIMenuItem(Weather[+weather])
            this.addItem(item, () => {
                Game.setWeather(+weather)
                Menu.selectItem(item, NativeUI.BadgeStyle.Tick)
            })
        })
        this.menuObject.MenuOpen.on(() => {
            this.setTimeItem.Index = game.getClockHours()
            Menu.selectItem(this.menuObject.MenuItems[Game.getCurrentWeather() + 1], NativeUI.BadgeStyle.Tick)
        })
    }
}

class CloudHatMenu extends AbstractSubMenu {
    private cloudHatOpacityItem: NativeUI.UIMenuListItem

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.cloudHatOpacityItem = new NativeUI.UIMenuListItem("Opacity", undefined, new NativeUI.ItemsCollection([...Array(11).keys()])), (index?: number) => Game.setCloudHatOpacity(index / 10))
        //Enum.getStringKeys(CloudHat).forEach(cloudHat => this.addItem(new NativeUI.UIMenuItem(cloudHat), () => Game.setCloudHat(Enum.getStringValues(CloudHat).find(value => value == CloudHat[cloudHat]))))
        this.menuObject.MenuOpen.on(() => {
            let opacityIndex = (Math.round((game.getCloudHatOpacity() + Number.EPSILON) * 10) / 10)
            this.cloudHatOpacityItem.Index = opacityIndex * Math.ceil(Math.log10(opacityIndex + 1)) * 10
        })
    }
}

class TeleportMenu extends AbstractSubMenu {
    teleportToMarkerItem: NativeUI.UIMenuCheckboxItem
    private customTeleportItem: NativeUI.UIMenuItem
    private locations: [string, alt.Vector3][] = [
        ["Los Santos International Airport", new alt.Vector3(-1028.80, -2905.91, 13.96)]
    ]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addItem(this.teleportToMarkerItem = new NativeUI.UIMenuCheckboxItem("Teleport To Marker", false, "This enables the ~b~F7~s~ key to be used as a shortcut to teleport around the map."))
        this.addUserInputItem(this.customTeleportItem = new NativeUI.UIMenuItem("Teleport To Coordinates"), async () => {
            let x = +await Game.getUserInput()
            let y = +await Game.getUserInput()
            let z = +await Game.getUserInput()
            game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z)
        })
        this.locations.forEach(location => this.addItem(new NativeUI.UIMenuItem(location[0]), () => game.setPedCoordsKeepVehicle(alt.Player.local.scriptID, location[1].x, location[1].y, location[1].z)))
    }
}

class PropMenu extends AbstractSubMenu {
    private customPropItem: NativeUI.UIMenuItem
    private props = [

    ]

    constructor(parentMenu: AbstractMenu, title: string) {
        super(parentMenu, title)
        this.addUserInputItem(this.customPropItem = new NativeUI.UIMenuItem("Spawn Custom Prop"), async () => Game.createProp(alt.hash(await Game.getUserInput()), alt.Player.local.pos, true))
        this.props.forEach(prop => this.addItem(new NativeUI.UIMenuItem(prop), () => Game.createProp(alt.hash(prop), alt.Player.local.pos, true)))
    }
}
