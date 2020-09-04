import * as alt from "alt-client"
import * as game from "natives"

export default class Game {
    static async getUserInput(length: number) {
        game.displayOnscreenKeyboard(6, "FMMC_KEY_TIP8", "", "", "", "", "", length)
        return await new Promise((resolve) => {
            let handle = alt.everyTick(() => {
                if (game.updateOnscreenKeyboard() != 0) {
                    resolve(game.getOnscreenKeyboardResult())
                    alt.clearEveryTick(handle)
                }
            })
        })
    }

    static setTimedInterval(handler: () => void, miliseconds = 1000, timeout = 3000) {
        let handle = alt.setInterval(handler, miliseconds)
        alt.setTimeout(() => {
            alt.clearInterval(handle)
        }, timeout)
        return handle
    }
}
