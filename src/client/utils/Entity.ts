import * as alt from "alt-client"
import * as game from "natives"

export default class Entity {
    static isInvincible(entity: alt.Entity) {
        return !game.getEntityCanBeDamaged(entity.scriptID)
    }

    static setInvincible(entity: alt.Entity, toggle: boolean) {
        game.setEntityCanBeDamaged(entity.scriptID, !toggle)
        game.setEntityInvincible(entity.scriptID, toggle)
    }
}
