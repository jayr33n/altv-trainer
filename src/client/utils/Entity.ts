import * as alt from "alt-client"
import * as game from "natives"

export default class Entity {
    static isInvincible(entity: alt.Entity) {
        return !game.getEntityCanBeDamaged(entity.scriptID)
    }

    static kill(entity: alt.Entity) {
        game.setEntityHealth(entity.scriptID, 0, 0)
    }

    static setInvincible(entity: alt.Entity, toggle: boolean) {
        game.setEntityCanBeDamaged(entity.scriptID, !toggle)
        game.setEntityInvincible(entity.scriptID, toggle)
    }
}
