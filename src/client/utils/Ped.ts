import * as alt from "alt-client"
import * as game from "natives"
import Entity from "./Entity"
import Game from "./Game"
import AnimationFlag from "../enums/AnimationFlag"

export default class Ped extends Entity {
    static kill(ped: alt.Entity) {
        game.setEntityHealth(ped.scriptID, 0, 0)
    }

    static async playAnimation(ped: alt.Entity, dict: string, name: string, flag = AnimationFlag.Normal) {
        await Game.loadAnimationDict(dict)
        game.taskPlayAnim(ped.scriptID, dict, name, 8, 8, -1, flag, 0, false, false, true)
    }
}
