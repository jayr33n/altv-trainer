import * as alt from "alt-client"
import * as game from "natives"
import Weather from "../enums/Weather"
import tick from "../modules/Tick"
import AnimationFlag from "../enums/AnimationFlag"

export default class Game {
    static async playAnimation(dict: string, name: string, flag = AnimationFlag.Normal) {
        await this.loadAnimationDict(dict)
        game.taskPlayAnim(alt.Player.local.scriptID, dict, name, 8, 8, -1, flag, 0, false, false, true)
    }

    static async loadAnimationDict(dict: string) {
        await new Promise((resolve) => {
            game.requestAnimDict(dict)
            tick.register("loadAnimationDictionary", () => {
                if (game.hasAnimDictLoaded(dict)) {
                    resolve()
                    tick.clear("loadAnimationDictionary")
                }
            }, 50, 3000)
        })
    }

    static isModelValid(hash: number) {
        return game.isModelInCdimage(hash) || game.isModelValid(hash) || game.isWeaponValid(hash) ? true : false
    }

    static async requestModel(hash: number) {
        await new Promise((resolve) => {
            if (this.isModelValid(hash)) {
                game.requestModel(hash)
                tick.register("requestModel", () => {
                    if (game.hasModelLoaded(hash)) {
                        resolve()
                        tick.clear("requestModel")
                    }
                }, 50, 3000)
            }
        })
    }

    static async createProp(model: number, position: alt.Vector3, dynamic: boolean) {
        if (!game.hasModelLoaded(model))
            await this.requestModel(model)
        game.createObject(model, position.x, position.y, position.z, true, true, dynamic)
    }

    static async getUserInput(length = 30): Promise<string> {
        game.displayOnscreenKeyboard(6, "FMMC_KEY_TIP8", "", "", "", "", "", length)
        return await new Promise((resolve) => {
            tick.register("awaitUserInput", () => {
                if (game.updateOnscreenKeyboard() != 0) {
                    resolve(game.getOnscreenKeyboardResult())
                    tick.clear("awaitUserInput")
                }
            }, 0)
        })
    }

    static getCurrentWeather() {
        switch (game.getPrevWeatherTypeHashName()) {
            case 0x97AA0A79:
                return Weather.ExtraSunny
            case 0x36A83D84:
                return Weather.Clear
            case 0x30FDAF5C:
                return Weather.Clouds
            case 0x10DCF4B5:
                return Weather.Smog
            case 0xAE737644:
                return Weather.Foggy
            case 0xBB898D2D:
                return Weather.Overcast
            case 0x54A69840:
                return Weather.Rain
            case 0xB677829F:
                return Weather.Thunder
            case 0x6DB1A50D:
                return Weather.Clearing
            case 0xA4CA1326:
                return Weather.Neutral
            case 0xEFB6EFF6:
                return Weather.Snow
            case 0x27EA2814:
                return Weather.Blizzard
            case 0x23FB812B:
                return Weather.Snowlight
            case 0xAAC9C895:
                return Weather.Xmas
            case 0xC91A3202:
                return Weather.Halloween
        }
    }
}
