import * as alt from "alt-client"
import * as game from "natives"

export class Entity {
    static setInvincible(entity: alt.Entity, toggle: boolean) {
        game.setEntityCanBeDamaged(entity.scriptID, !toggle)
        game.setEntityInvincible(entity.scriptID, toggle)
    }
}
